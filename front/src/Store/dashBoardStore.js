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
    deleteFromCreation:async(id)=>{
      try {
        set({ deleteFromCreationLoading: true, deleteFromCreationError: null });
        const res = await axiosApi.put(`/dashboard/deleteFromCreation/${id}`);
        
      } catch (error) {
        console.log("Error in deleteFromCreation store:", error);
        set({ deleteFromCreationError: "Failed to delete from creation." });
      } finally {
        set({ deleteFromCreationLoading: false });
      }
    },
    deleteFromCreationLoading:false,
    deleteFromCreationError:null,
    makeAccept: async(data)=>{
      try {
        set({ makeAcceptLoading: true, makeAcceptError: null });
        const res = await axiosApi.post(`/dashboard/makeAccept`,data);
        set({ makeAccepted: res.data });
      } catch (error) {
        console.log("Error in makeAccept store:", error);
        set({ makeAcceptError: "Failed to make accept." });
      } finally {
        set({ makeAcceptLoading: false });
      }
    },
    makeAcceptLoading:false,
    makeAcceptError:null,
    makeAccepted:null,
    makeReject: async(data)=>{
      try {
        set({ makeRejectLoading: true, makeRejectError: null });
        const res = await axiosApi.put(`/dashboard/makeReject`,data);
        set({ makeRejected: res.data });
      } catch (error) {
        console.log("Error in makeReject store:", error);
        set({ makeRejectError: "Failed to make reject." });
      } finally {
        set({ makeRejectLoading: false });
      }
    },
    makeRejectLoading:false,
    makeRejectError:null,
    makeRejected:null,
    deleteAsk:async(id)=>{
      try {
        set({ deleteAskLoading: true, deleteAskError: null });
        const res = await axiosApi.put(`/dashboard/deleteAsk/${id}`);
        set({ deleteAsked: res.data });
      } catch (error) {
        console.log("Error in deleteAsk store:", error);
        set({ deleteAskError: "Failed to delete ask." });
      } finally {
        set({ deleteAskLoading: false });
      }
    },
    deleteAskLoading:false,
    deleteAskError:null,
    deleteAsked:null,
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
    getWaitingOrders:async()=>{
      try {
        set({ waitingOrdersLoading: true, waitingOrdersError: null });
        const res = await axiosApi.get(`/dashboard/getwaiting`);
        set({ waitingOrders: res.data });
      } catch (error) {
        console.log("Error in getWaitingOrders store:", error);
        set({ waitingOrdersError: "Failed to load waiting orders." });
      } finally {
        set({ waitingOrdersLoading: false });
      }
    },
    waitingOrders:null,
    waitingOrdersLoading:false,
    waitingOrdersError:null,
    getDeployedOrders:async()=>{
      try {
        console.log("helll");
        
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
    makerorders:null,
    makerordersLoading: false,
    
    getDeployedOrdersForMaker:async()=>{
      try {
        console.log("helll");
        
        set({ makerordersLoading: true, ordersError: null });
        const res = await axiosApi.get(`/dashboard/getDeployedOrdersForMaker`);
        set({ makerorders: res.data });
      } catch (error) {
        console.log("Error in getDashBoardData store:", error);
        set({ ordersError: "Failed to load dashboard data." });
      } finally {
        set({makerordersLoading: false });
      }
    },
    getConnections:async()=>{
      try {
        set({ connections: null });
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
    ,
    deployOrder2Loading:false,
    deployOrder2Error:null,
    deployOrder2data:null,
    deployOrder2:async(data)=>{
      try {
        set({deployOrder2Loading:true,deployOrder2Error:null});
        const res = await axiosApi.post(`/dashboard/deployOrder2`,data);
        set({deployOrder2data:res.data});
      } catch (error) {
        console.log("Error in deployOrder2 store:", error);
        set({deployOrder2Error:"Failed to deploy order."});
      } finally {
        set({deployOrder2Loading:false});
      }
    },
    WaitingOrdersforMaker:null,
    getWaitingOrdersforMakerLoading:false,
    getWaitingOrdersforMakerError:null,
    getWaitingOrdersforMaker: async () => {
      try {
        set({ getWaitingOrdersforMakerLoading: true, getWaitingOrdersforMakerError: null });
        const res = await axiosApi.get(`/dashboard/getWaitingOrdersforMaker`);
        set({ WaitingOrdersforMaker: res.data });
      } catch (error) {
        console.log("Error in getWaitingOrdersforMaker store:", error);
        set({ getWaitingOrdersforMakerError: "Failed to load waiting orders." });
      } finally {
        set({ getWaitingOrdersforMakerLoading: false });
      }
    },
    DeployedOrdersForMaker:null,
    getDeployedOrdersForMakerLoading:false,
    getDeployedOrdersForMakerError:null,
    getDeployedOrdersForMaker: async () => {
      try {
        set({ getDeployedOrdersForMakerLoading: true, getDeployedOrdersForMakerError: null,DeployedOrdersForMaker:null });
        const res = await axiosApi.get(`/dashboard/getDeployedOrdersForMaker`);
        set({ DeployedOrdersForMaker: res.data });
      } catch (error) {
        console.log("Error in getDeployedOrdersForMaker store:", error);
        set({ getDeployedOrdersForMakerError: "Failed to load deployed orders." });
      } finally {
        set({ getDeployedOrdersForMakerLoading: false });
      }
    },
    AddToDoLoading:false,
    AddToDoError:null,
    AddToDoData:null,
    AddToDo: async (id) => {
      try {
        set({ AddToDoLoading: true, AddToDoError: null });
        const res = await axiosApi.put(`/dashboard/AddToDo/${id}`);
        set({ AddToDoData: res.data });
      } catch (error) {
        console.log("Error in AddToDo store:", error);
        set({ AddToDoError: "Failed to add to-do." });
      } finally {
        set({ AddToDoLoading: false });
      }
    },
    getOrderLoading:false,
    getOrderError:null,
    order:null,
    getOrder: async (id) => {
      try {
        set({ getOrderLoading: true, getOrderError: null, order: null });
        const res = await axiosApi.get(`/dashboard/getOrder/${id}`);
        set({ order: res.data });
      } catch (error) {
        console.log("Error in getOrder store:", error);
        set({ getOrderError: "Failed to load order." });
      } finally {
        set({ getOrderLoading: false });
      }
    },

    
    
    
    
}))