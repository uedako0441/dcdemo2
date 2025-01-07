"use client";

import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "../globals.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

if (!mapboxgl.accessToken) {
  throw new Error("Mapbox Access Token is not defined in the environment variables.");
}

const NaviPage = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");

  const handleFromStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromStation(e.target.value);
  };

  const handleToStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToStation(e.target.value);
  };

  const handleSearch = async () => {
    if (fromStation && toStation) {
      try {
        const routeData = await getRouteWithOTP(fromStation, toStation);
        displayRouteOnMap(routeData);
      } catch (error) {
        console.error("Error fetching or displaying route:", error);
      }
    } else {
      alert("Please enter both From and To stations.");
    }
  };

  const getRouteWithOTP = async (fromStation: string, toStation: string) => {
    const otpUrl = `https://otp.openstreetmap.org/otp/routers/default/plan?fromPlace=${fromStation}&toPlace=${toStation}&dateTime=2024-12-21T08:00:00&maxWalkDistance=1000&arriveBy=false`;
    const response = await fetch(otpUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch route: ${response.statusText}`);
    }

    const routeData = await response.json();
    return routeData;
  };

  const displayRouteOnMap = (routeData: any) => {
    if (!mapRef.current) return;

    // 既存のルートソースとレイヤーを削除
    if (mapRef.current.getLayer("route-layer")) {
      mapRef.current.removeLayer("route-layer");
    }
    if (mapRef.current.getSource("route")) {
      mapRef.current.removeSource("route");
    }

    const routeGeoJSON = {
      type: "FeatureCollection",
      features: routeData.itineraries.map((itinerary: any) => ({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: itinerary.legs.flatMap((leg: any) =>
            leg.steps.map((step: any) => [step.from.lon, step.from.lat])
          ),
        },
        properties: {
          duration: itinerary.duration,
        },
      })),
    };

    mapRef.current.addSource("route", {
      type: "geojson",
      data: routeGeoJSON,
    });

    mapRef.current.addLayer({
      id: "route-layer",
      type: "line",
      source: "route",
      paint: {
        "line-color": "#ff0000",
        "line-width": 4,
      },
    });
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [139.6917, 35.6895], // 東京を初期位置に設定
        zoom: 12,
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <input
          type="text"
          value={fromStation}
          onChange={handleFromStationChange}
          placeholder="From Station (e.g., 35.6895,139.6917)"
          style={{ marginRight: "5px", padding: "5px", width: "300px" }}
        />
        <input
          type="text"
          value={toStation}
          onChange={handleToStationChange}
          placeholder="To Station (e.g., 35.7100,139.8107)"
          style={{ marginRight: "5px", padding: "5px", width: "300px" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "5px 10px",
            backgroundColor: "#007cbf",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search Route
        </button>
      </div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "90vh" }} />
    </div>
  );
};

export default NaviPage;