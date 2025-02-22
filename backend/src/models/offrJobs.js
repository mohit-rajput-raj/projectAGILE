import mongoose from "mongoose";
const offrJobsSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,

    },
    img:{
        type:String,
    },
    caption:{
        type:String,
        require:true,

    },
    discription:{
        type:String,
        require:true,
    },
    contact:[{
        type:String,
        require:true,
        unique:true,
        trim:true,
        
    }],
    mail:[{
        type:String,
        require:true,
        unique:true,
        trim:true,

    }],
    interestedPeople:[{
        type: mongoose.Schema.Types.ObjectId,
        default:[],
    }],
},{timestamps:true});

export const offrJobs = mongoose.model("offrJobs",offrJobsSchema);