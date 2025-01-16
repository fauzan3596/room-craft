const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-between text-center p-4">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-t-lg mb-4" />
      <div>
        <div className={`px-3 py-1 text-sm font-medium text-white rounded-full mb-2 ${product.categoryColor}`}>
          {product.category}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.subtitle}</p>
      </div>
    </div>
  );
};

export default ProductCard;
