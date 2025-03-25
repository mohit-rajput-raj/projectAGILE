import {create} from 'zustand'
import { axiosApi } from '../library/axios.js';

export const useAdminStore = create((set,get)=>({
    getReports: async () => {
        try {
            const res = await axiosApi.get('/admin/getReports');
            set({ reports: res.data });
          } catch (error) {
            console.log("Error in getReports store:", error);
            set({ reportsError: "Failed to load reports." });
          }
    },
    reports: [],
    reportsLoading: false,
    reportsError: null,
    bannUser:async (userId) => {
        try {
            set({banningLoading:true});
          const res = await axiosApi.post(`/admin/banUser/${userId}`);
          
        } catch (error) {
          console.log("Error in bannUser store:", error);
          set({ bannUserError: "Failed to ban user." });
        }finally{
            set({banningLoading:false});
        }
      },
    banningLoading:false,
    bannUserError: null,
    bannImediate:async(userId) =>{
        try {
            const res = await axiosApi.put(`/admin/bannImediate/${userId}`);
            
          } catch (error) {
            console.log("Error in bannUser store:", error);
            set({ bannUserError: "Failed to ban user." });
          }
    },
    users:[],
    usersLoading:false,
    getAllUses:async()=>{
        try {
            set({usersLoading:true});
            const res= await axiosApi.get(`/admin/getAllUses`);
            set({users:res.data});
          } catch (error) {
            console.log("Error in getAllUses store:", error);
            set({ bannUserError: "Failed to ban user." });
          }finally{
            set({usersLoading:false});
          }
    }

}))