import React, { useEffect, useState } from "react";
import "../coustomStyles/container.css";
import "../coustomStyles/dashboard.css";
import { IoAddOutline } from "react-icons/io5";
import { Ordercard, TODOOrdercard ,WaitingOrdercard} from "../components/orderCard";
import PlacedOrderCard from "../components/PlacedOrderCard";
import { useNavigate } from "react-router-dom";
import { useDashBoardStore } from "../Store/dashBoardStore.js";
import { IoSearchSharp } from "react-icons/io5";
import DeployeOrder from "./DeployeOrder";
// import { div } from "three/tsl";
const orderStatusOptions = [
  "All",
  "running",//
  "shipped",//
  "paused",//
  "pending",//
  "delivered",//
  "rejected",//
];

const Dashboard = () => {
  const [deployOrder, setDeployOrder] = useState(false);
  const [deployOrderId, setDeployOrderId] = useState(null);
  // const [barstatus , setBarStatus] = useState("running");
  const {
    orders,
    getDeployedOrders,
    ordersLoading,
    getUndeployedOrders,
    undorders,

    waitingOrders,
    getWaitingOrders,
  } = useDashBoardStore();
  const [selectedStatus, setSelectedStatus] = useState("running");
  const [showOrder, setShowOrder] = useState(true);

  useEffect(() => {
    getDeployedOrders();
  }, [getDeployedOrders]);
  useEffect(()=>{
    getUndeployedOrders();
  },[ getUndeployedOrders,deployOrder]);
  useEffect(()=>{
    getWaitingOrders();
  },[ getWaitingOrders,deployOrder]);
  const navigate = useNavigate();

  
  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders?.filter((order) => order.orderStatus === selectedStatus);

  return (
    <div className="dashCon">
      <div className="dashCon">
        <div className="item1">
          <main className="dMain">
          {deployOrder && <DeployeOrder deployOrderId={deployOrderId} setDeployOrder={setDeployOrder} deployOrder={deployOrder} setDeployOrderId={setDeployOrderId} />}

            <div className="dMid gap-4">
              <div className="dMidTop w-full border-1 bg-zinc-100 rounded h-10">
                shopowner
              </div>
              <div className="dMidBottom rounded">
                <div className="dHeader p-5 flex gap-4">
                  <div className="center searchIcon w-12 h-10">
                    <IoSearchSharp className="h-6 w-6" />
                  </div>
                  <input
                    type="text"
                    placeholder="search person"
                    name="filter"
                    className="rounded-3xl bg-zinc-300 border-none focus:outline-none inputFilter"
                  />
                </div>
                <div className="flex justify-evenly">
                  {orderStatusOptions.map((status, i) => (
                    <div key={i} className="w-full">
                      <button
                        className={`dNavBtn center ${selectedStatus===status && 'text-blue-400'}`}
                        onClick={() => setSelectedStatus(status)}
                      >
                        {status}
                      </button>
                    </div>
                  ))}
                </div>
                <div
                  style={{ maxHeight: "200vh" }}
                  className="overflow-y-scroll w-full flex flex-col gap-2"
                >
                  {filteredOrders?.map((order, i) => (
                    <PlacedOrderCard
                      key={i}
                      order={order}
                      
                      rating={selectedStatus === "delivered"}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="dRight">
              <div className="dRightTop min-h-screen overflow-y-scroll">
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
                  <div>
                    <div className="relative orderBlock mb-2  h-[50vh] overflow-y-scroll">
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
                        {undorders?.map((item) => (
                            <Ordercard key={item._id} order={item} deployOrder={deployOrder} setDeployOrder={setDeployOrder} setDeployOrderId={setDeployOrderId}/>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative orderBlock mb-2  h-full overflow-y-scroll bg-blue-100 rounded-e-2xl backdrop:blur ">
                    
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl">{waitingOrders?.length===0 ? "No waiting orders" : "Waiting Orders"}</h2>
                      <div className="w-full max-h-screen overflow-y-scroll">
                        {waitingOrders?.map((item) => (
                            <WaitingOrdercard key={item._id} order={item} deployOrder={deployOrder} setDeployOrder={setDeployOrder} setDeployOrderId={setDeployOrderId}/>
                          ))}
                      </div>
                    </div>
                  </div>
                  </div>
                  
                  
                )}
                {!showOrder && (
                  <div className="relative orderBlock mb-2">
                    <div>
                      <div className="flex">
                        <button
                          className="dNavBtn flex center"
                          onClick={() => navigate("/create")}
                        >
                          <IoAddOutline />
                          <div>create challenges</div>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl">undeployed challenges</h2>
                      <div className="w-full">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <Ordercard key={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
