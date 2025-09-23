// ProfilePage.jsx
import React from "react";
import UserProfile from "../components/UserProfile";
import { useAuth } from "../context/AuthContext"; // use custom hook

const ProfilePage = () => {
  const { user } = useAuth(); // safer

  if (!user) return <div>Loading...</div>; // or redirect to login

  return (
    <div className="p-4">
      <UserProfile user={user} />
    </div>
  );
};

export default ProfilePage;
