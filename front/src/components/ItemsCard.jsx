import React, { useState } from "react";
import "../coustomStyles/itemsCard.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import Rating from '@mui/material/Rating';
import cake from '../components/cake.png';

const ItemsCard = ({ CardData, deleteItem }) => {
  const [price, setPrice] = useState(CardData.price);
  const [piece, setPiece] = useState(CardData.quantity);

  return (
    <div className="ItemCard">
      <div className="ItemCardPic fit">
        <img src={CardData.image || cake} alt="User" className="itemImg" />
      </div>
      <div className="flex flex-col justify-end pdng">
        <div className="flex justify-between">
          <span>ID: {CardData.id}</span>
          <span className="bg-red-200 center rounded" onClick={() => deleteItem(CardData.idp)}>
            <AiOutlineDelete className="h-5 w-5" />
          </span>
        </div>
        <h5 className="username">{CardData.name}</h5>
        <Rating name="size-small" defaultValue={2} size="small" />
        <h3 className="profession">{CardData.category}</h3>
        <div className="w-full flex flex-col gap-px">
          <div className="w-full flex h-8 justify-between">
            <label htmlFor="price">Price/Unit</label>
            <input className="w-1/2 h-6" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="w-full h-8 flex justify-between">
            <label htmlFor="quantity">Quantity</label>
            <input className="w-1/2 h-6" type="number" placeholder="Quantity" value={piece} onChange={(e) => setPiece(e.target.value)} />
          </div>
          <label htmlFor="quantity">{`Total Price: ${piece * price}`}</label>
        </div>
      </div>
    </div>
  );
};
const ItemsCardDummy = ({item}) => {
  if(!item)return;

  return (
    <div className="ItemCard">
      <div className="ItemCardPic fit">
        <img src={item.image || cake} alt="User" className="itemImg" />
      </div>
      <div className="flex flex-col justify-end pdng">
        <div className="flex justify-between">
          <span>ID: {item.id}</span>
          <span className="bg-red-200 center rounded" >
            <AiOutlineDelete className="h-5 w-5" />
          </span>
        </div>
        <h5 className="username">{item.name}</h5>
        <Rating name="size-small" defaultValue={2} size="small" />
        <h3 className="profession">{item.category}</h3>
        <div className="w-full flex flex-col ">
          <div className="w-full flex h-8 justify-between">
            <label htmlFor="price">Price/Unit</label>
            <input className="w-1/2 h-6" type="number" placeholder="Price" value={2}  />
          </div>
          {/* <div className="w-full h-8 flex justify-between">
            <label htmlFor="quantity">Quantity</label>
            <input className="w-1/2 h-6" type="number" placeholder="Quantity" value={2} />
          </div>
          <label htmlFor="quantity">{`Total Price: 4`}</label> */}
        </div>
      </div>
    </div>
  );
};

const BlankItemsCard = () => {
  return (
    <div className="ItemCard BlankItemCard center flex-col">
      <IoAddCircleOutline className="h-20 w-20 bg-grey-200 opacity-10" />
      <h3>Add</h3>
    </div>
  );
};

export { ItemsCard,ItemsCardDummy, BlankItemsCard };
