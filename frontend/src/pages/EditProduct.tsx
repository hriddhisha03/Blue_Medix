import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Save, ArrowLeft } from "lucide-react"; // Lucide Icons

interface Product {
  _id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Product>({
    _id: "",
    title: "",
    image: "",
    description: "",
    price: 0,
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate & Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.price < 0) {
      setError("Price cannot be negative.");
      return;
    }
    if (!formData.image.match(/\.(jpeg|jpg|png|gif|webp|svg)$/)) {
      setError("Invalid image URL. Must end with jpg, png, gif, etc.");
      return;
    }
    if (formData.description.length < 20) {
      setError("Description must be at least 20 characters long.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData);
      alert("Product updated successfully!");
      navigate("/products"); // Redirect to product list
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="w-1/3 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <button 
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description (Min 20 characters)"
          className="border p-2 rounded h-24"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
          required
        />

        <button type="submit" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          <Save size={18} /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
