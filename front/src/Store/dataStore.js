import { create } from "zustand";
import {axiosApi} from '../library/axios.js';
export const useUsersData =create((set,get)=>({
    names:null,
    getNames:async()=>{
        try {
            const res = await axiosApi.get("/dashboard/getNames");
            set({ names: res.data });
          } catch (error) {
      
            console.log("Error in getNames storesdf:", error,'holy');
          }
    }
}))