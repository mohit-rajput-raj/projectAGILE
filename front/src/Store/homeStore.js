import { create } from "zustand";
import { axiosApi } from '../library/axios.js';

export const useHomeStore = create((set) => ({
  searchedUsers: [],
  searchBarDataLoading: false,
  searchBarDataError: null,

  getSearchedUsers: async (query) => {
    try {
      set({ searchBarDataLoading: true, searchBarDataError: null, searchedUsers: [] });

      const res = await axiosApi.get(`/home/searchPerson?query=${query}`);

      set({ searchedUsers: res.data || [] });
    } catch (error) {
      console.error('Error in getSearchedUsers:', error);
      set({ searchBarDataError: 'Failed to load users.' });
    } finally {
      set({ searchBarDataLoading: false });
    }
  }
}));
