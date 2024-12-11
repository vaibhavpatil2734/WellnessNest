import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

const UpdateProfile = ({ user, login }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    height: user?.height || "",
    weight: user?.weight || "",
    gender: user?.gender || "",
    age: user?.age || "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user?.profileImage) {
      setPreviewImage(user.profileImage);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, profileImage: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== "") {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await fetch(
        "https://wellnessnest.onrender.com/api/users/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwttoken")}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();
      if (response.ok) {
        login(data.token);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="update-profile-container">
      <form className="update-profile-form" onSubmit={handleSubmit}>
        <h2>Update Profile</h2>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        <label htmlFor="profileImage">Profile Image:</label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange}
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Profile Preview"
            className="profile-preview"
          />
        )}

        <label htmlFor="height">Height (cm):</label>
        <input
          type="number"
          id="height"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          min="0"
        />

        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          min="0"
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          min="0"
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;