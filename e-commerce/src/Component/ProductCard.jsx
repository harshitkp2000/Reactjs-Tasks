import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Slices/CartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ key, product }) => {
  const dispatch = useDispatch();
  const addingToCart = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };
  return (
    <div className="border border-gray-700 bg-gray-800 rounded-2xl shadow-md p-4 w-64 h-96 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex-1 flex flex-col">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-3"
        />
        <h3 className="font-semibold text-sm text-gray-200 line-clamp-2 mb-2 flex-grow">
          {product.title}
        </h3>
      </div>

      <div className="mt-3">
        <p className="font-bold text-lg text-blue-400 mb-3">${product.price}</p>
        <button
          className="w-full flex justify-center items-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-blue-500/30"
          onClick={addingToCart}
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
