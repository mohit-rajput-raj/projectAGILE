import {create} from 'zustand'
import { axiosApi } from '../library/axios.js';

export const useDashBoardStore = create((set,get)=>({
    dashBoardData:null,
    dashBoardDataLoading:false,
    dashBoardDataError:null,
    getDashBoardDataLoading:false,
    getDashBoardDataError:null,

    orders:null,
    ordersLoading:false,
    ordersError:null,

    undorders:null,
    undordersLoading:false,
    undordersError:null,

    creatingOrder:false,
    creatingOrderError:null,
    NewcreatedOrder:null,

    connections:null,
    connectionsLoading:false,
    connectionsError:null,

    userDataLoading:false,
    getDashBoardData: async () => {
        try {
          set({ dashBoardDataLoading: true, dashBoardDataError: null });
          const res = await axiosApi.get(`/dashboard/getDashBoardData`);
          set({ dashBoardData: res.data });
        } catch (error) {
          console.log("Error in getDashBoardData store:", error);
          set({ dashBoardDataError: "Failed to load dashboard data." });
        } finally {
          set({ dashBoardDataLoading: false });
        }
    },
    getDeployedOrders:async()=>{
      try {
        // console.log("helll");
        
        set({ ordersLoading: true, ordersError: null });
        const res = await axiosApi.get(`/dashboard/getdeployed`);
        set({ orders: res.data });
      } catch (error) {
        console.log("Error in getDashBoardData store:", error);
        set({ ordersError: "Failed to load dashboard data." });
      } finally {
        set({ordersLoading: false });
      }
    },
    getConnections:async()=>{
      try {
        set({ connectionsLoading: true, connectionsError: null });
        const res = await axiosApi.get(`/dashboard/getconnections`);
        set({ connections: res.data });
      } catch (error) {
        console.log("Error in getConnections store:", error);
        set({ connectionsError: "Failed to load connections." });
      } finally {
        set({ connectionsLoading: false });
      }
    },
    getUndeployedOrders:async()=>{
      try {
        // console.log("helll");
        
        set({ undordersLoading: true, unddordersError: null });
        const res = await axiosApi.get(`/dashboard/getundeployed`);
        set({ undorders: res.data });
      } catch (error) {
        console.log("Error in getDashBoardData store:", error);
        set({ undordersError: "Failed to load dashboard data." });
      } finally {
        set({undordersLoading: false });
      }
    },
    createOrder:async(data)=>{
      try {
        console.log("helll");
        set({NewcreatedOrder:null});
        
        set({ creatingOrder: true, creatingOrderError: null });
        const res = await axiosApi.post(`/dashboard/createOrder`,data);
        set({NewcreatedOrder:res.data});
      } catch (error) {
        console.log("Error in createOrde getDashBoardData store:", error);
        set({ creatingOrderError: "Failed to load dashboard data." });
      } finally {
        set({creatingOrder: false });
      }
    }
    
    
}))