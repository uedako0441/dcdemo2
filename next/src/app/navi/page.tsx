"use client";

import React, { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css"; // 修正済み
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import mapboxgl from "mapbox-gl";

const NaviPage = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("Mapbox Access Token is not defined in the environment variables.");
  }

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [139.6917, 35.6895],
        zoom: 12,
        accessToken,
      });

      const directions = new MapboxDirections({
        accessToken,
        unit: "metric",
        profile: "mapbox/driving",
      });

      (mapRef.current as mapboxgl.Map).addControl(
        directions as unknown as mapboxgl.IControl,
        "top-left"
      );

      directions.setOrigin([139.7671, 35.6812]);
      directions.setDestination([139.6982, 35.6595]);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [accessToken]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default NaviPage;