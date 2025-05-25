import Order from "../models/order.model.js";
import Product from "../models/product.model.js";



export const AdminOrders = async(req,res) =>{

    const {userName} = req.body;
    console.log(userName);
  

  try {
  
      const orders = await Order.find({vendorName:userName})

    if(!orders){
     return res.stauts(401).json({message:"orders not found"})

    }

    res.status(201).json(orders);
    

    
  } catch (error) {
    res.status(500).json({ message: "Ordering failed", error });
  }
    
  }


  export const SuperAdmin = async(req,res)=>{
    try {
      
      const allOrders = await Order.find({});

      if(!allOrders){
        res.status(404).json({"message":"wrong in fetching order"})
      }
      
      res.status(200).json(allOrders)

    } catch (error) {

        res.status(500).json({ message: "Ordering failed", error });


      
    }
  }

  