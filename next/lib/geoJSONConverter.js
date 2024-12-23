export const convertStationDataToGeoJSON = (stationData) => {
    return {
      type: "FeatureCollection",
      features: stationData.map((station) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [station["geo:long"], station["geo:lat"]],
        },
        properties: {
          stationName: station["dc:title"],
          stationCode: station["odpt:stationCode"],
          railway: station["odpt:railway"],
          operator: station["odpt:operator"],
          passengerSurvey: station["odpt:passengerSurvey"] || [],
          stationTimetable: station["odpt:stationTimetable"] || [],
          connectingRailway: station["odpt:connectingRailway"] || [],
          connectingStation: station["odpt:connectingStation"] || [],
        },
      })),
    };
  };