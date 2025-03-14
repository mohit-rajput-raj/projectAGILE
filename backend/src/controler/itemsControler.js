import {Item} from "../models/itemsModel.js";

export const addItem = async (req, res) => {
    
    try {
        const {image, title, description} = req.body;
        if(!image || !title || !description){
            return res.status(401).json({msg:'Fill all data'});
        }
        const newItem = new Item({image, title, description});
        await newItem.save();

        
        return res.status(201).json(newItem);
    } catch (error) {
        console.log("error in addItem", { error });
        return res.status(500).json({ msg: error.message });
    }
};
export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json(items);
    } catch (error) {
        console.log("error in getItems", { error });
        return res.status(500).json({ msg: error.message });
    }
};
export const getItem = async (req, res) => {
    try {
        const {id} = req.params;
        const item = await Item.findById(id);
        return res.status(200).json(item);
    } catch (error) {
        console.log("error in getItem", { error });
        return res.status(500).json({ msg: error.message });
    }
};
export const setRating = async (req, res) => {
    try {
        const {id} = req.params;
        const {rating,reviews} = req.body;
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
        const {id} = req.params;
        const item = await Item.findByIdAndDelete(id);
        return res.status(200).json(item);
    } catch (error) {
        console.log("error in deleteItem", { error });
        return res.status(500).json({ msg: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const {id} = req.params;
        const {image, title, description} = req.body;
        const item = await Item.findById(id);
        item.image = image;
        item.title = title;
        item.description = description;
        await item.save();
        return res.status(200).json(item);
    } catch (error) {
        console.log("error in editItem", { error });
        return res.status(500).json({ msg: error.message });
    }
};
