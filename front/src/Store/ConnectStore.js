import { create } from 'zustand';
import { axiosApi } from '../library/axios.js';

export const useConnectStore = create((set, get) => ({
    followRequestSending: false,
    followRequestError: null,

    unfollowRequestSending: false,
    unfollowRequestError: null,

    connectionRequests: [],
    connectionRequestsLoading: false,
    connectionRequestsError: null,

    connections: [],
    connectionsLoading: false,
    connectionsError: null,

    isFollowing: false,
    ToggleFollowingLoading: false,
    isFollowingError: null,
    getIsFollowing: async (userId) => {
        try {
            set({ isFollowingLoading: true, isFollowingError: null });
            const res = await axiosApi.get(`/connections/amIFollowing/${userId}`);
            set({ isFollowing: res.data });
        } catch (error) {
            console.error("Error in getIsFollowing store:", error);
            set({ isFollowingError: "Failed to check follow status." });
        } finally {
            set({ isFollowingLoading: false });
        }
    },
    sendFollowRequest: async (userId) => {
        try {
            set({ ToggleFollowingLoading: true, followRequestError: null });
            const res = await axiosApi.post(`/connections/toggleFollow/${userId}`);
            console.log(res);
           
        } catch (error) {
            console.error("Error in sendFollowRequest store:", error);
            set({ followRequestError: "Failed to send follow request." });
        } finally {
            set({ ToggleFollowingLoading: false });
        }
    },

    sendUnfollowRequest: async (userId) => {
        try {
            set({ToggleFollowingLoading: true, unfollowRequestError: null });
            const res = await axiosApi.post(`/connections/toggleFollow/${userId}`);
            console.log(res);
            
        } catch (error) {
            console.error("Error in sendUnfollowRequest store:", error);
            set({ unfollowRequestError: "Failed to unfollow user." });
        } finally {
            set({ ToggleFollowingLoading: false });
        }
    },

    sendConnectionRequest: async (userId) => {
        try {
            set({ connectionRequestsLoading: true, connectionRequestsError: null });
            await axiosApi.post(`/connections/toggleConnectionRequest/${userId}`);
            set((state) => ({
                connectionRequests: [...state.connectionRequests, { userId, status: "pending" }],
            }));
        } catch (error) {
            console.error("Error in sendConnectionRequest store:", error);
            set({ connectionRequestsError: "Failed to send connection request." });
        } finally {
            set({ connectionRequestsLoading: false });
        }
    },
    

    acceptConnectionRequest: async (requestId) => {
        try {
            await axiosApi.post(`/connections/accept/${requestId}`);
            set((state) => ({
                connectionRequests: state.connectionRequests.filter((req) => req._id !== requestId),
                connections: [...state.connections, requestId],
            }));
        } catch (error) {
            console.error("Error in acceptConnectionRequest store:", error);
            set({ acceptRequestError: "Failed to accept connection request." });
        }
    },
    inConnection:false,
    isInConnections:async(userId)=>{
        try {
            // set({ connectionsLoading: true, connectionsError: null });
            const res = await axiosApi.get(`/connections/isInConnections/${userId}`);
            set({ inConnection: res.data });
        } catch (error) {
            console.error("Error in isInConnections store:", error);
            set({ connectionsError: "Failed to fetch connections." });
        } finally {
            set({ connectionsLoading: false });
        }
    },

    rejectConnectionRequest: async (requestId) => {
        try {
            await axiosApi.post(`/connections/reject/${requestId}`);
            set((state) => ({
                connectionRequests: state.connectionRequests.filter((req) => req._id !== requestId),
            }));
        } catch (error) {
            console.error("Error in rejectConnectionRequest store:", error);
            set({ acceptRequestError: "Failed to reject connection request." });
        }
    },

    getConnectionRequests: async () => {
        try {
            set({ connectionRequestsLoading: true, connectionRequestsError: null });
            const res = await axiosApi.get("/connections/getConnectionRequests");
            set({ connectionRequests: res.data });
        } catch (error) {
            console.error("Error in getConnectionRequests store:", error);
            set({ connectionRequestsError: "Failed to fetch connection requests." });
        } finally {
            set({ connectionRequestsLoading: false });
        }
    },

    getConnections: async () => {
        try {
            set({ connectionsLoading: true, connectionsError: null });
            const res = await axiosApi.get("/connect/getUserConnections");
            set({ connections: res.data });
        } catch (error) {
            console.error("Error in getConnections store:", error);
            set({ connectionsError: "Failed to fetch connections." });
        } finally {
            set({ connectionsLoading: false });
        }
    },
  

    removeConnection: async (userId) => {
        try {
            await axiosApi.delete(`/connect/removeConnection/${userId}`);
            set((state) => ({
                connections: state.connections.filter((id) => id !== userId),
            }));
        } catch (error) {
            console.error("Error in removeConnection store:", error);
            set({ connectionsError: "Failed to remove connection." });
        }
    },
}));
