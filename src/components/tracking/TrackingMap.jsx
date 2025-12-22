"use client";

import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { useEffect, useMemo, useRef } from "react";

export default function TrackingMap({ coords }) {
  const mapRef = useRef(null);

  const path = useMemo(() => {
    if (!Array.isArray(coords)) return [];
    const sorted = [...coords].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    return sorted.map((c) => ({ lat: c.latitude, lng: c.longitude }));
  }, [coords]);

  const last = path.length ? path[path.length - 1] : null;
  const center = last || { lat: 4.65, lng: -74.1 };

  useEffect(() => {
    if (!mapRef.current || path.length === 0 || !window.google) return;
    const bounds = new window.google.maps.LatLngBounds();
    path.forEach((p) => bounds.extend(p));
    if (!bounds.isEmpty()) mapRef.current.fitBounds(bounds);
  }, [path]);

  if (path.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        Sin coordenadas para mostrar
      </div>
    );
  }

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={13}
        onLoad={(map) => (mapRef.current = map)}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          clickableIcons: false,
        }}
      >
        <Polyline
          path={path}
          options={{
            strokeColor: "#1450ff",
            strokeOpacity: 0.9,
            strokeWeight: 5,
          }}
        />
        {last && <Marker position={last} />}
      </GoogleMap>
    </div>
  );
}
