import { NextResponse } from 'next/server';
import { INITIAL_PROGRAMS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    institution: 'Madimo College of Missions',
    cohort: 'January 2027',
    programs: INITIAL_PROGRAMS
  });
}
