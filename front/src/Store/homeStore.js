import { create } from "zustand";
import { axiosApi } from '../library/axios.js';

export const useHomeStore = create((set) => ({
  searchedUsers: [],
  SuggestedConnections:[],
  searchBarDataLoading: false,
  getSuggestedConnectionsLoading:false,


  searchBarDataError: null,
  suggestedConnectionsError:null,


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
  },
  getSuggestedConnections:async()=>{
    set({getSuggestedConnections:true});
    try {
      const res = await axiosApi.get("/home/getSuggestedConnections");
      set({SuggestedConnections:res.data||[]});
    } catch (error) {
      console.error('Error in getSuggestedConnections:', error);
      set({ suggestedConnectionsError: 'Failed to load suggec=stions.' });
    }finally{
      set({getSuggestedConnections:false});
    }
  },
  sendConnectRequest:async(userId)=>{
    try {
      const res = await axiosApi.post(`/user/connect/${userId}`);
    } catch (error) {
      console.error('Error in getSuggestedConnections:', error);
    }
  },
  sendAcceptConnection:async(userId)=>{
    try {
      const res = await axiosApi.put(`/user/accept/${userId}`);
    } catch (error) {
      console.error('Error in getSuggestedConnections:', error);
    }
  }
}));
