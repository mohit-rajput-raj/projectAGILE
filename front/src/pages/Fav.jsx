import React, { useEffect } from "react";
import '../coustomStyles/fav.css'
import { useDashBoardStore } from "../Store/dashBoardStore";
import PlacedOrderCard from '../components/PlacedOrderCard';
const Favourites = () => {

  const {getSavedData,getSavedLoading,getSavedError,getSaved} = useDashBoardStore();
  useEffect(() => {
    getSaved();
  }, [getSaved]);
  if(getSavedLoading)return <div>loading</div>
  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1">
          <main className="favMain h-screen">
            <aside className="favLeft">
              <div  className="w-full h-20 center"><h3 className="text-gray-600 text-3xl"> FAVOURITES</h3></div>
              <div className="rounded-2xl w-full overflow-y-scroll h-full flex flex-col items-center">
                {getSavedData && getSavedData.map((item) => (
                  <div key={item._id} className="favItem w-full">
                    <PlacedOrderCard order={item}/>
                  </div>
                ))}
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
