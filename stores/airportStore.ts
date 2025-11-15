import { create } from 'zustand';
import { Airport } from '@/types/airport';
import { aviationApi } from '@/services/aviationApi';

interface AirportState {
  airports: Airport[];
  currentAirport: Airport | null;
  loading: boolean;
  error: string | null;
  searchHistory: string[];
  currentPage: number;
  totalCount: number;
  searchTerm: string;
  darkMode: boolean;
  
  // Actions
  fetchAirports: (page?: number, search?: string) => Promise<void>;
  fetchAirportById: (id: string) => Promise<void>;
  addToSearchHistory: (term: string) => void;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  toggleDarkMode: () => void;
  clearError: () => void;
}

export const useAirportStore = create<AirportState>((set, get) => ({
  airports: [],
  currentAirport: null,
  loading: false,
  error: null,
  searchHistory: [],
  currentPage: 1,
  totalCount: 0,
  searchTerm: '',
  darkMode: false,

  fetchAirports: async (page = 1, search = '') => {
    set({ loading: true, error: null });
    
    try {
      const response = await aviationApi.getAirports(page, search);
      set({ 
        airports: response.data,
        totalCount: response.pagination?.total ?? 0,
        currentPage: page,
        searchTerm: search,
        loading: false 
      });

      if (search) {
        get().addToSearchHistory(search);
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
    }
  },

  fetchAirportById: async (id: string) => {
    set({ loading: true, error: null });
    
    try {
      const airport = await aviationApi.getAirportById(id);
      set({ 
        currentAirport: airport,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false 
      });
    }
  },

  addToSearchHistory: (term: string) => {
    if (!term.trim()) return;
    
    set((state) => {
      const newHistory = [term, ...state.searchHistory.filter(t => t !== term)].slice(0, 5);
      return { searchHistory: newHistory };
    });
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  toggleDarkMode: () => {
    set((state) => ({ darkMode: !state.darkMode }));
  },

  clearError: () => {
    set({ error: null });
  },
}));