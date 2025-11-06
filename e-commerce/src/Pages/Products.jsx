import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../Component/ProductCard";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const categories = [...new Set(products.map((p) => p.category))];
  const filteredProducts = products.filter((p) => {
    const matchesTitle = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? p.category === categoryFilter
      : true;
    return matchesTitle && matchesCategory;
  });
  const filteredCategories = [
    ...new Set(filteredProducts.map((p) => p.category)),
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

      <div className="flex flex-wrap items-center gap-4 mb-10 justify-between">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-700 bg-gray-800 text-gray-100 p-2 rounded-lg w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />

        <Select
          value={
            categoryFilter
              ? {
                  value: categoryFilter,
                  label:
                    categoryFilter.charAt(0).toUpperCase() +
                    categoryFilter.slice(1),
                }
              : null
          }
          onChange={(selectedOption) =>
            setCategoryFilter(selectedOption ? selectedOption.value : "")
          }
          options={[
            { value: "", label: "All Categories" },
            ...categories.map((c) => ({
              value: c,
              label: c.charAt(0).toUpperCase() + c.slice(1),
            })),
          ]}
          placeholder="Select Category..."
          isClearable
          className="w-64"
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: "#1f2937",
              borderColor: state.isFocused ? "#3b82f6" : "#374151",
              color: "#f3f4f6",
              borderRadius: "0.5rem",
              boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
              padding: "2px",
              minHeight: "42px",
              "&:hover": {
                borderColor: "#3b82f6",
              },
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "0.5rem",
              marginTop: "4px",
            }),
            option: (base, { isFocused, isSelected }) => ({
              ...base,
              backgroundColor: isSelected
                ? "#3b82f6"
                : isFocused
                ? "#374151"
                : "#1f2937",
              color: isSelected ? "#fff" : "#f3f4f6",
              cursor: "pointer",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#f3f4f6",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#9ca3af",
            }),
          }}
        />
      </div>

      {loading ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        filteredCategories.map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 capitalize border-b border-gray-700 pb-2 text-gray-300">
              {category}
            </h2>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts
                .filter((p) => p.category === category)
                .map((p) => (
                  <div
                    key={p.id}
                    className="cursor-pointer"
                    onClick={() => handleClick(p.id)}
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-12 text-lg">
          No products found!
        </p>
      )}
    </div>
  );
};

export default Products;
