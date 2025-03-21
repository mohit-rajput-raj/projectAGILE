import { create } from 'zustand';
import { axiosApi } from '../library/axios.js';
import { useAuthStore } from './AuthStore';

export const useMessagesStore = create((set, get) => ({
  selectedUser: null,
  error: null,
  getMessages: async (id) => {
    set({ messages: [] });
    const { selectedUser } = get();
    try {
      set({ messagesLoading: true, messagesError: null, messages: [] });
      const res = await axiosApi.get(`/messages/getMessages/${selectedUser._id}`);
      set({ messages: res.data.messages });
      // console.log(res.data.messages);
    } catch (error) {
      console.log('error in getMessages store:', error);
      set({ messagesError: 'Failed to load messages.' });
    } finally {
      set({ messagesLoading: false });
    }
  },
  messages: [],
  messagesLoading: false,
  messagesError: null,

  sendMessage: async (data) => {
    try {
      const selectedUser = get().selectedUser;
      if (!selectedUser?._id) {
        throw new Error('No selected user to send message to');
      }

      set({ sendMessageLoading: true, error: null });
      const res = await axiosApi.post(`/messages/createMessage/${selectedUser._id}`, data);

      // Optimistically add message to state
      set((state) => ({
        messages: [...state.messages, res.data],
        sendMessageLoading: false
      }));

      return res.data;
    } catch (error) {
      console.error('Error in sendMessage store:', error);
      set({ error: 'Failed to send message.', sendMessageLoading: false });
      throw error;
    }
  },
  sendMessageLoading: false,
  sendMessageError: null,

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
  deleteMessageLoading: false,
  deleteMessageError: null,

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
  updateMessageLoading: false,
  updateMessageError: null,

  getSideBarUsers: async () => {
    try {
      set({ sideBarUsersLoading: true, sideBarUsersError: null });
      const res = await axiosApi.get(`/messages/getSideBarUsers`);
      set({ sideBarUsers: res.data });
      set({ selectedUser: null });
      console.log(sideBarUsers);

    } catch (error) {
      console.log('Error in getSideBarUsers store:', error);
      set({ sideBarUsersError: 'Failed to load sidebar users.' });
    } finally {
      set({ sideBarUsersLoading: false });
    }
  },
  sideBarUsersLoading: false,
  sideBarUsersError: null,
  sideBarUsers: [],
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket?.connected) {
      console.error('Socket not connected');
      return;
    }

    // Remove any existing listeners to prevent duplicates
    socket.off("newMessage");

    // Subscribe to new messages
    socket.on("newMessage", (newMessage) => {
      const { selectedUser } = get(); // Get fresh selected user
      if (!selectedUser) return;

      // Check if message belongs to current chat
      const isRelevantMessage =
        (newMessage.senderId === selectedUser._id && newMessage.receiverId === useAuthStore.getState().currUser._id) ||
        (newMessage.receiverId === selectedUser._id && newMessage.senderId === useAuthStore.getState().currUser._id);

      if (!isRelevantMessage) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });

    // Reconnect handler
    socket.io.on("reconnect", () => {
      const { selectedUser } = get();
      if (selectedUser?._id) {
        get().getMessages(selectedUser._id);
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // Clean up all message-related listeners
    socket.off("newMessage");
    socket.off("messageDeleted");
    socket.off("messageUpdated");

    // Clear messages when unsubscribing
    set({ messages: [] });
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

}));
