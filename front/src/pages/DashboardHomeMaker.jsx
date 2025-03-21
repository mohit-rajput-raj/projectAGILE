import React, { useEffect, useState } from "react";
import "../coustomStyles/container.css";
import "../coustomStyles/dashboard.css";
import { IoAddOutline } from "react-icons/io5";
import {Ordercard,TODOOrdercard } from "../components/orderCard";
// import DemoCard from "../components/DemoCard";
import PlacedOrderCard from "../components/PlacedOrderCard";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
const orderStatus2=["All", "running", "shipped","paused","Todo", "delivered", "rejected"];
const statusPanel = [16,2,4,1,6,4,8];
import { useDashBoardStore } from "../Store/dashBoardStore";
const Dashboard = () => {
  // const {getDeployedOrdersForMaker,makerorders,makerordersLoading}  = useDashBoardStore();
  const navigate = useNavigate();
  const [showOrder, setShowOrder] = useState(true);
  const [idd,setIdd] =useState(0);
  const [selectedStatus,setSelectedStatus] = useState("running");
  // useEffect(()=>{
  //   getDeployedOrdersForMaker();
  // },[getDeployedOrdersForMaker])
  // if(makerorders){
  //   console.log(makerorders);
    
  // }
  
  return (
    <div className="dashCon">
      <div className="dashCon">
        <div className="item1">
          <main className="dMain">
            
            <div className="dMid  gap-4">
              <div className="dMidTop w-full border-1 bg-zinc-100 rounded h-10">HomeMaker </div>
              <div className="dMidBottom  rounded">
                <div className="dHeader p-5 flex gap-4   ">
                  <div className="center searchIcon w-12 h-10"><IoSearchSharp className="h-6 w-6" /></div>
                  <input type="text" placeholder="serach person" name="filter" className="rounded-3xl bg-zinc-300 border-none focus:outline-none inputFilter" />
                </div>
                <div className="flex justify-evenly">
                  {[orderStatus2.map((itm,i)=>(
                    
                    <div key={i} className="w-full">
                    <button className={`dNavBtn center ${selectedStatus===itm && 'text-blue-400'}`} onClick={()=>{setIdd(i);setSelectedStatus(itm)}}>{itm}</button>
                  </div>
                  ))]}
                </div>
                <div style={{maxHeight:"200vh"}} className="overflow-y-scroll w-full  flex flex-col gap-2 ">
                  {[...Array(statusPanel[idd])].map((item,i) => (
                    <PlacedOrderCard key={i} rating={orderStatus2[idd]==="delivered"?true:false} />
                  ))}
                </div>
              </div>
            </div>
            <div className="dRight  ">
              <div className="dRightTop min-h-screen overflow-y-scroll ">
                <div className="flex gap-2">
                  <button
                    className="dNavBtn"
                    onClick={() => setShowOrder(true)}
                  >
                    TODO orders
                  </button>
                  <button
                    className="dNavBtn"
                    onClick={() => setShowOrder(false)}
                  >
                    TODO challenges
                  </button>
                </div>
                {showOrder && (
                  <div className=" relative orderBlock mb-2">
                   
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl">undeployed Orders</h2>
                      <div className="w-full max-h-screen overflow-y-scroll">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                          <TODOOrdercard />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {!showOrder && (
                  <div className=" relative orderBlock mb-2">
                   
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl">undeployed challenges</h2>
                      <div className="w-full">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <TODOOrdercard />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="dRightBottom min-h-12 bg-zinc-100 w-full overflow-y-scroll"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
