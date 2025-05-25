import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,  

    },
    description:{
        type:String,
        required:true,  
        trim: true,

    },
    category:{
        type:String,
        required:true,  
        trim: true,

    },
    location:{
        type:String,
        required:true,  
        trim: true,

    },
    status:{
        type:String,
        required:true,
        enum:["pending","approved","rejected"],  
        default:"pending",
      

    },
    price:{
        type:Number,
        required:true,
        trim: true,  

    },
    image:{
        type:String,
        required:true,
        default:""  

    },
    rating:{
        type:Number,
        default: 0,
    min: 0,
    max: 5,

    },
    vendorName:{
        type:String,
        required:true, 
       

    },
},{ timestamps: true })

const Product = mongoose.model("Product",productSchema);
export default Product;