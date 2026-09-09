import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const submission_id = `DBS-2027-${Math.floor(100 + Math.random() * 900)}`;

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Discovery Bible Study (DBS) journal successfully received by faculty mentor',
      submission: {
        submission_id,
        ...body,
        grade: 'UNGRADED',
        submitted_at: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'ERROR', message: 'Failed to record DBS journal' },
      { status: 400 }
    );
  }
}
