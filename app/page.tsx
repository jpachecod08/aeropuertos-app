'use client';

import { useEffect, useState } from 'react';
import { useAirportStore } from '@/stores/airportStore';
import { AirportTable } from '@/components/AirportTable';
import { AirportCard } from '@/components/AirportCard';
import { SearchBar } from '@/components/SearchBar';
import { LoadingSpinner } from '@/components/LoadingSpinner';

type ViewMode = 'table' | 'cards';

export default function Home() {
  const { airports, loading, error, fetchAirports, darkMode, toggleDarkMode } = useAirportStore();
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  useEffect(() => {
    fetchAirports(1);
  }, [fetchAirports]);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-200">
            <strong>Error:</strong> {error}
            <br />
            <span className="text-sm">Verifica tu conexión a internet y que la API key sea válida.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    // FORZAR estilos explícitamente
    <div 
      className="min-h-screen transition-colors" 
      style={{
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        color: darkMode ? 'white' : 'black'
      }}
    >
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 
            className="text-3xl font-bold"
            style={{ color: darkMode ? 'white' : 'black' }}
          >
            ✈️ Aeropuertos del Mundo
          </h1>
          <div className="flex gap-2">
            {/* Selector de vista */}
            <div 
              className="flex rounded-lg p-1"
              style={{ backgroundColor: darkMode ? '#374151' : '#e5e7eb' }}
            >
              <button
                onClick={() => setViewMode('table')}
                style={{
                  backgroundColor: viewMode === 'table' ? (darkMode ? '#4b5563' : 'white') : 'transparent',
                  color: viewMode === 'table' ? (darkMode ? 'white' : 'black') : (darkMode ? '#d1d5db' : '#374151')
                }}
                className="px-3 py-1 rounded-md transition-colors"
              >
                Tabla
              </button>
              <button
                onClick={() => setViewMode('cards')}
                style={{
                  backgroundColor: viewMode === 'cards' ? (darkMode ? '#4b5563' : 'white') : 'transparent',
                  color: viewMode === 'cards' ? (darkMode ? 'white' : 'black') : (darkMode ? '#d1d5db' : '#374151')
                }}
                className="px-3 py-1 rounded-md transition-colors"
              >
                Tarjetas
              </button>
            </div>
            
            {/* Botón modo oscuro */}
            <button
              onClick={toggleDarkMode}
              style={{
                backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                color: darkMode ? '#d1d5db' : '#374151'
              }}
              className="px-4 py-2 rounded-lg transition-colors"
            >
              {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
            </button>
          </div>
        </header>

        {/* Barra de búsqueda */}
        <SearchBar />

        {/* Contenido principal */}
        <main>
          {loading ? (
            <LoadingSpinner />
          ) : viewMode === 'table' ? (
            <AirportTable airports={airports} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airports.map((airport) => (
                <AirportCard key={airport.airport_id} airport={airport} />
              ))}
            </div>
          )}
        </main>

        {/* Información de la API */}
        <footer 
          className="mt-8 text-center text-sm"
          style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
        >
          <p>Base de datos de aeropuertos global</p>
          <p>Mostrando {airports.length} aeropuertos</p>
        </footer>
      </div>
    </div>
  );
}