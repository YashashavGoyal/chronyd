import connectDB from './mongodb';
import UrlSchedule from '@/models/UrlSchedule';
import ExecutionLog from '@/models/ExecutionLog';

let isRunning = false;
let intervalId: any = null;

async function makeRequest(url: string, headers: any[], agent: string, method: string = 'GET', body?: string) {
  const enabledHeaders = headers.filter(h => h.enabled);
  const selectedHeaders: any = {};
  
  if (enabledHeaders.length > 0) {
    enabledHeaders.forEach(h => {
      selectedHeaders[h.key] = h.value;
    });
  }

  // Add User-Agent based on selected agent
  switch (agent) {
    case 'postman':
      selectedHeaders['User-Agent'] = 'PostmanRuntime/7.29.0';
      break;
    case 'firefox':
      selectedHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0';
      break;
    case 'chrome':
      selectedHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
      break;
    case 'safari':
      selectedHeaders['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
      break;
    case 'edge':
      selectedHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0';
      break;
    case 'curl':
      selectedHeaders['User-Agent'] = 'curl/8.4.0';
      break;
  }

  const startTime = Date.now();
  
  try {
    const isBodySupported = ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());
    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers: selectedHeaders,
      body: isBodySupported && body ? body : undefined,
    });
    
    const responseTime = Date.now() - startTime;
    const responseBody = await response.text();
    
    return {
      success: response.ok,
      statusCode: response.status,
      statusText: response.statusText,
      responseTime,
      responseBody,
      error: null,
    };
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    return {
      success: false,
      statusCode: 0,
      statusText: 'Network Error',
      responseTime,
      responseBody: null,
      error: error.message,
    };
  }
}

async function checkSchedules() {
  try {
    await connectDB();
    
    const now = new Date();
    const schedules = await UrlSchedule.find({ enabled: true });
    
    for (const schedule of schedules) {
      let isDue = false;
      const lastRunTime = schedule.lastRun ? new Date(schedule.lastRun).getTime() : 0;
      const elapsedMs = now.getTime() - lastRunTime;

      switch (schedule.schedule) {
        case 'every-minute':
          isDue = lastRunTime === 0 || elapsedMs >= 60 * 1000;
          break;
        case 'every-5-minutes':
          isDue = lastRunTime === 0 || elapsedMs >= 5 * 60 * 1000;
          break;
        case 'every-15-minutes':
          isDue = lastRunTime === 0 || elapsedMs >= 15 * 60 * 1000;
          break;
        case 'every-hour':
          isDue = lastRunTime === 0 || elapsedMs >= 60 * 60 * 1000;
          break;
        case 'daily':
          isDue = lastRunTime === 0 || elapsedMs >= 24 * 60 * 60 * 1000;
          break;
        case 'weekly':
          isDue = lastRunTime === 0 || elapsedMs >= 7 * 24 * 60 * 60 * 1000;
          break;
        case 'custom':
          // Fallback to checking every minute
          isDue = lastRunTime === 0 || elapsedMs >= 60 * 1000;
          break;
      }

      if (isDue) {
        console.log(`[Scheduler] Executing scheduled request: ${schedule.name} (${schedule.method || 'GET'} -> ${schedule.url})`);
        
        // Execute request
        const result = await makeRequest(
          schedule.url,
          schedule.headers,
          schedule.agent,
          schedule.method || 'GET',
          schedule.body || undefined
        );

        // Save execution log
        const log = new ExecutionLog({
          scheduleId: schedule._id,
          status: result.success ? 'success' : 'failed',
          statusCode: result.statusCode,
          responseTime: result.responseTime,
          headersUsed: schedule.headers.filter((h: any) => h.enabled).map((h: any) => ({
            key: h.key,
            value: h.value,
          })),
          error: result.error,
          responseBody: result.responseBody ? result.responseBody.substring(0, 5000) : null,
        });
        await log.save();

        // Update schedule
        schedule.lastRun = new Date();
        schedule.lastStatus = result.success ? 'success' : 'failed';
        await schedule.save();
      }
    }
  } catch (error) {
    console.error('[Scheduler] Error in checkSchedules loop:', error);
  }
}

export function startScheduler() {
  if (isRunning) return;
  isRunning = true;
  console.log('[Scheduler] Background URL scheduler daemon started.');
  
  // Run checks immediately on start
  checkSchedules();
  
  // Check every 15 seconds for due schedules
  intervalId = setInterval(checkSchedules, 15 * 1000);
}

export function stopScheduler() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  isRunning = false;
  console.log('[Scheduler] Background URL scheduler daemon stopped.');
}
