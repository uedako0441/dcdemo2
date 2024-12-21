import { NextResponse } from 'next/server';
import { fetchGTFSData } from '/lib/fetchGTFSData';  // fetchGTFSDataをインポート

export async function GET() {
  try {
    // GTFSデータを取得
    const data = await fetchGTFSData();

    // データ取得に成功した場合、JSONレスポンスとして返す
    if (data) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching GTFS data:', error);
    return NextResponse.json({ error: 'Failed to fetch GTFS data' }, { status: 500 });
  }
}