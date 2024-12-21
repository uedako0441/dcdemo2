import JSZip from 'jszip';
import Papa from 'papaparse';

const fetchGTFSData = async () => {
  const API_URL = 'https://api.odpt.org/api/v4/files/TokyoMetro/data/TokyoMetro-Train-GTFS.zip';  // ZIPファイルのURL
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ODPT_ACCESS_TOKEN; // 環境変数からアクセストークンを取得
  
  const response = await fetch(`${API_URL}?acl:consumerKey=${ACCESS_TOKEN}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch GTFS data: ${response.statusText}`);
  }

  // ArrayBufferとしてデータを取得
  const arrayBuffer = await response.arrayBuffer();
  console.log('ArrayBuffer:', arrayBuffer); // ArrayBufferの内容を確認

  try {
    // JSZipを使ってZIPファイルを解凍
    const zip = await JSZip.loadAsync(arrayBuffer);

    // ZIP内のファイルリストを取得
    const files = Object.keys(zip.files);
    console.log('Files in the ZIP:', files);  // ZIP内のファイル名を表示

    // 例: "stop_times.txt"というCSVファイルを取得し、パースする
    const csvFileName = 'stop_times.txt';  // 必要なCSVファイル名

    if (files.includes(csvFileName)) {
      const csvData = await zip.files[csvFileName].async('text');  // CSVファイルをテキストとして取得

      // CSVをJSONに変換
      const parsedData = Papa.parse(csvData, {
        header: true,  // ヘッダー行をキーとして扱う
        skipEmptyLines: true  // 空の行をスキップ
      });

      return parsedData.data;  // JSON形式のデータを返す
    } else {
      throw new Error(`File ${csvFileName} not found in the ZIP archive.`);
    }
  } catch (error) {
    console.error('Error reading or parsing ZIP:', error);
    return null;
  }
};

fetchGTFSData()
  .then(data => {
    console.log('Parsed GTFS data:', data);
  })
  .catch(error => {
    console.error('Error fetching or parsing GTFS data:', error);
  });