import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
<div className="h-[calc(100vh-73px)] bg-red-100 flex">
      {/* User Management */}
      <div className="flex flex-col justify-center items-center w-1/2 h-full user p-10 shadow-lg transition-all duration-300 ease-in-out hover:w-[55%]">
        <h2 className="text-4xl font-bold mb-6 text-white">
          User Management
        </h2>
        <div className="flex flex-col gap-4 items-center w-full">
          <button 
          onClick = {()=>navigate("/users")} className="py-3 px-8 btn btn-one w-2/3 font-bold text-2xl">
            View
          </button>
          <button 
            onClick={() => navigate("/add-user")}
            className="py-3 px-8 btn btn-one w-2/3 font-bold text-2xl">
            Add
          </button>
        </div>
      </div>

      {/* Product Management */}
      <div className="flex flex-col justify-center items-center w-1/2 h-full product p-10 shadow-lg transition-all duration-300 ease-in-out hover:w-[55%]">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Product Management
        </h2>
        <div className="flex flex-col gap-4 items-center w-full">
          <button
            onClick={() => navigate("/products")} 
            className="py-3 px-8 btn btn-one w-2/3 font-bold text-2xl">
            View
          </button>
          <button 
          onClick={()=> navigate("/add-product")} className="py-3 px-8py-3 px-8 btn btn-one w-2/3 font-bold text-2xl">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
