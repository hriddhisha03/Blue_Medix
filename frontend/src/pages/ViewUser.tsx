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

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 h-[calc(100vh-73px)] flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <UserCircle size={80} className="mx-auto" />
        <h2 className="text-2xl font-bold mb-4 text-center">{user?.name}</h2>
        <p className="text-gray-600"><strong>Email:</strong> {user?.email}</p>
        <p className="text-gray-600"><strong>Gender:</strong> {user?.gender}</p>
        <p className="text-gray-600"><strong>Role:</strong> {user?.role=="isAdmin"?"Admin":user?.role=="isCustomer"?"Customer":"Seller"}</p>
      </div>
    </div>
  );
};

export default ViewUser;
