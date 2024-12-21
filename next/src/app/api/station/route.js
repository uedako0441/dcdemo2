import { fetchStationData } from '/lib/fetchData'; // fetchStationDataをインポート

export async function GET(req) {
  try {
    const data = await fetchStationData();  // fetchStationData関数を呼び出し
    if (!data) {
      return new Response('Failed to fetch station data', { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error in GET route:", error);
    return new Response('Error fetching data', { status: 500 });
  }
}