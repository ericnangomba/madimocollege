import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    institution: 'Madimo College of Missions',
    country: 'Malawi',
    neo4j_nodes: {
      students: 42,
      course_modules: 3,
      lessons: 6,
      lecturers: 3,
      discipleship_groups: 4,
      transactions: 35
    },
    graph_health: 'HEALTHY',
    launch_cohort: 'January 2027'
  });
}
