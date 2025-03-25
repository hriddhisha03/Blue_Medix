import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!product) return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-64 h-64 object-contain mx-auto" />
      <p className="text-gray-600 mt-4">{product.description}</p>
      <p className="text-xl font-semibold text-green-600 mt-4">${product.price}</p>
      <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
    </div>
  );
};

export default ProductDetails;
