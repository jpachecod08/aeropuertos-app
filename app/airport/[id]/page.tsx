'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAirportStore } from '@/stores/airportStore';
import { Map } from '@/components/Map';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function AirportDetail() {
  const params = useParams();
  const router = useRouter();
  const { currentAirport, loading, error, fetchAirportById, darkMode, toggleDarkMode } = useAirportStore();
  
  const airportId = params.id as string;

  useEffect(() => {
    if (airportId) {
      fetchAirportById(airportId);
    }
  }, [airportId, fetchAirportById]);

  if (loading) {
    return (
      <div className={`min-h-screen transition-colors ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto p-4">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !currentAirport) {
    return (
      <div className={`min-h-screen transition-colors ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-200">
            <strong>Error:</strong> {error || 'Aeropuerto no encontrado'}
          </div>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← Volver
          </button>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </header>

        {/* Información del aeropuerto */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {currentAirport.airport_name}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Información General
              </h2>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Código IATA:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {currentAirport.iata_code || 'N/A'}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Código ICAO:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {currentAirport.icao_code || 'N/A'}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Ciudad:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {currentAirport.city_iata_code || 'N/A'}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">País:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {currentAirport.country_name}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Zona Horaria:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {currentAirport.timezone}
                  </span>
                </div>
                
                {currentAirport.phone_number && (
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Teléfono:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {currentAirport.phone_number}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Ubicación
              </h2>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Latitud:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {currentAirport.latitude}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Longitud:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {currentAirport.longitude}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Ubicación en el Mapa
          </h2>
          <Map
            latitude={parseFloat(currentAirport.latitude)}
            longitude={parseFloat(currentAirport.longitude)}
            airportName={currentAirport.airport_name}
          />
        </div>
      </div>
    </div>
  );
}