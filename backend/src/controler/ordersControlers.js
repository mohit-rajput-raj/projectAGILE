import Orders from "../models/ordersModel.js";

export const createOrder = async (req, res) => {
    const { orderID, orderKey, orderStatus, orderItems, description, doubts, orderTotal, orderPaymentCurrency, orderHoldedBy, orderBidBy } = req.body;
    try {
        const newOrder = new Orders({
            orderID, orderKey, orderStatus, orderItems, description, doubts, orderTotal, orderPaymentCurrency, orderHoldedBy, orderBidBy
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log("error in createOrder", { error });
        res.status(500).json({ msg: error.message });
    }
}