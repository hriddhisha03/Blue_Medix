import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCategories(["electronics", "jewelery", "men's clothing", "women's clothing"]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Constraints
    if (/^\d/.test(formData.title)) {
      setError("Title should not start with a number.");
      return;
    }

    if (parseFloat(formData.price) < 0) {
      setError("Price cannot be negative.");
      return;
    }

    if (formData.description.length < 20) {
      setError("Description must be at least 20 characters long.");
      return;
    }

    const urlPattern = /^(http|https):\/\/.+\..+/;
    if (!urlPattern.test(formData.image)) {
      setError("Image must be a valid URL ending with an image format (png, jpg, jpeg, gif, webp, svg).");
      return;
    }

    setError(null); 

    try {
      await axios.post("http://localhost:5000/api/products", formData);
      alert("Product added successfully!");
      navigate("/products"); 
    } catch (error) {
      setError("Failed to add product.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 h-[calc(100vh-78px)] flex justify-center items-center">
      <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-lg p-6 w-96 text-white border border-white/30">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
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
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <textarea
            name="description"
            placeholder="Description (min. 20 characters)"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded h-24"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
