import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'db.json');

interface LocalDB {
  schedules: any[];
  logs: any[];
}

function readDB(): LocalDB {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = {
        schedules: [
          {
            _id: 'demo-1',
            name: 'Health Check API',
            url: 'https://api.example.com/health',
            schedule: 'every-5-minutes',
            agent: 'postman',
            enabled: true,
            lastRun: '2024-01-15T10:30:00Z',
            lastStatus: 'success',
            headers: [
              { key: 'Content-Type', value: 'application/json', enabled: true },
              { key: 'Authorization', value: 'Bearer demo-token', enabled: true }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            _id: 'demo-2',
            name: 'Weather API Monitor',
            url: 'https://api.weather.com/v1/forecast',
            schedule: 'every-hour',
            agent: 'firefox',
            enabled: true,
            lastRun: '2024-01-15T10:00:00Z',
            lastStatus: 'success',
            headers: [
              { key: 'Accept', value: 'application/json', enabled: true },
              { key: 'User-Agent', value: 'Custom-Agent', enabled: false }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ],
        logs: []
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading local DB file:', error);
    return { schedules: [], logs: [] };
  }
}

function writeDB(data: LocalDB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing local DB file:', error);
  }
}

export const localDb = {
  getSchedules: () => readDB().schedules,
  
  getScheduleById: (id: string) => {
    return readDB().schedules.find(s => s._id === id) || null;
  },

  addSchedule: (scheduleData: any) => {
    const db = readDB();
    const newSchedule = {
      _id: `local-${Date.now()}`,
      ...scheduleData,
      enabled: scheduleData.enabled !== undefined ? scheduleData.enabled : true,
      lastRun: null,
      lastStatus: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.schedules.unshift(newSchedule);
    writeDB(db);
    return newSchedule;
  },

  updateSchedule: (id: string, updateData: any) => {
    const db = readDB();
    const idx = db.schedules.findIndex(s => s._id === id);
    if (idx === -1) return null;
    db.schedules[idx] = {
      ...db.schedules[idx],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    writeDB(db);
    return db.schedules[idx];
  },

  deleteSchedule: (id: string) => {
    const db = readDB();
    const deleted = db.schedules.find(s => s._id === id);
    db.schedules = db.schedules.filter(s => s._id !== id);
    db.logs = db.logs.filter(l => l.scheduleId === id);
    writeDB(db);
    return deleted || null;
  },

  getLogs: (scheduleId: string) => {
    return readDB().logs.filter(l => l.scheduleId === scheduleId);
  },

  addLog: (logData: any) => {
    const db = readDB();
    const newLog = {
      _id: `log-${Date.now()}`,
      ...logData,
      timestamp: new Date().toISOString()
    };
    db.logs.unshift(newLog);
    writeDB(db);
    return newLog;
  }
};
