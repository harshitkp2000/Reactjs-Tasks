import axios from "axios";
import { toast } from "react-toastify";

export const getProducts = async() => {
   try{
     const response = await axios.get('http://localhost:1234/product');
     return response?.data;
   }
   catch(err){
    toast.error("Failed to Fetch Products");
     console.log(err);
   }
}

export const getProductsById = async(id) => {
   try{
     const response = await axios.get(`http://localhost:1234/product/${id}`);
     return response?.data;
   }
   catch(err){
    toast.error("Failed to Fetch Product");
     console.log(err);
   }
}
export const getProductsByCategory = async(id,category) => {
   try{
     const response = await axios.get(`http://localhost:1234/product/category/${id}?category=${category}`);
     return response?.data;
   }
   catch(err){
    toast.error("Failed to Fetch Suggestions");
     console.log(err);
   }
}

export const getPromoCodes = async (promo) => {
  try {
    const response = await axios.get(`http://localhost:1234/promocode/${promo}`);
    return response.data; 
  } catch (err) {
    if (err.response && err.response.data) {
      toast.error(err.response.data.message); 
    } else {
      toast.error("Internal server error : 500");
    }
    return null;
  }
};

export const placeOrder = async(data) =>{
  try{
    const response = await axios.post('http://localhost:1234/orders/place',data);
     
  return response?.data;
  }
  catch(err){
    toast.error("Failed to place order");
    console.log(err);
  }
}

export const AllOrders = async() =>{
  try{
    const response = await axios.get('http://localhost:1234/orders');
     
  return response?.data;
  }
  catch(err){
    toast.error("Failed to Fetch Orders");
    console.log(err);
  }
}

export const getOrderById = async(id) => {
  try{
    const response = await axios.get(`http://localhost:1234/orders/${id}`);
    return response?.data;
  }
  catch(err){
   toast.error("Failed to Fetch Order");
    console.log(err);
  }
}


export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.put(`http://localhost:1234/orders/${orderId}/cancel`);
    toast.success("Order cancelled successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data || "Failed to cancel order");
    console.error("Cancel order error:", error);
  }
};