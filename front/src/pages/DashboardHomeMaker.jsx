import React, { useState } from "react";
import "../coustomStyles/container.css";
import "../coustomStyles/dashboard.css";
import { IoAddOutline } from "react-icons/io5";
import Ordercard from "../components/orderCard";
// import DemoCard from "../components/DemoCard";
import PlacedOrderCard from "../components/PlacedOrderCard";
import { useNavigate } from "react-router-dom";
export const menu1 = [
  
  { name: "Items", rout: "/dashboard/items" },
  { name: "Colabration", rout: "/dashboard/colabration" },
  { name: "Contacts", rout: "/dashboard/contacts" },
  { name: "FeedBack", rout: "/dashboard/issues" },
  { name: "Report", rout: "/dashboard/report" },
  { name: "HIstory", rout: "/dashboard/history" },
  { name: "Cancled", rout: "/dashboard/cancled" },
  { name: "Deleted", rout: "/dashboard/deleted" },
];
import { IoSearchSharp } from "react-icons/io5";
const orderStatus=["All", "running", "shipped","paused","pending", "delivered", "rejected"];
const statusPanel = [16,2,4,1,6,4,8];
const Dashboard = () => {
  const navigate = useNavigate();
  const [showOrder, setShowOrder] = useState(true);
  const [idd,setIdd] =useState(0);

  
  return (
    <div className="dashCon">
      <div className="dashCon">
        <div className="item1">
          <main className="dMain">
            {/* <div className="dLeft">
              <div className="dLeftTop center ">someItems</div>
              <div className="dLeftBottom">
                {menu1.map((itm, i) => (
                  <div key={i}>
                    <div className="menuItems1 center " onClick={() => navigate(itm.rout)}>{itm.name}</div>
                    <hr />
                  </div>
                ))}
              </div>
            </div> */}
            <div className="dMid  gap-4">
              <div className="dMidTop w-full border-1 bg-zinc-100 rounded h-10">HomeMaker </div>
              <div className="dMidBottom  rounded">
                <div className="dHeader p-5 flex gap-4   ">
                  <div className="center searchIcon w-12 h-10"><IoSearchSharp className="h-6 w-6" /></div>
                  <input type="text" placeholder="serach person" name="filter" className="rounded-3xl bg-zinc-300 border-none focus:outline-none inputFilter" />
                </div>
                <div className="flex justify-evenly">
                  {[orderStatus.map((itm,i)=>(
                    <div key={i} className="w-full">
                    <button className="dNavBtn center" onClick={()=>setIdd(i)}>{itm}</button>
                  </div>
                  ))]}
                </div>
                <div style={{maxHeight:"200vh"}} className="overflow-y-scroll w-full  flex flex-col gap-2 ">
                  {[...Array(statusPanel[idd])].map((item) => (
                    <PlacedOrderCard rating={orderStatus[idd]==="delivered"?true:false} />
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
                    orders
                  </button>
                  <button
                    className="dNavBtn"
                    onClick={() => setShowOrder(false)}
                  >
                    challenges
                  </button>
                </div>
                {showOrder && (
                  <div className=" relative orderBlock mb-2">
                    <div>
                      <div className="flex">
                        <button
                          className="dNavBtn flex center"
                          onClick={() => navigate("/create")}
                        >
                          <IoAddOutline />
                          <div>create order</div>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl">undeployed Orders</h2>
                      <div className="w-full max-h-screen overflow-y-scroll">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                          <Ordercard />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {!showOrder && (
                  <div className=" relative orderBlock mb-2">
                    <div>
                      <div className="flex">
                        <button
                          className="dNavBtn flex center"
                          onClick={() => navigate("/create")}
                        >
                          <IoAddOutline />
                          <div>create challengse</div>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl">undeployed challenges</h2>
                      <div className="w-full">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <Ordercard />
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
