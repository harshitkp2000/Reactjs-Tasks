import { useEffect, useState } from "react";
import ProductCard from "../Component/ProductCard";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response);
    setLoading(false);
  };

  const handleClick = (category, id) => {
    navigate(`/product/${category}/${id}`);
  };

  const categories = ["All", ...new Set(products?.map((p) => p.category))];

  const filteredProducts = products?.filter((p) => {
    const matchesTitle = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" ? true : p.category === activeCategory;
    return matchesTitle && matchesCategory;
  });

  const filteredCategories = [
    ...new Set(filteredProducts?.map((p) => p.category)),
  ];

  const ShimmerCard = () => (
    <div className="w-64 h-[320px] bg-gray-800 rounded-2xl p-4 animate-pulse border border-gray-700">
      <div className="w-full h-52 bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-700 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded mb-2 w-1/2"></div>
      <div className="h-6 bg-gray-700 rounded w-1/3"></div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-950 min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Products</h1>

      <div className=" items-start md:items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-700 bg-gray-800 text-gray-100 p-2 rounded-lg w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />

        <div className="flex flex-wrap py-8 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      ) : filteredProducts?.length > 0 ? (
        <div className="mb-10">
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="cursor-pointer"
                onClick={() => handleClick(p.category, p.id)}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-12 text-lg">
          No products found!
        </p>
      )}
    </div>
  );
};

export default Products;
