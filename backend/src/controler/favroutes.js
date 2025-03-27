import {User} from "../models/userModel.js";
import {Orders} from "../models/ordersModel.js";
import {Item} from "../models/itemsModel.js";
import { select } from "three/tsl";
// import {}
export const getSaved = async (req, res) => {
    try {
        const userId = req.user._id;
        // console.log(userId,"userId");
        
        const favs = await User.findById(userId)
            .select("saved")
            .populate({
                path: "saved",
                select: "orderId orderItems orderBuilder description caption",
                populate: {
                    path: "orderItems",
                    select: "name quantity",
                },
                populate:{
                    path:"orderBuilder",
                    select:"username",
                },
                

            });

        if (!favs) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json(favs.saved);
    } catch (error) {
        console.error("Error in getSaved:", error);
        return res.status(500).json({ msg: "Server error" });
    }
};





export const toggleFavroute = async (req, res) => {
    try {
        const userId = req.user._id;
        const { routeId } = req.body;
        console.log(routeId,"routeId");
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isSaved = user.saved.includes(routeId);

        if (isSaved) {
            user.saved.pull(routeId);
            await user.save();
            return res.status(200).json({ msg: "Favroute deleted successfully" });
        } else {
            user.saved.push(routeId);
            await user.save();
            return res.status(200).json({ msg: "Favroute saved successfully" });
        }
    } catch (error) {
        console.log("error in toggleFavroute", { error });
        res.status(500).json({ msg: error.message });
    }
};
