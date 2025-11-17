import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  };

  const categories = [...new Set(products?.map((p) => p.category))];

  const handleExploreCategory = (category) => {
    navigate(`/product`);
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-gradient-to-r from-blue-900 to-gray-900">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
            Discover the Best Deals Online
          </h1>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Explore a wide range of products with unbeatable prices and fast
            delivery. Your favorite brands, all in one place.
          </p>
          <button
            onClick={() => navigate("/product")}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold shadow-lg transition-all duration-300"
          >
            🛒 Shop Now
          </button>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
            alt="Shopping illustration"
            className="w-80 md:w-96 drop-shadow-lg animate-float"
          />
        </div>
      </section>

      <section className="py-16 px-8 md:px-16">
        <h2 className="text-3xl font-semibold mb-8 text-blue-400">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => handleExploreCategory(category)}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
            >
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-lg font-medium capitalize text-gray-200">
                {category}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-8 md:px-16 bg-gray-900">
        <h2 className="text-3xl font-semibold mb-8 text-blue-400">
          Featured Products
        </h2>

        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {products?.slice(0, 8)?.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.category}/${p.id}`)}
              className="bg-gray-800 border border-gray-700 rounded-2xl shadow-md p-4 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="w-full h-52 overflow-hidden rounded-lg mb-4">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold mb-2 truncate">{p.title}</h3>
              <p className="text-gray-400 mb-2 capitalize">{p.category}</p>
              <p className="text-blue-400 font-semibold">${p.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 text-center bg-gradient-to-r from-gray-900 to-blue-900">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">
          Ready to Start Shopping?
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Join thousands of happy customers today!
        </p>
        <button
          onClick={() => navigate("/product")}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-lg transition-all duration-300"
        >
          Explore Products
        </button>
      </section>
    </div>
  );
};

export default Home;
