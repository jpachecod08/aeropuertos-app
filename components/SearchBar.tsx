'use client';

import { useState } from 'react';
import { useAirportStore } from '@/stores/airportStore';

export const SearchBar = () => {
  const [localSearch, setLocalSearch] = useState('');
  const { searchTerm, searchHistory, fetchAirports, setSearchTerm } = useAirportStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      fetchAirports(1, localSearch.trim());
    }
  };

  const handleClear = () => {
    setLocalSearch('');
    setSearchTerm('');
    fetchAirports(1, '');
  };

  const selectFromHistory = (term: string) => {
    setLocalSearch(term);
    fetchAirports(1, term);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Buscar por nombre o código del aeropuerto..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Buscar
        </button>
        {(searchTerm || localSearch) && (
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Limpiar
          </button>
        )}
      </form>

      {searchHistory.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Historial:</span>
          {searchHistory.map((term, index) => (
            <button
              key={index}
              onClick={() => selectFromHistory(term)}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};