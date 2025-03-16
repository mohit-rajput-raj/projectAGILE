import React from "react";
import gian from './gian.jpg'

const HistOrder =()=>{
  return (
    <div className="orderListCard flex h-20">
      <div className=" fit w-full h-full overflow-hidden center rounded-full">
        <img src={gian} alt="" />
      </div>
      <div className="center w-full h-full">
        <h2>username</h2>

      </div>
      <div className="center w-full h-full">date</div>
      <div>ordercode</div>
      <div className="center w-full h-full">
        status
      </div>
      <div className="center w-full h-full">action</div>
    </div>
  )
}
const History = () => {
  return (
    <div className="dashCon">
      <div className="dashCon">
        <div className="item1">
          <main className="histMain">
            <div className="histOrders flex flex-col gap-3 ">
              {[...Array(4).map((_,i)=>(
                  <HistOrder key ={i}/>
              ))]}
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
