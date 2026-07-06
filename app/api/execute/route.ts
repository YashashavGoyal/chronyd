import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import UrlSchedule from '@/models/UrlSchedule';
import ExecutionLog from '@/models/ExecutionLog';
import { localDb } from '@/lib/localDb';

async function makeRequest(url: string, headers: any[], agent: string) {
  // Select random enabled headers
  const enabledHeaders = headers.filter(h => h.enabled);
  const selectedHeaders: any = {};
  
  if (enabledHeaders.length > 0) {
    // Use all enabled headers
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
    const response = await fetch(url, {
      method: 'GET',
      headers: selectedHeaders,
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

export async function POST(request: NextRequest) {
  let isMongo = false;
  try {
    await connectDB();
    isMongo = true;
  } catch (err) {
    console.warn('MongoDB connection failed, using local JSON database fallback.');
  }

  try {
    const body = await request.json();
    const { scheduleId, manual } = body;
    
    let schedule;
    if (isMongo) {
      schedule = await UrlSchedule.findById(scheduleId);
    } else {
      schedule = localDb.getScheduleById(scheduleId);
    }
    
    if (!schedule) {
      return NextResponse.json(
        { success: false, error: 'Schedule not found' },
        { status: 404 }
      );
    }
    
    // Make the request
    const result = await makeRequest(schedule.url, schedule.headers, schedule.agent);
    
    // Log the execution
    const logData = {
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
    };
    
    let log;
    if (isMongo) {
      log = new ExecutionLog(logData);
      await log.save();
      
      // Update the schedule
      schedule.lastRun = new Date();
      schedule.lastStatus = result.success ? 'success' : 'failed';
      await schedule.save();
    } else {
      log = localDb.addLog(logData);
      
      // Update the schedule
      localDb.updateSchedule(scheduleId, {
        lastRun: new Date().toISOString(),
        lastStatus: result.success ? 'success' : 'failed'
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        result,
        log,
      },
    });
  } catch (error) {
    console.error('Error executing schedule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to execute schedule' },
      { status: 500 }
    );
  }
}