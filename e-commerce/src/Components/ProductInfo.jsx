import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // lightweight icon

const ProductInfo = () => {
  const [productInfo, setProductInfo] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductInfo();
  }, []);

  const fetchProductInfo = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProductInfo(response.data);
    } catch (err) {
      console.error("Error fetching product info:", err);
    } finally {
      setLoading(false);
    }
  };

  const ShimmerCard = () => {
    return (
      <div className="w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 items-center animate-pulse">
        <div className="w-72 h-80 bg-gray-800 rounded-xl" />

        <div className="flex-1 space-y-4 w-full">
          <div className="h-6 bg-gray-800 rounded w-3/4" />
          <div className="h-4 bg-gray-800 rounded w-1/3" />
          <div className="h-5 bg-gray-800 rounded w-1/4" />
          <div className="h-20 bg-gray-800 rounded w-full" />
          <div className="flex gap-4">
            <div className="h-5 bg-gray-800 rounded w-16" />
            <div className="h-5 bg-gray-800 rounded w-24" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-4xl mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-400 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-all duration-200"
        >
          <ArrowLeft size={18} />
        </button>
      </div>
      {loading && <ShimmerCard />}
      {!loading && productInfo && (
        <div className="w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 items-center">
          <img
            src={productInfo.image}
            alt={productInfo.title}
            className="w-72 h-80 object-contain bg-gray-800 p-4 rounded-xl shadow-md"
          />

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-100 mb-3">
              {productInfo.title}
            </h3>
            <p className="text-gray-400 text-sm mb-3 capitalize">
              {productInfo.category}
            </p>
            <p className="text-blue-400 font-bold text-2xl mb-3">
              ${productInfo.price}
            </p>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              {productInfo.description}
            </p>
            <div className="flex items-center gap-3">
              <p className="text-yellow-400 font-medium text-lg">
                ⭐ {productInfo.rating.rate}
              </p>
              <p className="text-gray-400 text-sm">
                ({productInfo.rating.count}+ reviews)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
