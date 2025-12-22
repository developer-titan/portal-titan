"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useJsApiLoader } from "@react-google-maps/api";
import TrackingMap from "@/components/tracking/TrackingMap";
import { getCoordsByRemision } from "@/services/tracking.service";

const msToKmh = (ms) => (typeof ms === "number" ? ms * 3.6 : null);

function StatusBadge({ status }) {
  const label =
    status === "T"
      ? "En tránsito"
      : status === "C"
      ? "Cerrado"
      : status === "O"
      ? "En despacho"
      : "N/D";

  const style =
    status === "T"
      ? "bg-[#1450ff]/15 text-[#6aa1ff] border-[#1450ff]/30"
      : status === "C"
      ? "bg-emerald-400/10 text-emerald-200 border-emerald-300/20"
      : status === "O"
      ? "bg-amber-400/10 text-amber-200 border-amber-300/20"
      : "bg-white/5 text-white/70 border-white/10";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${style}`}
    >
      {label}
    </span>
  );
}

export default function TrackingPage() {
  const { remision } = useParams();

  const { isLoaded: mapsLoaded, loadError: mapsError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [address, setAddress] = useState(null);
  const [geoError, setGeoError] = useState(null);

  const data = payload?.data || null;
  const docStatus = data?.DocStatus;

  const coords = useMemo(() => data?.coords || [], [data]);

  const lastCoordObj = useMemo(() => {
    if (!Array.isArray(coords) || coords.length === 0) return null;
    const sorted = [...coords].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    return sorted[sorted.length - 1];
  }, [coords]);

  const lastLatLng = useMemo(() => {
    if (!lastCoordObj) return null;
    return { lat: lastCoordObj.latitude, lng: lastCoordObj.longitude };
  }, [lastCoordObj]);

  const speedKmh = useMemo(() => {
    const kmh = msToKmh(lastCoordObj?.speed);
    return typeof kmh === "number" ? Math.round(kmh) : null;
  }, [lastCoordObj]);

  const fetchData = async () => {
    try {
      setError(null);
      const res = await getCoordsByRemision(remision);
      setPayload(res);
    } catch (e) {
      setError("No se pudo consultar el tracking. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!remision) return;
    setLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remision]);

  useEffect(() => {
    if (!remision) return;
    if (docStatus !== "T") return;

    const id = setInterval(fetchData, 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remision, docStatus]);

  useEffect(() => {
    if (!mapsLoaded || !lastLatLng) return;
    if (!window.google?.maps?.Geocoder) return;

    const geocoder = new window.google.maps.Geocoder();
    setGeoError(null);

    geocoder.geocode({ location: lastLatLng }, (results, status) => {
      if (status === "OK" && results?.[0])
        setAddress(results[0].formatted_address);
      else {
        setAddress(null);
        setGeoError("No se pudo obtener la dirección");
      }
    });
  }, [mapsLoaded, lastLatLng?.lat, lastLatLng?.lng]);

  // UI states
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050b18] p-6 text-white">
        Cargando tracking…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050b18] p-6 text-white">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Error</div>
          <div className="mt-2 text-white/70">{error}</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#050b18] p-6 text-white">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Remisión: {remision}</div>
          <div className="mt-2 text-white/70">
            {payload?.msg ||
              "No se encontraron datos para la remisión proporcionada"}
          </div>
        </div>
      </div>
    );
  }

  if (mapsError) {
    return (
      <div className="min-h-screen bg-[#050b18] p-6 text-white">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Error</div>
          <div className="mt-2 text-white/70">
            No se pudo cargar Google Maps.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050b18] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* HEADER FULL WIDTH */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm text-white/60">Tracking</div>

              <h1 className="mt-1 text-2xl font-semibold">
                Remisión <span className="text-[#6aa1ff]">{data.DocNum}</span>
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge status={docStatus} />
                <span className="text-xs text-white/55">
                  Planta: {data.Planta}
                </span>
                <span className="text-xs text-white/55">
                  Empresa: {data.Empresa}
                </span>
              </div>
            </div>

            {docStatus === "T" && (
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75">
                Actualizando cada <span className="text-white">15s</span>
              </div>
            )}
          </div>
        </div>

        {/* INFO REMISIÓN (DEBAJO DEL HEADER) */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">
            Información de la remisión
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs text-white/55">Cliente</div>
              <div className="mt-1 text-sm font-semibold text-white">
                {data.CardName}
              </div>
              <div className="mt-1 text-xs text-white/55">{data.CardCode}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs text-white/55">Conductor</div>
              <div className="mt-1 text-sm font-semibold text-white">
                {data.U_CSS_NOMCONDUCTOR || "—"}
              </div>
              <div className="mt-1 text-xs text-white/55">
                CC: {data.U_TT_CcConductor || "—"}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs text-white/55">DocEntry</div>
              <div className="mt-1 text-sm font-semibold text-white">
                {data.DocEntry}
              </div>
              <div className="mt-1 text-xs text-white/55">
                DocStatus: {docStatus}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs text-white/55">Fecha documento</div>
              <div className="mt-1 text-sm font-semibold text-white">
                {data.DocDate
                  ? new Date(data.DocDate).toLocaleDateString()
                  : "—"}
              </div>
              <div className="mt-1 text-xs text-white/55">
                GPS:{" "}
                {data.gpsDate
                  ? new Date(data.gpsDate).toLocaleDateString()
                  : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* UBICACIÓN + VELOCIDAD (DEBAJO DE INFO) */}
        {(docStatus === "T" || docStatus === "C") && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold">Ubicación actual</div>
                <div className="mt-1 text-sm text-white/75">
                  {address
                    ? address
                    : geoError
                    ? geoError
                    : "Resolviendo dirección…"}
                </div>
                {lastLatLng && (
                  <div className="mt-1 text-xs text-white/55">
                    {lastLatLng.lat.toFixed(5)}, {lastLatLng.lng.toFixed(5)}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="text-xs text-white/55">Velocidad</div>
                <div className="mt-1 text-lg font-semibold">
                  {speedKmh !== null ? `${speedKmh} km/h` : "—"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MAPA (DEBAJO) */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">Recorrido</div>
            <div className="text-xs text-white/55">
              Puntos: {coords?.length || 0}{" "}
              {docStatus === "C" ? "• (Cerrado)" : ""}
            </div>
          </div>

          {docStatus === "O" ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/75">
              Esta remisión está en estado{" "}
              <span className="font-semibold text-amber-200">Abierta (O)</span>.
              Aún no inicia recorrido, por eso no se muestra el mapa.
            </div>
          ) : mapsLoaded ? (
            <TrackingMap coords={coords} />
          ) : (
            <div className="text-white/70">Cargando mapa…</div>
          )}
        </div>

        {/* PRODUCTOS (DEBAJO DEL MAPA) */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Productos</div>
            <div className="text-xs text-white/55">
              Total: {(data.productos || []).length}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(data.productos || []).map((p, idx) => (
              <div
                key={`${p.ItemCode}-${idx}`}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="text-sm font-semibold">{p.Dscription}</div>
                <div className="mt-1 text-xs text-white/55">
                  {p.ItemCode} • Cant: {p.Quantity}
                </div>
              </div>
            ))}

            {(data.productos || []).length === 0 && (
              <div className="text-sm text-white/70">—</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
