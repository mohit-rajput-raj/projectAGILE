import React, { useState } from "react";
import "../coustomStyles/addItemsOverLay.css";
import cake from "../components/cake.png";
import { BannerImageUploader } from "../components/ImgUploader";
import { useItemStore } from "../Store/itemStore";
import { nanoid } from "nanoid";

const AddItemsOverLay = ({
  orderId,
  addItemsCards,
  setOverLayAddItems,
  setItemData,
  itemData,
  setImg,
  img,
}) => {
  const { createItem, addItemsLoading, createItemError } = useItemStore();
  const [error, setError] = useState("");
  const [img1, setImg1] = useState(null);

  const generateOrderKey = () => nanoid(8);

  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setItemData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setImg1(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handelSaveItem = async () => {
    // if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append('name', itemData.name);
      formData.append('type', itemData.type);
      // formData.append('price', itemData.price);
      formData.append('quantity', itemData.quantity);
      formData.append('description', itemData.description);
      formData.append('id', generateOrderKey());
      if (img1) {
        formData.append("image", img1);
      }
      formData.append('parentId', orderId);

      await createItem(formData);
      if (createItemError) {
        alert(createItemError);
      } else {
        handelClear();
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while saving the item.");
    }
  };

  const handelAddItem = async () => {
    console.log(itemData);
    
    // if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("name", itemData.name);
      formData.append("type", itemData.type);
      // formData.append("price", itemData.price);
      formData.append("quantity", itemData.quantity);
      formData.append("description", itemData.description);
      formData.append("parentId", orderId);
      formData.append("id", generateOrderKey());

      if (img1) {
        formData.append("image", img1);
      }

      await createItem(formData);
      if (createItemError) {
        alert(createItemError);
        return;
      }
      console.log(itemData);
      
      addItemsCards(); 
        handelClear(); 
        setOverLayAddItems(false); 
    } catch (error) {
      console.error(error);
      setError("An error occurred while saving the item.");
    }
  };

  // const validateForm = () => {
  //   if (!itemData.name || !itemData.type || !itemData.price || !itemData.quantity) {
  //     setError("All fields are required.");
  //     return false;
  //   }
  //   setError("");
  //   return true;
  // };

  const handelClear = () => {
    setItemData({
      parentId: orderId,
      id: Date.now().toString(),
      name: "",
      type: "",
      quantity: "",
      description: "",
    });
    setImg(cake);
    setOverLayAddItems(false);
    setError("");
  };

  return (
    <div className="itemOverMain">
      <button
        className="close"
        onClick={() => setOverLayAddItems(false)}
        aria-label="Close"
      >
        X
      </button>
      {error && <div className="error-message">{error}</div>}
      <div className="uploadItemBox flex items-center justify-center gap-6">
        <div className="w-full max-h-screen">
          <div className="flex gap-12 w-full justify-evenly items-center">
            <button className="btn3" onClick={handelAddItem}>
              Add
            </button>
            {/* <button className="btn3" aria-label="Select from bucket">
              Select from bucket
            </button> */}
            {/* <button className="btn3" aria-label="Upload image">
              Upload image
            </button> */}
            {/* <button className="btn3" onClick={handelSaveItem}>
              {addItemsLoading ? 'Saving...' : 'Save'}
            </button> */}
            <button onClick={handelClear} className="btn3">
              Clear
            </button>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="itemName">Item Name:</label>
              <input
                className="CreateitemsInputes"
                type="text"
                placeholder="Enter item name"
                value={itemData.name}
                onChange={handelOnChange}
                name="name"
                id="itemName"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="category">Category:</label>
              <input
                className="CreateitemsInputes"
                type="text"
                placeholder="Enter category"
                value={itemData.type}
                onChange={handelOnChange}
                name="type"
                id="category"
              />
            </div>
            {/* <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="price">Price:</label>
              <input
                className="CreateitemsInputes"
                type="number"
                placeholder="Enter item price"
                value={itemData.price}
                onChange={handelOnChange}
                name="price"
                id="price"
              />
            </div> */}
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="quantity">Item Quantity:</label>
              <input
                className="CreateitemsInputes"
                type="number"
                placeholder="Enter item quantity"
                value={itemData.quantity}
                onChange={handelOnChange}
                name="quantity"
                id="quantity"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="description">Description:</label>
              <textarea
                className="CreateitemsInputes w-full h-full"
                placeholder="Enter item description"
                value={itemData.description}
                onChange={handelOnChange}
                name="description"
                id="description"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="center w-full max-h-screen">
          <div className="mainItemCard rounded-3xl border-2 border-gray-400">
            <div className="w-64 h-60 fit overflow-hidden center">
              <BannerImageUploader handleImageChange={handleImageChange} bannerImg={img} />
            </div>
            <div className="p-4">
              <h2 className="text-black">
                Item Name:{" "}
                <span className="text-2xl text-white">{itemData.name}</span>
              </h2>
              <div className="mt-2">
                <span className="text-black">
                  Category:{" "}
                  <span className="text-2xl text-white">{itemData.type}</span>
                </span>
              </div>
              <div className="mt-2">
                <span className="text-black">
                  Price:{" "}
                  <span className="text-2xl text-white">{itemData.price}</span>
                </span>
              </div>
              <div className="mt-2">
                <span className="text-black">
                  Quantity:{" "}
                  <span className="text-2xl text-white">{itemData.quantity}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemsOverLay;
