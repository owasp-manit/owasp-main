
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GNEWS_API_KEY;
  const url = `https://gnews.io/api/v4/search?q=Cyber%20security&lang=en&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
