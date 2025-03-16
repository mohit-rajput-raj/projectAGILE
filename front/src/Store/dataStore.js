import { create } from "zustand";
import {axiosApi} from '../library/axios.js';
export const useUsersData =create((set,get)=>({
    userProfile:null,
    isUserProfileLoading:false,
    names:null,
    
    getNames:async()=>{
        try {
            const res = await axiosApi.get("/dashboard/getNames");
            set({ names: res.data });
          } catch (error) {
      
            console.log("Error in getNames storesdf:", error,'holy');
          }
    },
    getUserProfile: async (username) => {
      try {
        set({ isUserProfileLoading: true });
    
        const res = await axiosApi.get(`/user/getUserProfile/${username}`);
        // console.log(res);
        
        if (res?.data) {
          set({ userProfile: res.data });
        } else {
          set({ userProfile: null }); 
          console.error("Empty response received from API");
        }
      } catch (error) {
        console.error("Error in getUserProfile store:", error);
        set({ userProfile: null }); 
      } finally {
        set({ isUserProfileLoading: false });
      }
    },
    
}))