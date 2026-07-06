import mongoose from 'mongoose';

const ExecutionLogSchema = new mongoose.Schema({
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UrlSchedule',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'error', 'skipped'],
    required: true,
  },
  statusCode: {
    type: Number,
    required: false,
  },
  responseTime: {
    type: Number,
    required: false,
  },
  headersUsed: [{
    key: String,
    value: String,
  }],
  error: {
    type: String,
    required: false,
  },
  responseBody: {
    type: String,
    required: false,
  },
});

export default mongoose.models.ExecutionLog || mongoose.model('ExecutionLog', ExecutionLogSchema);