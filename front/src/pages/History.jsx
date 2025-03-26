import React, { useEffect } from "react";
import gian from './gian.jpg'
import '../coustomStyles/history.css'
import { useDashBoardStore } from "../Store/dashBoardStore";
const HistOrder =({items})=>{
  return (
    <div className="orderListCard rounded-2xl w-full  h-30 backdrop-blur bg-white/40">
      
      <div className="flex w-full h-1/2">
      <div className="center w-full ">
        <h2>captiom :{items?.caption}</h2>

      </div>
      <div className="center w-full ">orderKey :{items?.orderKey}</div>
      <div className="center w-full ">orderBuildDate :{items?.orderBuildDate}</div>
      <div className="center w-full ">
        orederStatus: {items?.orderStatus}
      </div>
      <div className="center w-full ">{items?.orderStatus}</div>
      </div>
      <div className="flex w-full h-1/2">
      <div className="center w-full ">
        <h2>orderId :{items?.orderId}</h2>

      </div>
      <div className="center w-full ">orderBudget :{items?.budget}</div>
      <div className="center w-full ">orderDeadLine :{items?.deadLine}</div>
      <div className="center w-full ">orderPaid :{items?.orderPaid}</div>
      
      </div>
    </div>

  )
}
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
