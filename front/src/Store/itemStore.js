import {create} from 'zustand';
import {axiosApi} from '../library/axios.js'
import { createItem, deleteItem, getItem } from '../../../backend/src/controler/itemsControler';
export const useItemStore = create((set,get)=>({
    items:null,
    item:null,
    addItemsLoading:false,
    itemsLoading:false,
    itemLoading:false,
    itemsError:null,
    itemError:null,
    itemDeleting:false,
    createItemError:null,
    
    createItem:async(formData)=>{
        try {
            // console.log(data);
            console.log("hello");
            
            set({addItemsLoading:true,createItemError:null});

            const res = await axiosApi.post('/dashboard/createItem',formData,{
                // headers:{
                //     'Content-Type': 'multipart/form-data'
                // }
            });
            
        } catch (error) {
            console.log('error in createItem store:', error);
            set({ createItemError: 'Failed to create item.' });
            
        }finally{
            set({addItemsLoading:false});
        }
    },
    deleteItem:async(id)=>{
        try {
           set({itemDeleting:true,itemError:null});
            const res = await axiosApi.delete(`/dashboard/deleteItem/${id}`);
            console.log(res);
        } catch (error) {
            console.log('error in deleteItem store:', error);
            set({ itemError: 'Failed to delete item.' });
            
        }finally{
             set({itemDeleting:false});
        }
    },
    getItems:async(id)=>{
        try {
            set({itemsLoading:true,itemsError:null});
            const res = await axiosApi.get(`/dashboard/getAllItems`);
            set({item:res.data});
        } catch (error) {
            console.log('error in getItem store:', error);
            set({ itemError: 'Failed to get item.' });
            
        }finally{
            set({itemsLoading:false});
        }
    }

}))