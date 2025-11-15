// services/aviationApi.ts
import { AirportResponse, Airport } from '@/types/airport';

const API_NINJAS_KEY = process.env.NEXT_PUBLIC_API_NINJAS_KEY;
const API_NINJAS_BASE_URL = 'https://api.api-ninjas.com/v1';

// Cache local para almacenar todos los aeropuertos
let allAirportsCache: Airport[] | null = null;

// Función auxiliar para filtrar aeropuertos localmente
const filterAirportsLocally = (airports: Airport[], search: string): Airport[] => {
  if (!search.trim()) return airports;

  const searchLower = search.toLowerCase();
  return airports.filter(airport => {
    const airportName = airport.airport_name || '';
    const iataCode = airport.iata_code || '';
    const icaoCode = airport.icao_code || '';
    const city = airport.city || '';
    const countryName = airport.country_name || '';

    return (
      airportName.toLowerCase().includes(searchLower) ||
      iataCode.toLowerCase().includes(searchLower) ||
      icaoCode.toLowerCase().includes(searchLower) ||
      city.toLowerCase().includes(searchLower) ||
      countryName.toLowerCase().includes(searchLower)
    );
  });
};

// Adaptador para API Ninjas
const adaptApiNinjasAirport = (apiData: any): Airport => ({
  id: apiData.iata || apiData.icao || Math.random().toString(),
  airport_id: apiData.iata || apiData.icao || Math.random().toString(),
  airport_name: apiData.name || 'Unknown Airport',
  iata_code: apiData.iata || '',
  icao_code: apiData.icao || '',
  city_iata_code: apiData.iata || '',
  city: apiData.city || 'Unknown',
  country_name: apiData.country || 'Unknown',
  country_iso2: apiData.country || '',
  latitude: apiData.latitude?.toString() || '0',
  longitude: apiData.longitude?.toString() || '0',
  timezone: apiData.timezone || 'Unknown',
  gmt: '',
  geoname_id: '',
  phone_number: '',
});

