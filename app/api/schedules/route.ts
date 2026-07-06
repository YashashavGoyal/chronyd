import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import UrlSchedule from '@/models/UrlSchedule';
import { localDb } from '@/lib/localDb';

export async function GET(request: NextRequest) {
  let isMongo = false;
  try {
    await connectDB();
    isMongo = true;
  } catch (err) {
    console.warn('MongoDB connection failed, using local JSON database fallback.');
  }

  try {
    if (isMongo) {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const skip = (page - 1) * limit;

      const schedules = await UrlSchedule.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await UrlSchedule.countDocuments();

      return NextResponse.json({
        success: true,
        data: schedules,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } else {
      const schedules = localDb.getSchedules();
      return NextResponse.json({
        success: true,
        data: schedules,
        pagination: {
          page: 1,
          limit: schedules.length,
          total: schedules.length,
          pages: 1,
        },
      });
    }
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch schedules' },
      { status: 500 }
    );
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

    if (isMongo) {
      const schedule = new UrlSchedule({
        ...body,
        headers: body.headers || [],
        enabled: body.enabled !== undefined ? body.enabled : true,
      });
      
      await schedule.save();
      
      return NextResponse.json(
        { success: true, data: schedule },
        { status: 201 }
      );
    } else {
      const schedule = localDb.addSchedule(body);
      return NextResponse.json(
        { success: true, data: schedule },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create schedule' },
      { status: 500 }
    );
  }
}