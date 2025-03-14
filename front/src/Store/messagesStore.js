import { create } from 'zustand';
import { axiosApi } from '../library/axios.js';

export const useMessagesStore = create((set, get) => ({
  sideBarUsers: [],
  messages: [],
  messagesLoading: false,
  sendMessageLoading: false,
  sideBarUsersLoding: false,
  onlineUsersLoding: false,
  updateMessageLoading: false,
  deleteMessageLoading: false,
  error: null,

  getMessages: async (id) => {
    try {
      set({ messagesLoading: true, error: null });
      const res = await axiosApi.get(`/messages/getMessages/${id}`);
      set({ messages: res.data.messages });
    } catch (error) {
      console.log('error in getMessages store:', error);
      set({ error: 'Failed to load messages.' });
    } finally {
      set({ messagesLoading: false });
    }
  },

  sendMessage: async (data, receiverId) => {
    try {
      set({ sendMessageLoading: true, error: null });
      const res = await axiosApi.post(`/messages/createMessage/${receiverId}`, data);
      console.log(res);
    } catch (error) {
      console.log('error in sendMessage store:', error);
      set({ error: 'Failed to send message.' });
    } finally {
      set({ sendMessageLoading: false });
    }
  },

  deleteMessage: async (id) => {
    try {
      set({ deleteMessageLoading: true, error: null });
      const res = await axiosApi.delete(`/messages/deleteMessage/${id}`);
      console.log(res);
    } catch (error) {
      console.log('error in deleteMessage store:', error);
      set({ error: 'Failed to delete message.' });
    } finally {
      set({ deleteMessageLoading: false });
    }
  },

  updateMessage: async (data, id) => {
    try {
      set({ updateMessageLoading: true, error: null });
      const res = await axiosApi.put(`/messages/updateMessage/${id}`, data);
      console.log(res);
    } catch (error) {
      console.log('error in updateMessage store:', error);
      set({ error: 'Failed to update message.' });
    } finally {
      set({ updateMessageLoading: false });
    }
  },

  getSideBarUsers: async () => {
    try {
      set({ sideBarUsersLoding: true, error: null });
      const res = await axiosApi.get(`/messages/getSideBarUsers`);
      set({ sideBarUsers: res.data.users });
    } catch (error) {
      console.log('error in getSideBarUsers store:', error);
      set({ error: 'Failed to load sidebar users.' });
    } finally {
      set({ sideBarUsersLoding: false });
    }
  }
}));
