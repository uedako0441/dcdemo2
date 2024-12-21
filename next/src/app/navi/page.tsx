"use client";

import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import mapboxgl from "mapbox-gl";
import "../globals.css";

const NaviPage = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("Mapbox Access Token is not defined in the environment variables.");
  }

  const handleFromStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromStation(e.target.value);
  };

  const handleToStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToStation(e.target.value);
  };

  const handleSearch = async () => {
    if (fromStation && toStation) {
      const routeData = await getRouteWithOTP(fromStation, toStation);
      displayRouteOnMap(routeData);
    }
  };

  const getRouteWithOTP = async (fromStation: string, toStation: string) => {
    const otpUrl = `https://otp.openstreetmap.org/otp/routers/default/plan?fromPlace=${fromStation}&toPlace=${toStation}&dateTime=2024-12-21T08:00:00&maxWalkDistance=1000&arriveBy=false`;
    const response = await fetch(otpUrl);
    const routeData = await response.json();
    return routeData;
  };

  const displayRouteOnMap = (routeData: any) => {
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

    if (mapRef.current) {
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
    }
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [139.6917, 35.6895],
        zoom: 12,
        accessToken,
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [accessToken]);

  return (
    <div>
      <input
        type="text"
        value={fromStation}
        onChange={handleFromStationChange}
        placeholder="From Station"
      />
      <input
        type="text"
        value={toStation}
        onChange={handleToStationChange}
        placeholder="To Station"
      />
      <button onClick={handleSearch}>Search Route</button>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
};

export default NaviPage;