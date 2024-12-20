declare module "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions" {
    import { Map } from "mapbox-gl";
  
    interface DirectionsOptions {
      accessToken: string;
      unit?: "metric" | "imperial";
      profile?: "mapbox/driving" | "mapbox/walking" | "mapbox/cycling";
      alternatives?: boolean;
      geometries?: "geojson" | "polyline";
      overview?: "full" | "simplified";
      controls?: boolean;
      flyTo?: boolean;
    }
  
    export default class MapboxDirections {
      constructor(options?: DirectionsOptions);
      setOrigin(origin: [number, number] | string): void;
      setDestination(destination: [number, number] | string): void;
      on(event: string, callback: (...args: any[]) => void): void;
      off(event: string, callback: (...args: any[]) => void): void;
      addTo(map: Map): void;
      remove(): void;
    }
  }