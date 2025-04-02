import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    };

    

    fetchProducts();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gradient-to-r from-blue-500 to-purple-600">
  {products.map((product) => (
    <div key={product._id} className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain" />
      <h2 className="text-lg font-bold mt-2 text-center">{product.title}</h2>
      <p className="text-green-600 font-semibold">${product.price}</p>
      <Link to={`/products/${product._id}`} className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        View Details
      </Link>
    </div>
  ))}
</div>

  );
};

export default ProductList;
