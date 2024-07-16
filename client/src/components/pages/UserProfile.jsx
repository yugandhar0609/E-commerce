import React, { useContext, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../../Context/ShopContext";
import { UserContext } from "../UserContext";

const UserProfile = () => {
  const { user, fetchUserData } = useContext(ShopContext);
  const { userProfile, setUser } = useContext(UserContext);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !userProfile) {
      axios
        .get(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setUser(response.data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user, setUser]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token).catch((error) => {
        console.error("Error fetching user data:", error);
        // Handle error if necessary, like setting user to null
      });
    }
  }, [fetchUserData]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-4"
            src={`${API_URL}/pic/${user.picture}`}
            alt="User profile"
          />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">{user.userName}</h1>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <p className="text-gray-800">
            {/* <strong>Phone Number:</strong>  */}
            {user.phoneNumber}
          </p>
        </div>
        <div className="border-t border-gray-200 pt-4">
         
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
