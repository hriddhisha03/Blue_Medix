import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Pencil, Trash } from "lucide-react"; 

interface Product {
  _id: string; 
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

 
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("Product deleted successfully!");
      navigate("/products"); 
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!product) return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className="h-[calc(100vh-78px)] bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-3xl bg-white mt-2 mx-auto p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <img src={product.image} alt={product.title} className="w-64 h-64 object-contain mx-auto" />
        <p className="text-gray-600 mt-4">{product.description}</p>
        <p className="text-xl font-semibold text-green-600 mt-4">${product.price}</p>
        <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>

        {/* Action Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          {/* Edit Button */}
          <button 
            onClick={() => navigate(`/edit-product/${product._id}`)}
            className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            <Pencil size={18} /> Edit
          </button>

          {/* Delete Button */}
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <Trash size={18} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
