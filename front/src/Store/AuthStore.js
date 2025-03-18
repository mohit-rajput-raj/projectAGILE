import { create } from "zustand";
import { axiosApi } from "../library/axios.js";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

export const useAuthStore = create((set, get) => ({
  isLogin: false,
  isSign: false,
  currUser: null,
  isLogingOut: false,
  socket: null,
  onlineUsers: [],
  registerError: false,
  loginError: false,
  updating: false,
  updatingError: null,

  getUser: async () => {
    set({ isLogin: true, loginError: false });
    try {
      const res = await axiosApi.get("/auth/authCheck");
      set({ currUser: res.data });
    } catch (error) {
      set({ currUser: null });
      console.error("Error in getUser store:", error);
    } finally {
      set({ isLogin: false });
    }
  },

  login: async (data) => {
    set({ loginError: false, isLogin: true });
    try {
      const res = await axiosApi.post("/auth/login", data);
      set({ currUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in login store:", error);
      set({ loginError: true });
    } finally {
      set({ isLogin: false });
    }
  },

  sendOtp: async (data) => {
    try {
      await axiosApi.post("/auth/sendotp", data);
    } catch (error) {
      console.error("Error in sendOtp:", error);
    }
  },

  verifOtp: async (data) => {
    try {
      return await axiosApi.post("/auth/verifotp", data);
    } catch (error) {
      console.error("Error in verifOtp:", error);
      return error.response
        ? new Error(error.response)
        : { status: 500, data: { msg: "Something went wrong" } };
    }
  },

  register: async (data) => {
    set({ registerError: false, isSign: true });
    try {
      const res = await axiosApi.post("/auth/register", data);
      set({ currUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ registerError: true });
      console.error(
        "Error in register store:",
        error?.response?.data?.msg || error
      );
    } finally {
      set({ isSign: false });
    }
  },

  logout: async () => {
    set({ isLogingOut: true });
    try {
      await axiosApi.get("/auth/logout");
      get().disconnectSocket();
      set({ currUser: null, loginError: false, registerError: false });
    } catch (error) {
      console.error("Error in logout store:", error);
    } finally {
      set({ isLogingOut: false });
    }
  },

  connectSocket: async () => {
    const { currUser } = get();
    if (!currUser?._id || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: currUser._id },
    });

    socket.connect();
    set({ socket });

    socket.on("onlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: async () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
    set({ socket: null });
  },

  updateProfile: async (data) => {
    try {
      set({ updating: true, updatingError: null });
      const res = await axiosApi.post("/auth/updateprofile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ currUser: res.data.user });
      return res.data;
    } catch (error) {
      set({ updatingError: error.response?.data?.msg || "Update failed" });
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      set({ updating: false });
    }
  },
}));
