import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
    orderCode:{
        type:String,
        required:true,
    },

    itemCode:{
        type:String,
        required:true,
    },
    itemName:{
        type:String,
        required:true,
        trim:true,
    },
    itemImage:{
        type:String,
        required:true,
    },
    itemPrice:{
        type:Number,
        required:true,
    },
    itemQty:{
        type:Number,
        required:true,
    },
    notToUseIngredients:[{
        type:String,
        
    }],
    discription:{
        type:String,
        required:true,
        trim:true,
    },
    completed:{
        type:Boolean,
        default:false,
    },

    
})
export const OrderItems = mongoose.model('OrderItems',orderItemsSchema);