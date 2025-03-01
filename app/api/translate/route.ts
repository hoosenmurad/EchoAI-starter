import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const result = await axios({
      method: 'POST',
      url: 'https://api.heygen.com/v2/video_translate',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-api-key': process.env.HEYGEN_API_KEY
      },
      data: body
    });

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Translation failed' },
      { status: 500 }
    );
  }
} 