import React, { useState, useEffect } from "react";
import { useDashBoardStore } from "../Store/dashBoardStore";
import { ProfileComponent } from "../components/profileCard";
import '../coustomStyles/deploye.css'
import { useNavigate } from "react-router-dom";
const DeployOrder = ({ deployOrder, setDeployOrder, deployOrderId }) => {
  const { getConnections, connections,deployOrder2 } = useDashBoardStore();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const handleGetConnections = async () => {
    try {
      await getConnections();
      // console.log("Fetched connections:", connections);
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  const handleDeployOrder = async () => {
    try {
      await deployOrder2({  personId: selected,orderId:deployOrderId});
      // console.log("Order deployed successfully");
      setDeployOrder(!deployOrder);
    } catch (error) {
      console.error("Error deploying order:", error);
    }
  };

  return (
    <div className="itemOverMain">
      <div className="depContainer flex items-center w-full h-full gap-10">
        <div className="w-40">
          <button className="close" onClick={() => setDeployOrder(!deployOrder)}>
            Close
          </button>
        </div>

        <aside className="flex flex-col gap-3 justify-center w-1/5 h-full">
          <button className="btn" onClick={handleGetConnections}>
            Select from Connection
          </button>
          <button className="btn" disabled={!selected} onClick={handleDeployOrder}>
            Send
          </button>
        </aside>

        <aside className="flex  flex-col gap-3 justify-center w-4/5 h-full">
          <div className="conf flex flex-col items-center gap-1 h-full w-full">
            {connections?.length === 0 ? (
              <div className="center h-full flex flex-col justify-center">
                <h1 className="text-black">No connections</h1>
              </div>
            ) : (
              connections?.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelected(item._id)}
                  className={`flex  center w-80  p-2 text-gray-900 hover:bg-blue-100 hover:scale-120 cursor-pointer ${
                    selected === item._id ? "bg-blue-300 rounded-3xl:" : ""
                  }`}
                >
                  <div className="center w-50 bg-blue-100 rounded-3xl">
                  <ProfileComponent user={item} />
                  </div>
                  <hr />
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DeployOrder;
