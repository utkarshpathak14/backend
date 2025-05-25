import Product from "../models/product.model.js";

export const product = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products); // Send products as a response
    } catch (error) {
        res.status(500).json({ message: "Error inserting products", error });
    }
};

export const productId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Product.findById(id);  // Correct usage
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

export const addProduct = async(req,res)=>{



  try {

      const {title,description,image,price,rating,vendorName}= req.body;

    const product = new Product({
        title,
        description,
        price,
        image,
        rating,
        vendorName
    })

    await product.save();

    if(!product){
        res.status(401).json({Messsage:"complete all details"})
    }

    res.status(201).json(product);
    

  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
    }

    
 }

export const deleteProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
}
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, image, price, rating } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, description, image, price, rating },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};




