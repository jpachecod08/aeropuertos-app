'use client';

import Link from 'next/link';
import { Airport } from '@/types/airport';

interface AirportCardProps {
  airport: Airport;
}

export const AirportCard = ({ airport }: AirportCardProps) => {
  // Función para obtener el identificador correcto
  const getAirportIdentifier = (airport: Airport) => {
    return airport.icao_code || airport.iata_code || airport.airport_name;
  };

  const identifier = getAirportIdentifier(airport);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        <Link 
          href={`/airport/${encodeURIComponent(identifier)}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {airport.airport_name}
        </Link>
      </h3>
      
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex justify-between">
          <span className="font-medium">Código IATA:</span>
          <span>{airport.iata_code || 'N/A'}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Código ICAO:</span>
          <span>{airport.icao_code || 'N/A'}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Ciudad:</span>
          <span>{airport.city_iata_code || 'N/A'}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">País:</span>
          <span>{airport.country_name}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Zona Horaria:</span>
          <span>{airport.timezone}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link 
          href={`/airport/${encodeURIComponent(identifier)}`}
          className="inline-block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};