import { fetchFareData } from '/lib/fetchData';

export async function GET(req) {
  try {
    const data = await fetchFareData();
    if (!data) {
      return new Response('Failed to fetch station data', { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error in GET route:", error);
    return new Response('Error fetching data', { status: 500 });
  }
}