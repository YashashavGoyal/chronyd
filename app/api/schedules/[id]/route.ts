import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import UrlSchedule from '@/models/UrlSchedule';
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
      const schedule = await UrlSchedule.findById(id);
      
      if (!schedule) {
        return NextResponse.json(
          { success: false, error: 'Schedule not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ success: true, data: schedule });
    } else {
      const schedule = localDb.getScheduleById(id);
      if (!schedule) {
        return NextResponse.json(
          { success: false, error: 'Schedule not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: schedule });
    }
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch schedule' },
      { status: 500 }
    );
  }
}

export async function PUT(
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
    const body = await request.json();

    if (isMongo) {
      const schedule = await UrlSchedule.findByIdAndUpdate(
        id,
        { ...body, updatedAt: new Date() },
        { new: true }
      );
      
      if (!schedule) {
        return NextResponse.json(
          { success: false, error: 'Schedule not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ success: true, data: schedule });
    } else {
      const schedule = localDb.updateSchedule(id, body);
      if (!schedule) {
        return NextResponse.json(
          { success: false, error: 'Schedule not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: schedule });
    }
  } catch (error) {
    console.error('Error updating schedule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update schedule' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
      const schedule = await UrlSchedule.findByIdAndDelete(id);
      
      if (!schedule) {
        return NextResponse.json(
          { success: false, error: 'Schedule not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ success: true, data: schedule });
    } else {
      const schedule = localDb.deleteSchedule(id);
      if (!schedule) {
        return NextResponse.json(
          { success: false, error: 'Schedule not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: schedule });
    }
  } catch (error) {
    console.error('Error deleting schedule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete schedule' },
      { status: 500 }
    );
  }
}