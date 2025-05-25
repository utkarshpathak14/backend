import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId, // product ka ID
        ref: "Product", // ye batata hai kis model se jodna hai
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
      },
      totalAmount: Number,
      userEmail: String,
      vendorName:String,
      paymentStatus: {
        type: String,
        enum: ["pending", "paid"], // sirf ye 3 value allow
        default: "paid"
      },






},{timestamps:true})

const Order = mongoose.model("Order",orderSchema);
export default Order;