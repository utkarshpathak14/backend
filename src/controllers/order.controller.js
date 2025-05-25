// controllers/order.controller.js
import Order from "../models/order.model.js";

export const OrderHandel = async (req, res) => {
  try {
    const { product, quantity, totalAmount, userEmail, vendorName } = req.body;

    const newOrder = new Order({
      product,
      quantity,
      totalAmount,
      userEmail,
      vendorName,
    });

    await newOrder.save(); //  Save to database

    res.status(201).json({ message: "Order successful", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Ordering failed", error });
  }
};

export const rejectOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const reject = await Order.findByIdAndDelete({ orderId });
    if (!reject) {
      return res.status(401).json({ message: "order not found" });
    }
    res.status(201).json({ message: "order rejected" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting order", error });
  }
};
