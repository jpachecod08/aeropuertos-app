// components/Map.tsx
"use client";

import { useEffect, useState } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  airportName: string;
}

export const Map = ({ latitude, longitude, airportName }: MapProps) => {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        const L = await import("leaflet");
        const { MapContainer, TileLayer, Marker, Popup } = await import("react-leaflet");

        // FIX del icono
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        // COMPONENTE FINAL DEL MAPA (sin whenReady, sin errores TS)
        const Component = () => (
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[latitude, longitude]}>
              <Popup>
                <div className="text-center">
                  <strong className="text-lg block mb-2">✈️ {airportName}</strong>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div>Lat: {latitude.toFixed(6)}</div>
                    <div>Lng: {longitude.toFixed(6)}</div>
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        );

        setMapComponent(() => Component);
      } catch (err) {
        console.error("Error loading map:", err);
        setError("Error al cargar el mapa.");
      } finally {
        setLoading(false);
      }
    };

    loadMap();
  }, [latitude, longitude, airportName]);

  // ✔ Validación de coordenadas
  const isValidCoords =
    !isNaN(latitude) &&
    !isNaN(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180;

  if (!isValidCoords) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Coordenadas inválidas</p>
          <p className="text-gray-600 text-sm mt-2">Lat: {latitude} | Lng: {longitude}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <p className="text-gray-600 text-sm">Intenta recargar la página</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
      {MapComponent && <MapComponent />}
    </div>
  );
};
