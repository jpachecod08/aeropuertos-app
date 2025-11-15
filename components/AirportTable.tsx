'use client';

import Link from 'next/link';
import { Airport } from '@/types/airport';
import { useAirportStore } from '@/stores/airportStore';

interface AirportTableProps {
  airports: Airport[];
}

export const AirportTable = ({ airports }: AirportTableProps) => {
  const { currentPage, totalCount, fetchAirports } = useAirportStore();
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchAirports(newPage);
    }
  };

  // Función para obtener el identificador correcto
  const getAirportIdentifier = (airport: Airport) => {
    // Priorizar ICAO, luego IATA, luego el nombre como fallback
    return airport.icao_code || airport.iata_code || airport.airport_name;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Código IATA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Código ICAO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Ciudad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                País
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {airports.map((airport) => {
              const identifier = getAirportIdentifier(airport);
              return (
                <tr 
                  key={identifier} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      href={`/airport/${encodeURIComponent(identifier)}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      {airport.airport_name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {airport.iata_code || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {airport.icao_code || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {airport.city_iata_code || airport.city || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {airport.country_name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex-1 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, totalCount)}
              </span>{' '}
              de <span className="font-medium">{totalCount}</span> resultados
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            >
              Anterior
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};