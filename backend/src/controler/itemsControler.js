import { Item } from "../models/itemsModel.js";
import { User } from "../models/userModel.js";
import cloudinary from "../library/cloud.js";

export const createItem = async (req, res) => {
  try {
    // const updateData = {};
    const { type, price, quantity, parentId, name, description, id } = req.body;
    // console.log(req.body);
    
    const image = req.files?.image;
    if (!parentId || !name || !description || !type || !price || !quantity || !id ) {
      console.log("missing data");
      return res.status(400).json({ msg: "Fill all data" });
    }
    let uploadResponse;
    console.log(image);
    if (image) {
      console.log("Uploading image to Cloudinary...");
      try {
           uploadResponse = await cloudinary.uploader.upload(image.tempFilePath, {
              folder: 'items_images',
              // transformation: [
              //     { width: 500, height: 500, crop: 'fill' },
              //     { quality: 'auto:good' }
              // ]
          });
          // imageUrl = uploadResponse.secure_url;
      } catch (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ msg: "Failed to upload profile picture. Please try again." });
      }
    }

    const newItem = new Item({
      
      parentId, 
      name,
      type,
      price,
      quantity,
      description,
      id,
      image: uploadResponse?.secure_url,
    });
    const user = await User.findById(req.user._id);
    if (!user) {
      console.log("user not found");
      return res.status(404).json({ msg: "User not found" });
    }
    user.items.push(newItem._id);
    await user.save();
    await newItem.save();
    console.log("created Item Successfully");
    
    return res.status(201).json(newItem);
  } catch (error) {
    console.log("error in addItem", { error });
    return res.status(500).json({ msg: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const items = await Item.find({ _id: { $in: user.items } });
    return res.status(200).json(items);
  } catch (error) {
    console.log("error in getItems", { error });
    return res.status(500).json({ msg: error.message });
  }
};

export const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    return res.status(200).json(item);
  } catch (error) {
    console.log("error in getItem", { error });
    return res.status(500).json({ msg: error.message });
  }
};

export const setRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, reviews } = req.body;
    const item = await Item.findById(id);
    item.rating = rating;
    item.reviews = reviews;
    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    console.log("error in setRating", { error });
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Item deleted" });
  } catch (error) {
    console.log("error in deleteItem", { error });
    return res.status(500).json({ msg: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, name, type, price, description, quantity } = req.body;
    const item = await Item.findById(id);
    item.image = image;
    item.name = name;
    item.type = type;
    item.price = price;
    item.description = description;
    item.quantity = quantity;
    await item.save();
    return res.status(200).json(item);
  } catch (error) {
    console.log("error in editItem", { error });
    return res.status(500).json({ msg: error.message });
  }
};
