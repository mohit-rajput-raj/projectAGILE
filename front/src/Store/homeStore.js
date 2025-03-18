import { create } from "zustand";
import { axiosApi } from '../library/axios.js';

export const useHomeStore = create((set) => ({
  searchedUsers: [],
  SuggestedConnections:[],
  searchBarDataLoading: false,
  getSuggestedConnectionsLoading:false,


  searchBarDataError: null,
  suggestedConnectionsError:null,

  isInContactsLoading:false,
  isInContactsError:null,
  contactsSaved:false,

  allContacts:null,
  allContactsLoading:false,
  allContactsError:null,

  addingContacts:false,

  removingFromContacts:false,

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
  removeContact:async(userId)=>{
    set({removingFromContacts:true});
    try {
      const res = await axiosApi.put(`/user/removeContact/${userId}`);
    } catch (error) {
      console.log(error);
    }finally{
      set({removingFromContacts:false});
    }

  },
  isInContacts:async(userId)=>{
    try {
      set({isInContactsLoading:true,isInContactsError:null});
      const res = await axiosApi.get(`/user/isInContacts/${userId}`);
      set({contactsSaved:res.data});
    } catch (error) {
      console.error('Error in getSuggestedConnections:', error);
      set({isInContactsError:'Failed to check contacts.'});
    }finally{
      set({isInContactsLoading:false});
    }
  },
  sendAcceptConnection:async(userId)=>{
    try {
      const res = await axiosApi.put(`/user/accept/${userId}`);
    } catch (error) {
      console.error('Error in getSuggestedConnections:', error);
    }
  },
  addContact:async(userId)=>{
    try {
      set({addingContacts:true});
      const res = await axiosApi.post(`/user/addContact/${userId}`);
    } catch (error) {
      console.error('Error in getSuggestedConnections:', error);
    }finally{
      set({addingContacts:false});
    }
  },
  getContacts:async()=>{
    try {
      set({allContactsError:null,allContactsLoading:true});
      const res = await axiosApi.get(`/user/getContacts`);
      set({allContacts:res.data})
    } catch (error) {
      set({allContactsError:error});
      console.error('Error in getSuggestedConnections:', error);
    }finally{
      set({allContactsLoading:false});
    }
  }
}));
