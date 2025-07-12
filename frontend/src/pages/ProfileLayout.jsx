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
          gender: user.gender || "not selected",
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
      const profileDataToUpdate = {
        email,
        name: username,
        height,
        weight,
        gender: gender.toLowerCase(),
        age,
      };

      const response = await axios.put(
        "https://wellnessnest.onrender.com/api/users/update-profile",
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

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "2rem", fontSize: "18px" }}>
        Loading...
      </div>
    );

  if (!user)
    return (
      <div style={{ textAlign: "center", padding: "2rem", fontSize: "18px" }}>
        Please log in to view your profile.
      </div>
    );

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    background: "linear-gradient(to right, #e3f2fd, #fce4ec)",
    minHeight: "100vh",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    padding: "30px 40px",
    maxWidth: "500px",
    width: "100%",
  };

  const iconStyle = {
    fontSize: "80px",
    color: "#4a90e2",
    marginBottom: "20px",
    textAlign: "center",
  };

  const formGroupStyle = {
    marginBottom: "18px",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer",
    flex: 1,
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#e57373",
  };

  const infoItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "16px",
    color: "#444",
    background: "#f5f5f5",
    padding: "10px 12px",
    borderRadius: "10px",
    marginBottom: "12px",
  };

  const infoIconStyle = {
    color: "#4a90e2",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center" }}>
          <FaUserCircle style={iconStyle} />
        </div>

        {editing ? (
          <form onSubmit={handleSubmit}>
            {[
              { id: "username", type: "text", label: "Username" },
              { id: "email", type: "email", label: "Email", disabled: true },
              { id: "height", type: "number", label: "Height (cm)" },
              { id: "weight", type: "number", label: "Weight (kg)" },
              { id: "age", type: "number", label: "Age" },
            ].map(({ id, type, label, disabled }) => (
              <div style={formGroupStyle} key={id}>
                <label htmlFor={id} style={labelStyle}>
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  name={id}
                  value={profileData[id]}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder={label}
                  disabled={disabled}
                />
              </div>
            ))}

            <div style={formGroupStyle}>
              <label htmlFor="gender" style={labelStyle}>
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                style={inputStyle}
              >
                <option value="not selected">Not Selected</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={buttonGroupStyle}>
              <button type="submit" style={buttonStyle}>
                Save
              </button>
              <button
                type="button"
                style={cancelButtonStyle}
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div style={infoItemStyle}>
              <FaUserCircle style={infoIconStyle} />
              <span>{profileData.username}</span>
            </div>
            <div style={infoItemStyle}>
              <FaRegEnvelope style={infoIconStyle} />
              <span>{profileData.email}</span>
            </div>
            <div style={infoItemStyle}>
              <FaRulerCombined style={infoIconStyle} />
              <span>{profileData.height} cm</span>
            </div>
            <div style={infoItemStyle}>
              <FaWeightHanging style={infoIconStyle} />
              <span>{profileData.weight} kg</span>
            </div>
            <div style={infoItemStyle}>
              <FaTransgender style={infoIconStyle} />
              <span>{profileData.gender}</span>
            </div>
            <div style={infoItemStyle}>
              <FaBirthdayCake style={infoIconStyle} />
              <span>{profileData.age} years</span>
            </div>
            <button onClick={() => setEditing(true)} style={{ ...buttonStyle, marginTop: "15px" }}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
