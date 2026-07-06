import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ExecutionLog from '@/models/ExecutionLog';
import { localDb } from '@/lib/localDb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let isMongo = false;
  try {
    await connectDB();
    isMongo = true;
  } catch (err) {
    console.warn('MongoDB connection failed, using local JSON database fallback.');
  }

  try {
    const { id } = await params;

    if (isMongo) {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const skip = (page - 1) * limit;

      const logs = await ExecutionLog.find({ scheduleId: id })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await ExecutionLog.countDocuments({ scheduleId: id });

      return NextResponse.json({
        success: true,
        data: logs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } else {
      const logs = localDb.getLogs(id);
      return NextResponse.json({
        success: true,
        data: logs,
        pagination: {
          page: 1,
          limit: logs.length,
          total: logs.length,
          pages: 1,
        },
      });
    }
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch logs' },
      { status: 500 }
    );
  }
}