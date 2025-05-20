import React, { useRef, useState } from "react";
import "../coustomStyles/menu.css";
import { ItemsCardDummy } from "../components/ItemsCard";
import { useParams } from "react-router-dom";
const itemsTypes = [
  ,
  { item: "All" },
  { item: "cakes" },
  { item: "cookie" },
  { item: "wine" },
  { item: "pastry" },
  { item: "All" },
  { item: "cakes" },
  { item: "cookie" },
  { item: "wine" },
  { item: "pastry" },
  { item: "All" },
  { item: "cakes" },
  { item: "cookie" },
  { item: "wine" },
  { item: "pastry" },
  { item: "All" },
  { item: "cakes" },
  { item: "cookie" },
  { item: "wine" },
  { item: "pastry" },
  { item: "All" },
  { item: "cakes" },
  { item: "cookie" },
  { item: "wine" },
  { item: "pastry" },
  { item: "All" },
  { item: "cakes" },
  { item: "cookie" },
  { item: "wine" },
  { item: "pastry" },
];
const Menu2 = () => {
    const username = useParams().username
    
  const [expended, setExpended] = useState(false);
  const bitonItems = useRef();
  if (expended) {
    bitonItems.current = itemsTypes;
  } else {
    bitonItems.current = itemsTypes.slice(0, 5);
  }
  return (
    <div className="dashCon">
      <div className="dashCon">
        <div className="item1">
          <main style={{ height: "100vh" }} className=" w-full center overflow-x-scroll ">
            <aside className="menLeft h-full flex flex-col gap-1">
              <div className="w-full h-10 center">
                <div className="text-2xl">{username}</div>
                <h2 className="text-2xl">MENU</h2>
                
              </div>
              <div className="w-30 bg-zinc-600">
                <button
                  className="extendBtn center "
                  onClick={() => setExpended(!expended)}
                >
                  expand
                </button>
              </div>
              <div className="flex flex-wrap">
                {[
                  bitonItems.current.map((itm, i) => (
                    <div key={i} className="w-30 hover:text-blue-600">
                      <button className="dNavBtn center h-full">{itm.item}</button>
                    </div>
                  )),
                ]}
              </div>
              <hr />
              <div className="flex flex-wrap gap-2 ">
                {[...Array(Math.round(Math.random() * 10 + 1))].map(
                  (_, index) => (
                    <ItemsCardDummy key={index} />
                  )
                )}
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Menu2;
