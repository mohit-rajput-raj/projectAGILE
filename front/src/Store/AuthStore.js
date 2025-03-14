import { create } from "zustand";
// import axios from "axios";
import {axiosApi} from '../library/axios.js';
import { disconnect } from "mongoose";
import {io} from 'socket.io-client';
const BASE_URL = 'http://localhost:3000';
export const useAuthStore = create((set, get) => ({
  isLogin: false,
  isSign: false,
  currUser: null,
  isLogingOut:false,
  socket:null,
  onlineUsers:[],
  registerError: false,
  loginError:false,
  getUser: async () => {
    set({ isLogin: true });
    set({ loginError: false });
    try {
      const res = await axiosApi.get("/auth/authCheck");
      set({ currUser: res.data });
    } catch (error) {
      set({ currUser: null });
      console.log("Error in getUser store:", error);
    }finally{
      set({ isLogin: false });
    }


  },

  login: async (data) => {
    // console.log(data);
    set({ loginError: false });
    set({ isLogin: true });
    try {
      const res = await axiosApi.post("/auth/login",data);
      console.log(data);
      set({ currUser: res.data });
      get().connectSocket();
    //  await console.log(get().socket);


    } catch (error) {

      console.log("Error in login store:", error);
      set({ loginError: true });
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
    set({ registerError: false });
    set({ isSign: true });
    try {
      const res = await axiosApi.post("/auth/register",data);
      
      set({ currUser: res.data });
      get().connectSocket();

    } catch (error) {
      set({ registerError: true });
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
      get().disconnectSocket();
      set({ currUser: null });
    } catch (error) {
      console.log("Error in logout store:", error);
    }finally{
      set({
        isLogingOut:false
      })
    }
  },
  connectSocket:async()=>{
    const {currUser} = get();

    if(get().socket?.connected) return;
    const socket = io(BASE_URL,{
      query:{
        userId:currUser._id,
      },
    });
    socket.connect();
    
    
    set({socket});
    socket.on('onlineUsers',(userIds)=>{
      set({onlineUsers:userIds});
    })
  },
  disconnectSocket:async()=>{
    console.log("disconnecting   ",get().socket);
    if(get().socket?.connected) get().socket.disconnect();
    set({socket:null});
    console.log(get().socket);
    
  },
}));
