import { create } from 'zustand';
import { axiosApi } from '../library/axios.js';
import { makeUnRead } from '../../../backend/src/controler/notificationControler.js';

export const useNotificationStore = create((set, get) => ({
    notifications: [],
    notificationsLoading: false,
    notificationsError: null,

    

    getNotifications: async () => {
        try {
            set({ notificationsLoading: true, notificationsError: null });
            const res = await axiosApi.get('/notifications/getNotifications');
            set({ notifications: res.data });
        } catch (error) {
            console.error('Error in getNotifications store:', error);
            set({ notificationsError: 'Failed to load notifications.' });
        } finally {
            set({ notificationsLoading: false });
        }
    },
    unreadNotifications: null,
    unreadNotificationsLoading: false,
    unreadNotificationsError: null,
    getUnreadNotifications: async () => {
        try {
            set({unreadNotificationsLoading: true, unreadNotificationsError: null})
            const res = await axiosApi.get('/notifications/getUnreadNotificationsCount');
            set({unreadNotifications: res.data})
        } catch (error) {
            console.error('Error in getUnreadNotifications store:', error);
            set({unreadNotificationsError: 'Failed to load unread notifications.'})
        } finally {
            set({unreadNotificationsLoading: false})
        }
    },
    getJobNotifications:async() => {
        try {
            set({jobNotificationsLoading: true, jobNotificationsError: null})
            const res = await axiosApi.get('/notifications/getJobNotifications')
            set({jobNotifications: res.data})
        } catch (error) {
            console.error('Error in getJobNotifications store:', error)
            set({jobNotificationsError: 'Failed to load job notifications.'})
        } finally {
            set({jobNotificationsLoading: false})
        }
    },
    jobNotifications: [],
    jobNotificationsLoading: false,
    jobNotificationsError: null,
    getLikeNotifications: async () => {
        try {
            set({likeNotificationsLoading: true, likeNotificationsError: null})
            const res = await axiosApi.get('/notifications/getLikeNotifications')
            set({likeNotifications: res.data})
        } catch (error) {
            console.error('Error in getLikeNotifications store:', error)
            set({likeNotificationsError: 'Failed to load like notifications.'})
        } finally {
            set({likeNotificationsLoading: false})
        }
    },
    likeNotifications: [],
    likeNotificationsLoading: false,
    likeNotificationsError: null,
    getFollowNotifications: async () => {
        try {
            set({followNotificationsLoading: true, followNotificationsError: null})
            const res = await axiosApi.get('/notifications/getFollowNotifications')
            set({followNotifications: res.data})
        } catch (error) {
            console.error('Error in getFollowNotifications store:', error)
            set({followNotificationsError: 'Failed to load follow notifications.'})
        } finally {
            set({followNotificationsLoading: false})
        }
    },
    followNotifications: [],
    followNotificationsLoading: false,
    followNotificationsError: null,
    getCommentNotifications: async () => {
        try {
            set({commentNotificationsLoading: true, commentNotificationsError: null})
            const res = await axiosApi.get('/notifications/getCommentNotifications')
            set({commentNotifications: res.data})
        } catch (error) {
            console.error('Error in getCommentNotifications store:', error)
            set({commentNotificationsError: 'Failed to load comment notifications.'})
        } finally {
            set({commentNotificationsLoading: false})
        }
    },
    commentNotifications: [],
    commentNotificationsLoading: false,
    commentNotificationsError: null,
    getOrderNotifications: async () => {///////////////////////////////
        try {
            set({orderNotificationsLoading: true, orderNotificationsError: null})
            const res = await axiosApi.get('/notifications/getOrderNotification')
            set({orderNotifications: res.data})
        } catch (error) {
            console.error('Error in getOrderNotifications store:', error)
            set({orderNotificationsError: 'Failed to load order notifications.'})
        } finally {
            set({orderNotificationsLoading: false})
        }
    },
    orderNotifications: [],
    orderNotificationsLoading: false,
    orderNotificationsError: null,
    getConnectionNotification: async () => {
        try {
            set({connectionNotificationsLoading: true, connectionNotificationsError: null})
            const res = await axiosApi.get('/notifications/getConnectionNotifications')
            set({connectionNotifications: res.data})
        } catch (error) {
            console.error('Error in getConnectionNotification store:', error)
            set({connectionNotificationsError: 'Failed to load connection notifications.'})
        } finally {
            set({connectionNotificationsLoading: false})
        }
    },

    connectionNotifications: [],
    connectionNotificationsLoading: false,
    connectionNotificationsError: null,
    makeUnRead:async(data)=>{
        try {
            set({makingUnread:true,makingUnreadError:null})
            const res = await axiosApi.put(`/notifications/unread/${data}`)
        } catch (error) {
            console.error('Error in unread store:', error)
            set({makingUnreadError:error});
            set({connectionNotificationsError: 'Failed to load connection notifications.'})
        }finally{
            set({makingUnread:false});
        }
    },
    makingUnread:false,
    makingUnreadError:null,
    
    
}));
