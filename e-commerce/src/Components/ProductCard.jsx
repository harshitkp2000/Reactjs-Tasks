const ProductCard = ({ key, product }) => {
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

      <p className="font-bold text-lg text-blue-400 mt-2">${product.price}</p>
    </div>
  );
};

export default ProductCard;
