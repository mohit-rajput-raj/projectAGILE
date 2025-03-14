import Orders from "../models/ordersModel.js";

export const createOrder = async (req, res) => {
    const { orderId,orderKey,caption,decription,address,budget,deadLine } = req.body;
    try {
        if(!orderId || !orderKey || !caption || !decription || !address || !budget || !deadLine){
            return res.status(401).json({msg:'Fill all data'});
        }
        const newOrder = new Orders({orderId,orderKey,caption,decription,address,budget,deadLine});
        
        
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log("error in createOrder", { error });
        res.status(500).json({ msg: error.message });
    }
}
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find();
        res.status(200).json(orders);
    } catch (error) {
        console.log("error in getAllOrders", { error });
        res.status(500).json({ msg: error.message });
    }
}

export const getOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const order = await Orders.findById(id);
        res.status(200).json(order);
    } catch (error) {
        console.log("error in getOrder", { error });
        res.status(500).json({ msg: error.message });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const order = await Orders.findByIdAndDelete(id);
        res.status(200).json(order);
    } catch (error) {
        console.log("error in deleteOrder", { error });
        res.status(500).json({ msg: error.message });
    }
}

export const updateOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const order = await Orders.findByIdAndUpdate(id, data, { new: true });

        await order.save();
        res.status(200).json(order);
    } catch (error) {
        console.log("error in updateOrder", { error });
        res.status(500).json({ msg: error.message });
    }
}
