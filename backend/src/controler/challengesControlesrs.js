import  Challenge from "../models/challengsModel.js";


export const createChallenge = async (req, res) => {
    const userId = req.user._id;
    const { description, start_date, end_date,category,status, title} = req.body;
    try {
        if(!description || !start_date || !end_date || !category || !status || !title){
            return res.status(401).json({msg:'Fill all data'});
        }
        const newChallenge = new Challenge({userId,description, start_date, end_date,category,status, title});
        await newChallenge.save();
        return res.status(201).json(newChallenge);
        
        
    } catch (error) {
        console.log("error in createChallenge",{error});
        
        return res.status(500).json({msg: error.message});
    }
}

export const getAllChallenges = async (req, res) => {
    const userId = req.user._id;
    try {
        const challenges = await Challenge.find({userId});
        return res.status(201).json(challenges);
        
        
    } catch (error) {
        console.log("error in getAllChallenges",{error});
        
        return res.status(500).json({msg: error.message});
    }
}


export const deleteChallenge = async (req, res) => {
    const challengeId = req.params.id;
    try {
        const challenge = await Challenge.findByIdAndDelete(challengeId);
        if(!challenge){
            return res.status(404).json({msg:"Challenge not found"});
        }
        return res.status(201).json({msg:"Challenge deleted"});
        
        
    } catch (error) {
        console.log("error in deleteChallenge",{error});
        
        return res.status(500).json({msg: error.message});
    }
}