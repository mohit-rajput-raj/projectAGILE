import React from "react";
import '../coustomStyles/fav.css'
const Favourites = () => {
  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1">
          <main className="favMain h-screen">
            <aside className="favLeft">
              <div  className="w-full h-20 center"><h3 className="text-gray-600 text-3xl"> FAVOURITES</h3></div>
              <div className="rounded-2xl w-full overflow-y-scroll h-full flex flex-col items-center">

              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
