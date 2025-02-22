import { create } from "zustand";
// import axios from "axios";
import {axiosApi} from '../library/axios.js';
export const useAuthStore = create((set, get) => ({
  isLogin: false,
  isSign: false,
  currUser: null,
  isLogingOut:false,

  getUser: async () => {
    try {
      const res = await axiosApi.get("/auth/authCheck");
      set({ currUser: res.data });
    } catch (error) {

      console.log("Error in getUser store:", error);
    }


  },

  login: async (data) => {
    // console.log(data);

    set({ isLogin: true });
    try {
      const res = await axiosApi.post("/auth/login",data);
      console.log(data);
      set({ currUser: res.data });
    } catch (error) {
      console.log("Error in login store:", error);
    } finally {
      set({ isLogin: false });
    }
  },
  sendOtp:async(data)=>{
    try {
      console.log(data.email);
      
      const res = await axiosApi.post("/auth/sendotp",data);
      
    } catch (error) {

      console.log('errorn in send otp',error.msg);

      
    }
  },
  verifOtp:async(data)=>{
    try {
      const res = await axiosApi.post("/auth/verifotp",data);
      return res;
    } catch (error) {
      console.log("Error in verifOtp:", error);
      if (error.response) {
        return new Error(error.response); 
      } else {
        return { status: 500, data: { msg: "Something went wrong" } };
      }
    }
  },

  register: async (data) => {
    set({ isSign: true });
    try {
      const res = await axiosApi.post("/auth/register",data);
      
      set({ currUser: res.data });
    } catch (error) {
      if(error?.res?.msg){
        console.log(error.res.msg);
        
      }
      console.log("Error in register store:", error);
    } finally {
      set({ isSign: false });
    }
  },

  logout: async () => {
    set({isLogingOut:true});
    try {
      const res = await axiosApi.get("/auth/logout");
      set({ currUser: null });
    } catch (error) {
      console.log("Error in logout store:", error);
    }finally{
      set({
        isLogingOut:false
      })
    }
  },
}));
