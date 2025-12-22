"use client";

import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { useEffect, useMemo, useRef } from "react";

function toNumber(v) {
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isFinite(n) ? n : null;
}

function isValidLatLng(lat, lng) {
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

export default function TrackingMap({ coords }) {
  const mapRef = useRef(null);

  const path = useMemo(() => {
    if (!Array.isArray(coords)) return [];

    // Ordenar por createdAt ascendente y convertir a {lat,lng} validando todo
    const sorted = [...coords].sort(
      (a, b) =>
        new Date(a?.createdAt || 0).getTime() -
        new Date(b?.createdAt || 0).getTime()
    );

    const mapped = sorted
      .map((c) => {
        const lat = toNumber(c?.latitude);
        const lng = toNumber(c?.longitude);
        if (!isValidLatLng(lat, lng)) return null;
        return { lat, lng };
      })
      .filter(Boolean);

    // Quitar puntos duplicados consecutivos (opcional pero ayuda)
    const deduped = [];
    for (const p of mapped) {
      const last = deduped[deduped.length - 1];
      if (!last || last.lat !== p.lat || last.lng !== p.lng) deduped.push(p);
    }

    return deduped;
  }, [coords]);

  const last = path.length ? path[path.length - 1] : null;
  const center = last || { lat: 4.65, lng: -74.1 };

  // Fit bounds cuando haya puntos
  useEffect(() => {
    if (
      !mapRef.current ||
      path.length === 0 ||
      !window.google?.maps?.LatLngBounds
    )
      return;

    const bounds = new window.google.maps.LatLngBounds();
    path.forEach((p) => bounds.extend(p));
    if (!bounds.isEmpty()) mapRef.current.fitBounds(bounds);
  }, [path]);

  if (path.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
        Sin coordenadas válidas para mostrar
      </div>
    );
  }

  return (
    <div className="h-105 w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5">
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
        {/* Solo renderizar Polyline si hay al menos 2 puntos */}
        {path.length >= 2 && (
          <Polyline
            path={path}
            options={{
              strokeColor: "#1450ff",
              strokeOpacity: 0.9,
              strokeWeight: 5,
            }}
          />
        )}
        {/* Poner marca de ultima ubicación */}
        {last && (
          <Marker position={last} options={{ title: "Última ubicación" }} />
        )}
      </GoogleMap>
    </div>
  );
}
