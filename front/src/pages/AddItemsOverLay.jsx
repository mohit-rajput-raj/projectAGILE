import React from 'react';
import '../coustomStyles/addItemsOverLay.css';
import cake from '../components/cake.png';

const AddItemsOverLay = ({ addItemsCards, setOverLayAddItems, setItemData, itemData, setImg, img }) => {
  const handelImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setItemData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handelClear = () => {
    addItemsCards();
    setItemData({
      name: '',
      category: '',
      price: '',
      quantity: '',
      description: '',
    });
    setImg(cake);
    setOverLayAddItems(false);
  };

  return (
    <div className='itemOverMain'>
      <button className='close' onClick={() => setOverLayAddItems(false)} aria-label="Close">
        X
      </button>
      <div className='uploadItemBox flex items-center justify-center gap-6'>
        <div className='w-full max-h-screen'>
          <div className='flex gap-12 w-full justify-evenly items-center'>
            <button className='btn3' onClick={handelClear}>Add</button>
            <button className='btn3' aria-label="Select from bucket">
              Select from bucket
            </button>
            <button className='btn3' aria-label="Upload image">
              Upload image
            </button>
            <button className='btn3'>save</button>
            <button onClick={handelClear} className='btn3'>
              Clear
            </button>
          </div>
          <div className='flex flex-col gap-3 justify-center items-center'>
            <div className='flex flex-col gap-1 w-1/2'>
              <label htmlFor="itemName">Item Name:</label>
              <input
                className='CreateitemsInputes'
                type="text"
                placeholder='Enter item name'
                value={itemData.name}
                onChange={handelOnChange}
                name='name'
                id='itemName'
              />
            </div>
            <div className='flex flex-col gap-1 w-1/2'>
              <label htmlFor="category">Category:</label>
              <input
                className='CreateitemsInputes'
                type="text"
                placeholder='Enter category'
                value={itemData.category}
                onChange={handelOnChange}
                name='category'
                id='category'
              />
            </div>
            <div className='flex flex-col gap-1 w-1/2'>
              <label htmlFor="image">Image:</label>
              <input
                className='CreateitemsInputes'
                type="file"
                placeholder='Add image'
                onChange={handelImage}
                name='image'
                id='image'
              />
            </div>
            <div className='flex flex-col gap-1 w-1/2'>
              <label htmlFor="price">Item Price:</label>
              <input
                className='CreateitemsInputes'
                type="number"
                placeholder='Enter item price'
                value={itemData.price}
                onChange={handelOnChange}
                name='price'
                id='price'
              />
            </div>
            <div className='flex flex-col gap-1 w-1/2'>
              <label htmlFor="quantity">Item Quantity:</label>
              <input
                className='CreateitemsInputes'
                type="number"
                placeholder='Enter item quantity'
                value={itemData.quantity}
                onChange={handelOnChange}
                name='quantity'
                id='quantity'
              />
            </div>
            <div className='flex flex-col gap-1 w-1/2'>
              <label htmlFor="description">Description:</label>
              <textarea
                className='CreateitemsInputes w-full h-full'
                placeholder='Enter item description'
                value={itemData.description}
                onChange={handelOnChange}
                name='description'
                id='description'
              ></textarea>
            </div>
          </div>
        </div>
        <div className='center w-full max-h-screen'>
          <div className='mainItemCard rounded-3xl border-2 border-gray-400'>
            <div className='h-1/2'>
              <img className='w-full h-full rounded-3xl object-cover' src={img} alt="Item" />
            </div>
            <div className='p-4'>
              <h2 className='text-black'>Item Name: <span className='text-2xl text-white'>{itemData.name}</span></h2>
              <div className='mt-2'>
                <span className='text-black'>Category: <span className='text-2xl text-white'>{itemData.category}</span></span>
              </div>
              <div className='mt-2'>
                <span className='text-black'>Price: <span className='text-2xl text-white'>{itemData.price}</span></span>
              </div>
              <div className='mt-2'>
                <span className='text-black'>Quantity: <span className='text-2xl text-white'>{itemData.quantity}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemsOverLay;
