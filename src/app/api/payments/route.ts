import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { student_id, module_code, amount, currency, gateway, phone_or_card } = body;

    const refPrefix = gateway === 'AirtelMoney' ? 'AIRTEL-MW' : gateway === 'TNMMpamba' ? 'TNM-MP' : 'STRIPE-INT';
    const reference_id = `${refPrefix}-${Math.floor(1000000 + Math.random() * 9000000)}`;

    return NextResponse.json({
      status: 'SUCCESS',
      message: `Payment authorized via ${gateway}`,
      transaction: {
        reference_id,
        student_id,
        module_code,
        amount,
        currency,
        gateway,
        phone_or_card,
        status: 'COMPLETED',
        timestamp: new Date().toISOString()
      },
      module_unlocked: true
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'ERROR', message: 'Failed to process payment' },
      { status: 400 }
    );
  }
}
