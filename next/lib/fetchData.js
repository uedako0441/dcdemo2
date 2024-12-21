export const fetchStationData = async () => {
  const API_URL = "https://api.odpt.org/api/v4/odpt:Station?odpt:operator=odpt.Operator:TokyoMetro";
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ODPT_ACCESS_TOKEN; // 環境変数からアクセストークンを取得

  try {
    const response = await fetch(`${API_URL}&acl:consumerKey=${ACCESS_TOKEN}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch station data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching station data:", error);
    return null;
  }
};

export const fetchLineData = async () => {
  const API_URL = "https://api.odpt.org/api/v4/odpt:Railway?odpt:operator=odpt.Operator:TokyoMetro";
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ODPT_ACCESS_TOKEN; // 環境変数からアクセストークンを取得

  try {
    const response = await fetch(`${API_URL}&acl:consumerKey=${ACCESS_TOKEN}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch line data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching line data:", error);
    return null;
  }
};

export const fetchTimetableData = async () => {
  const API_URL = "https://api.odpt.org/api/v4/odpt:StationTimetable?odpt:operator=odpt.Operator:TokyoMetro";
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ODPT_ACCESS_TOKEN; // 環境変数からアクセストークンを取得

  try {
    const response = await fetch(`${API_URL}&acl:consumerKey=${ACCESS_TOKEN}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch line data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching line data:", error);
    return null;
  }
};

export const fetchFareData = async () => {
  const API_URL = "https://api.odpt.org/api/v4/odpt:RailwayFare?odpt:operator=odpt.Operator:TokyoMetro";
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ODPT_ACCESS_TOKEN; // 環境変数からアクセストークンを取得

  try {
    const response = await fetch(`${API_URL}&acl:consumerKey=${ACCESS_TOKEN}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch line data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching line data:", error);
    return null;
  }
};

export const fetchInfoData = async () => {
  const API_URL = "https://api.odpt.org/api/v4/files/TokyoMetro/data/TokyoMetro-Train-GTFS.zip";
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ODPT_ACCESS_TOKEN; // 環境変数からアクセストークンを取得

  try {
    const response = await fetch(`${API_URL}?acl:consumerKey=${ACCESS_TOKEN}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch GTFS data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching GTFS data:", error);
    return null;
  }
};