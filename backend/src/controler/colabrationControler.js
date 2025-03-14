import { Colabration } from "../models/colabrationModel";
import { User } from "../models/userModel";
export const getAllColabration = async (req, res) => {
    try {
        const colabration = await Colabration.find();
        res.status(200).json(colabration);
    } catch (error) {
        console.log("error in getAllColabration", { error });
        res.status(500).json({ msg: error.message });
    }
};

export const getColabration = async (req, res) => {
    try {
        const { id } = req.params;
        const colabration = await Colabration.findById(id);
        res.status(200).json(colabration);
    } catch (error) {
        console.log("error in getColabration", { error });
        res.status(500).json({ msg: error.message });
    }
};
export const updateColabration = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const colabration = await Colabration.findByIdAndUpdate(id, data, {
            new: true,
        });
        await colabration.save();
        res.status(200).json(colabration);
    } catch (error) {
        console.log("error in updateColabration", { error });
        res.status(500).json({ msg: error.message });
    }
};
export const deleteColabration = async (req, res) => {
    try {
        const { id } = req.params;
        const colabration = await Colabration.findByIdAndDelete(id);
        res.status(200).json(colabration);
    } catch (error) {
        console.log("error in deleteColabration", { error });
        res.status(500).json({ msg: error.message });
    }
};
