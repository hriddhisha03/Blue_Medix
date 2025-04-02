import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserCircle } from "lucide-react"; 

interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  role: string;
}

const ViewUser = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/users/${id}`); // Adjust backend URL
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p className="text-white text-center">Loading user details...</p>;
  if (error) return <p className="text-red-400 text-center">{error}</p>;

  return (
    <div className="h-[calc(100vh-78px)] flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md text-white border border-white/30">
        <UserCircle size={80} className="mx-auto text-white mb-4" />
        <h2 className="text-3xl font-bold text-white text-center p-3 rounded-lg">
          {user?.name}
        </h2>
        <p className="text-gray-200"><strong>Email:</strong> {user?.email}</p>
        <p className="text-gray-200"><strong>Gender:</strong> {user?.gender}</p>
        <p className="text-gray-200">
          <strong>Role:</strong> {user?.role === "isAdmin" ? "Admin" : user?.role === "isCustomer" ? "Customer" : "Seller"}
        </p>
      </div>
    </div>
  );
};

export default ViewUser;
