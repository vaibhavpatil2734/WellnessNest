import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaUserCircle,
  FaWeightHanging,
  FaRulerCombined,
  FaTransgender,
  FaBirthdayCake,
  FaRegEnvelope,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "./profileLayout.css";

export default function ProfileLayout() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    height: "",
    weight: "",
    gender: "not selected",
    age: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("Please log in to view your profile");
      setLoading(false);
    } else {
      if (user) {
        setProfileData({
          username: user.username || "",
          email: user.email || "",
          height: user.height || "",
          weight: user.weight || "",
          gender: user.gender || "",
          age: user.age || "",
        });
      }
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please log in first");
      return;
    }

    const { username, email, height, weight, gender, age } = profileData;

    if (!username || !email || !height || !weight || !gender || !age) {
      toast.error("All fields are required");
      return;
    }

    if (isNaN(height) || isNaN(weight) || isNaN(age)) {
      toast.error("Height, weight, and age must be numbers");
      return;
    }

    try {
      const genderValue = gender.toLowerCase();

      const profileDataToUpdate = {
        email,
        name: username,
        height,
        weight,
        gender: genderValue,
        age,
      };

      console.log(profileData)
      const response = await axios.put(
        "https://wellnessnest.onrender.com/api/users/update-profile",
        // "http://localhost:5000/api/users/update-profile",
        profileDataToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      setEditing(false);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="error-message">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image-container">
          <FaUserCircle className="profile-icon" />
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="edit-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="edit-input"
                disabled // Email should not be editable
              />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                id="height"
                type="text"
                name="height"
                value={profileData.height}
                onChange={handleInputChange}
                placeholder="Height"
                className="edit-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                type="text"
                name="weight"
                value={profileData.weight}
                onChange={handleInputChange}
                placeholder="Weight"
                className="edit-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                className="edit-input"
              >
                <option value="not selected">Not Selected</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                name="age"
                value={profileData.age}
                onChange={handleInputChange}
                placeholder="Age"
                className="edit-input"
              />
            </div>
            <button type="submit" className="submit-button">
              Save
            </button>
          </form>
        ) : (
          <div className="profile-info">
            <div className="profile-info-item">
              <FaUserCircle className="info-icon" />
              <span>{profileData.username}</span>
            </div>
            <div className="profile-info-item">
              <FaRegEnvelope className="info-icon" />
              <span>{profileData.email}</span>
            </div>
            <div className="profile-info-item">
              <FaRulerCombined className="info-icon" />
              <span>{profileData.height} cm</span>
            </div>
            <div className="profile-info-item">
              <FaWeightHanging className="info-icon" />
              <span>{profileData.weight} kg</span>
            </div>
            <div className="profile-info-item">
              <FaTransgender className="info-icon" />
              <span>{profileData.gender}</span>
            </div>
            <div className="profile-info-item">
              <FaBirthdayCake className="info-icon" />
              <span>{profileData.age} years</span>
            </div>
            <button onClick={() => setEditing(true)} className="edit-button">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
