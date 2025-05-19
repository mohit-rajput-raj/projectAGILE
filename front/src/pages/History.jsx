import React, { useEffect, useState } from "react";
import gian from './gian.jpg'
import '../coustomStyles/history.css'
import { useDashBoardStore } from "../Store/dashBoardStore";
// import React, { useState } from 'react';

const HistOrder = ({ items }) => {
  const [openfull, setOpenfull] = useState(false);

  return (
    <div className="orderListCard rounded-2xl w-full p-4 bg-white/40 backdrop-blur shadow-md">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex  gap-10 w-full space-y-2">
          <h2 className="text-lg font-semibold">Caption: {items?.caption}</h2>
          <div className="text-gray-700">Order Status: {items?.orderStatus}</div>
        </div>
        {openfull && (
          <div className="flex flex-col w-full space-y-2">
            <div className="text-gray-700">Order ID: {items?.orderId}</div>
            <div className="text-gray-700">Order Budget: {items?.budget}</div>
            <div className="text-gray-700">Order Deadline: {items?.deadLine}</div>
            <div className="text-gray-700">Order Paid: {items?.orderPaid}</div>
          </div>
        )}
        <button
          onClick={() => setOpenfull(!openfull)}
          className="btn3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {openfull ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
    </div>
  );
};



const History = () => {
  const {getHistory, getHistoryData, getHistoryLoading, getHistoryError,deleteHistory,deleteHistoryLoading,deleteHistoryError} = useDashBoardStore();
  useEffect(()=>{
    getHistory();
  },[])
  console.log(getHistoryData);
  
  return (
    <div className="dashCon">
      <div className="dashCon">
        <div className="item1">
          <main className="histMain">
            
            <div className="histOrders  flex flex-col gap-3 ">
              <h1 className="text-gray-500 w-full center">orders activity</h1>
              <div className="w-full h-full overflow-y-scroll flex flex-col gap-3">
              {getHistoryLoading?(<div className="w-full h-full center"><h2>Loading...</h2></div>):(getHistoryData?.length!==0? getHistoryData?.map((item,i)=>(
                  <HistOrder key ={i} items={item}/>
              )): <h2 className="text-gray-500 w-full center">No orders found</h2>)}
              </div>
            </div>
            <div className="histPosts">

            </div>
            <div className="histComments">

            </div>
            <div className="histLikes">

            </div>
            <div className="histVisits">

            </div>
            <div>

            </div>

            
          </main>
        </div>
      </div>
    </div>
  );
};

export default History;
