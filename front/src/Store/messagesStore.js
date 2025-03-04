import {create} from 'zustand';
import {axiosApi} from '../library/axios.js';
import { deleteMessage, updateMessage } from '../../../backend/src/controler/messagesControlers.js';
export const useMessagesStore = create((set,get)=>({
    sideBarUsers:[],
    messages:[],

    messagesLoading:false,//
    sendMessageLoading:false,//
    sideBarUsersLoding:false,//
    onlineUsersLoding:false,
    updateMessageLoading:false,//
    deleteMessageLoading:false,

    getMessages:async(id)=>{
        try {
            set({messagesLoading:true});
            const res = await axiosApi.get(`/messages/getMessages/${id}`);
            set({messages:res.data.messages});
        } catch (error) {
            console.log('error in getMessages store:',error);
        }finally{
            set({messagesLoading:false});
        }
    },
    
    sendMessage:async(data,receiverId)=>{
        try {
            set({sendMessageLoading:true});
            const res = await axiosApi.post(`/messages/createMessage/${receiverId}`,data);
            console.log(res);
        } catch (error) {
            console.log('error in sendMessage store:',error);
        }finally{
            set({sendMessageLoading:false});
        }
    },
    deleteMessage:async(id)=>{
        try {
            set({deleteMessageLoading:true});
            const res = await axiosApi.delete(`/messages/deleteMessage/${id}`);
            console.log(res);
        } catch (error) {
            console.log('error in deleteMessage store:',error);
        }finally{
            set({deleteMessageLoading:false});
        }
    },
    updateMessage:async(data,id)=>{
        try {
            set({updateMessageLoading:true});
            const res = await axiosApi.put(`/messages/updateMessage/${id}`,data);
            console.log(res);
        } catch (error) {
            console.log('error in updateMessage store:',error);
        }finally{
            set({updateMessageLoading:false});
        }
    },
    getSideBarUsers:async()=>{
        try {
            set({sideBarUsersLoding:true});
            const res = await axiosApi.get(`/messages/getSideBarUsers`);
            set({sideBarUsers:res.data.users});
        } catch (error) {
            console.log('error in getSideBarUsers store:',error);
        }finally{
            set({sideBarUsersLoding:false});
        }
    }

}))