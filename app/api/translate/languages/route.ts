import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const result = await axios({
      method: 'GET',
      url: 'https://api.heygen.com/v2/video_translate/target_languages',
      headers: {
        accept: 'application/json',
        'x-api-key': process.env.HEYGEN_API_KEY
      }
    });

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch languages' },
      { status: 500 }
    );
  }
} 