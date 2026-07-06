import mongoose from 'mongoose';

const UrlScheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
    enum: ['every-minute', 'every-5-minutes', 'every-15-minutes', 'every-hour', 'daily', 'weekly', 'custom'],
  },
  customCron: {
    type: String,
    required: false,
  },
  agent: {
    type: String,
    required: true,
    enum: ['postman', 'firefox', 'chrome', 'safari', 'edge', 'curl'],
    default: 'postman',
  },
  headers: [{
    key: String,
    value: String,
    enabled: { type: Boolean, default: true },
  }],
  enabled: {
    type: Boolean,
    default: true,
  },
  lastRun: {
    type: Date,
    required: false,
  },
  lastStatus: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on save
UrlScheduleSchema.pre('save', function(this: any, next: any) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.UrlSchedule || mongoose.model('UrlSchedule', UrlScheduleSchema);