// Datos locales de respaldo (más completos)
const localAirportsData: Airport[] = [
  {
    id: '1',
    airport_id: '1',
    airport_name: 'John F. Kennedy International Airport',
    iata_code: 'JFK',
    icao_code: 'KJFK',
    city_iata_code: 'NYC',
    city: 'New York',
    country_name: 'United States',
    country_iso2: 'US',
    latitude: '40.639801',
    longitude: '-73.7789',
    timezone: 'America/New_York',
    gmt: '-5',
    geoname_id: '5115474',
    phone_number: '+1 718-244-4444',
  },
  {
    id: '2',
    airport_id: '2',
    airport_name: 'Los Angeles International Airport',
    iata_code: 'LAX',
    icao_code: 'KLAX',
    city_iata_code: 'LAX',
    city: 'Los Angeles',
    country_name: 'United States',
    country_iso2: 'US',
    latitude: '33.9425',
    longitude: '-118.408',
    timezone: 'America/Los_Angeles',
    gmt: '-8',
    geoname_id: '5368361',
    phone_number: '+1 855-463-5252',
  },
  {
    id: '3',
    airport_id: '3',
    airport_name: 'Madrid-Barajas Airport',
    iata_code: 'MAD',
    icao_code: 'LEMD',
    city_iata_code: 'MAD',
    city: 'Madrid',
    country_name: 'Spain',
    country_iso2: 'ES',
    latitude: '40.471926',
    longitude: '-3.56264',
    timezone: 'Europe/Madrid',
    gmt: '+1',
    geoname_id: '3117732',
    phone_number: '+34 913 21 10 00',
  },
  {
    id: '4',
    airport_id: '4',
    airport_name: 'Barcelona-El Prat Airport',
    iata_code: 'BCN',
    icao_code: 'LEBL',
    city_iata_code: 'BCN',
    city: 'Barcelona',
    country_name: 'Spain',
    country_iso2: 'ES',
    latitude: '41.297078',
    longitude: '2.078464',
    timezone: 'Europe/Madrid',
    gmt: '+1',
    geoname_id: '3128760',
    phone_number: '+34 913 21 10 00',
  },
  {
    id: '5',
    airport_id: '5',
    airport_name: 'Paris Charles de Gaulle Airport',
    iata_code: 'CDG',
    icao_code: 'LFPG',
    city_iata_code: 'PAR',
    city: 'Paris',
    country_name: 'France',
    country_iso2: 'FR',
    latitude: '49.0097',
    longitude: '2.5479',
    timezone: 'Europe/Paris',
    gmt: '+1',
    geoname_id: '6269554',
    phone_number: '+33 1 70 36 39 50',
  },
  {
    id: '6',
    airport_id: '6',
    airport_name: 'London Heathrow Airport',
    iata_code: 'LHR',
    icao_code: 'EGLL',
    city_iata_code: 'LON',
    city: 'London',
    country_name: 'United Kingdom',
    country_iso2: 'GB',
    latitude: '51.4700',
    longitude: '-0.4543',
    timezone: 'Europe/London',
    gmt: '+0',
    geoname_id: '2647216',
    phone_number: '+44 844 335 1801',
  },
  {
    id: '7',
    airport_id: '7',
    airport_name: 'Tokyo Narita International Airport',
    iata_code: 'NRT',
    icao_code: 'RJAA',
    city_iata_code: 'TYO',
    city: 'Tokyo',
    country_name: 'Japan',
    country_iso2: 'JP',
    latitude: '35.7647',
    longitude: '140.3864',
    timezone: 'Asia/Tokyo',
    gmt: '+9',
    geoname_id: '2113015',
    phone_number: '+81 476-34-5000',
  },
  {
    id: '8',
    airport_id: '8',
    airport_name: 'Dubai International Airport',
    iata_code: 'DXB',
    icao_code: 'OMDB',
    city_iata_code: 'DXB',
    city: 'Dubai',
    country_name: 'United Arab Emirates',
    country_iso2: 'AE',
    latitude: '25.2532',
    longitude: '55.3657',
    timezone: 'Asia/Dubai',
    gmt: '+4',
    geoname_id: '292223',
    phone_number: '+971 4 224 5555',
  },
  {
    id: '9',
    airport_id: '9',
    airport_name: 'Sydney Kingsford Smith Airport',
    iata_code: 'SYD',
    icao_code: 'YSSY',
    city_iata_code: 'SYD',
    city: 'Sydney',
    country_name: 'Australia',
    country_iso2: 'AU',
    latitude: '-33.9399',
    longitude: '151.1753',
    timezone: 'Australia/Sydney',
    gmt: '+10',
    geoname_id: '2147714',
    phone_number: '+61 2 9667 9111',
  },
  {
    id: '10',
    airport_id: '10',
    airport_name: 'São Paulo-Guarulhos International Airport',
    iata_code: 'GRU',
    icao_code: 'SBGR',
    city_iata_code: 'SAO',
    city: 'São Paulo',
    country_name: 'Brazil',
    country_iso2: 'BR',
    latitude: '-23.4356',
    longitude: '-46.4731',
    timezone: 'America/Sao_Paulo',
    gmt: '-3',
    geoname_id: '3470120',
    phone_number: '+55 11 2445-2945',
  }
];

