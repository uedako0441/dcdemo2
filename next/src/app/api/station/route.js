import { fetchStationData } from '/lib/fetchData';
import { convertStationDataToGeoJSON } from '/lib/geoJSONConverter'; // データ変換関数をインポート

export async function GET(req) {
  try {
    const data = await fetchStationData(); // fetchStationData関数を呼び出し
    if (!data) {
      return new Response('Failed to fetch station data', { status: 500 });
    }

    const geoJSON = convertStationDataToGeoJSON(data); // GeoJSON形式に変換
    return new Response(JSON.stringify(geoJSON), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in GET route:", error);
    return new Response('Error fetching data', { status: 500 });
  }
}