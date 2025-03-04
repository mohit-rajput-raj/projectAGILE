import React, { useEffect, useState } from "react";
import black from "./black.tree.jpg";
import "../coustomStyles/itemsCard.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import gian from "./gian.jpg";
import cake from './cake.png';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
const ItemsCard = ({ fun }) => {
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [piece , setPiece] = useState(0);
  
  return (
    <div className="ItemCard">
      <div className="ItemCardPic fit">
        <img src={cake} alt="User" className="itemImg" />
      </div>
      <div className="flex flex-col justify-end ">
        <div className="flex justify-between">
          <span>ID : 384598</span>
          <span className="bg-red-200 center rounded" onClick={() => fun((w) => w - 1)}>
            <AiOutlineDelete className="h-5 w-5" />
          </span>
        </div>
        <h5 className="username">Cake</h5>
        <Rating name="size-small" defaultValue={2} size="small" />
        <h3 className="profession">veg</h3>
        <div className=" w-full flex flex-col gap-px">
          <div className="w-full flex h-8 justify-between">
            <label htmlFor="price">price/unit</label>
            <input className="w-1/2 h-6" type="number" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="w-full h-8 flex justify-between">
            <label htmlFor="quantity">quantity</label>
            <input className="w-1/2 h-6" type="number" placeholder="quantity" value={piece} onChange={(e) => setPiece(e.target.value)} />
          </div>
          <label htmlFor="quantity">{`total price ${piece * price}`}</label>
        </div>
      </div>
    </div>
  );
};
const BlankItemsCard = () => {
  return (
    <div className=" ItemCard BlankItemCard center flex-col">
      <IoAddCircleOutline className="h-20 w-20 bg-grey-200 opacity-10" />
      <h3>add</h3>
    </div>
  );
};

export { ItemsCard, BlankItemsCard };