export const aviationApi = {
  // Obtener TODOS los aeropuertos - versión simplificada usando datos locales
  async getAllAirports(): Promise<Airport[]> {
    // Si ya tenemos cache, retornarlo
    if (allAirportsCache && allAirportsCache.length > 0) {
      console.log('📦 Retornando aeropuertos desde cache:', allAirportsCache.length);
      return allAirportsCache;
    }

    // Para API Ninjas, vamos a usar un enfoque diferente
    // Ya que la API de aeropuertos parece no funcionar como esperábamos
    console.log('🔄 Usando datos locales de aeropuertos');
    allAirportsCache = localAirportsData;
    return localAirportsData;
  },

  // Buscar aeropuertos por nombre, ciudad o código
  async searchAirports(search: string): Promise<Airport[]> {
    console.log(`🔍 Buscando: "${search}" en datos locales`);
    
    try {
      // Primero intentar con API Ninjas si tenemos clave y la búsqueda es específica
      if (API_NINJAS_KEY && search.length >= 3) {
        try {
          console.log(`🌐 Intentando búsqueda en API Ninjas: "${search}"`);
          
          // Según la documentación de API Ninjas, probemos diferentes enfoques
          const endpoints = [
            `${API_NINJAS_BASE_URL}/airports?name=${encodeURIComponent(search)}`,
            `${API_NINJAS_BASE_URL}/airports?iata=${encodeURIComponent(search.toUpperCase())}`,
          ];

          for (const url of endpoints) {
            try {
              const res = await fetch(url, {
                headers: {
                  'X-Api-Key': API_NINJAS_KEY,
                },
              });
              
              console.log(`📡 API Ninjas status: ${res.status} para ${url}`);
              
              if (res.ok) {
                const data = await res.json();
                console.log(`✅ Resultados API Ninjas:`, data?.length || 0);
                
                if (data && Array.isArray(data) && data.length > 0) {
                  const airports = data.map(adaptApiNinjasAirport);
                  console.log(`🎯 Encontrados ${airports.length} aeropuertos via API`);
                  return airports;
                }
              } else {
                console.warn(`⚠️ API Ninjas error ${res.status} para ${url}`);
              }
            } catch (error) {
              console.warn(`⚠️ Error en request a ${url}:`, error);
            }
          }
        } catch (apiError) {
          console.warn('❌ Error con API Ninjas, usando búsqueda local:', apiError);
        }
      }

      // Si no hay resultados de API o falla, usar búsqueda local
      const allAirports = await this.getAllAirports();
      const localResults = filterAirportsLocally(allAirports, search);
      console.log(`🏠 Resultados locales: ${localResults.length}`);
      return localResults;
      
    } catch (error: any) {
      console.error('❌ Error en búsqueda:', error);
      const allAirports = await this.getAllAirports();
      return filterAirportsLocally(allAirports, search);
    }
  },

  // Filtrar y paginar en el frontend
  async getAirports(page: number = 1, search: string = ''): Promise<AirportResponse> {
    try {
      console.log(`📊 Solicitando página ${page}, búsqueda: "${search}"`);
      
      let filteredAirports: Airport[];
      
      if (search.trim()) {
        filteredAirports = await this.searchAirports(search);
      } else {
        filteredAirports = await this.getAllAirports();
      }

      const limit = 10;
      const offset = (page - 1) * limit;

      console.log(`📈 Total resultados: ${filteredAirports.length}`);

      // Aplicar paginación
      const paginated = filteredAirports.slice(offset, offset + limit);

      return {
        data: paginated,
        pagination: {
          offset,
          limit,
          total: filteredAirports.length,
          count: paginated.length,
        },
      };
    } catch (error: any) {
      console.error('❌ Error obteniendo aeropuertos:', error);
      // En caso de error, retornar datos locales
      const allAirports = await this.getAllAirports();
      const limit = 10;
      const offset = (page - 1) * limit;
      const paginated = allAirports.slice(offset, offset + limit);

      return {
        data: paginated,
        pagination: {
          offset,
          limit,
          total: allAirports.length,
          count: paginated.length,
        },
      };
    }
  },

   async getAirportById(id: string): Promise<Airport> {
    try {
      const allAirports = await this.getAllAirports();
      const airport = allAirports.find(a => 
        (a.iata_code && a.iata_code.toUpperCase() === id.toUpperCase()) || 
        (a.icao_code && a.icao_code.toUpperCase() === id.toUpperCase()) ||
        a.id === id
      );
      
      if (airport) {
        return airport;
      }
      throw new Error(`Aeropuerto "${id}" no encontrado`);
    } catch (error) {
      console.error('❌ Error buscando aeropuerto por ID:', error);
      throw error;
    }
  }
};  