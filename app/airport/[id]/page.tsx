import { aviationApi } from '@/services/aviationApi';
import { Map } from '@/components/Map';
import { BackButton } from '@/components/BackButton'; // Necesitarás crear este componente
import { DarkModeToggle } from '@/components/DarkModeToggle'; // Y este también

// generateStaticParams debe estar en un Server Component
export async function generateStaticParams() {
  const airports = [
    { id: '1' },  // JFK
    { id: '2' },  // LAX
    { id: '3' },  // MAD
    { id: '4' },  // BCN
    { id: '5' },  // CDG
    { id: '6' },  // LHR
    { id: '7' },  // NRT
    { id: '8' },  // DXB
    { id: '9' },  // SYD
    { id: '10' }, // GRU
  ];
  return airports;
}

async function getAirportData(id: string) {
  try {
    const airport = await aviationApi.getAirportById(id);
    return { airport, error: null };
  } catch (error) {
    return { airport: null, error: 'Aeropuerto no encontrado' };
  }
}

export default async function AirportDetail({ params }: { params: { id: string } }) {
  const { airport, error } = await getAirportData(params.id);

  if (error || !airport) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-200">
            <strong>Error:</strong> {error || 'Aeropuerto no encontrado'}
          </div>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <BackButton />
          <DarkModeToggle />
        </header>

        {/* Información del aeropuerto */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {airport.airport_name}
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
                    {airport.iata_code || 'N/A'}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Código ICAO:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {airport.icao_code || 'N/A'}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Ciudad:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {airport.city_iata_code || 'N/A'}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">País:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {airport.country_name}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Zona Horaria:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {airport.timezone}
                  </span>
                </div>
                
                {airport.phone_number && (
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Teléfono:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {airport.phone_number}
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
                    {airport.latitude}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Longitud:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {airport.longitude}
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
            latitude={parseFloat(airport.latitude)}
            longitude={parseFloat(airport.longitude)}
            airportName={airport.airport_name}
          />
        </div>
      </div>
    </div>
  );
}