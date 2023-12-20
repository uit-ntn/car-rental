import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

const Owner_Register = () => {
  const { userData, isLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    LICENSE_PLATE: "",
    NAME: "",
  });

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = ""; 
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data successfully submitted!");
        navigate("/mycar"); 
      } else {
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error occurred while submitting form data", error);
    }
  };

  const hasRegisteredCar = userData && userData.GPLX;
  if (hasRegisteredCar) {
    navigate("/mycar");
    return null;
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <label htmlFor="LICENSE_PLATE">License Plate:</label>
        <input
          type="text"
          id="LICENSE_PLATE"
          value={formData.LICENSE_PLATE}
          onChange={(e) => handleInputChange("LICENSE_PLATE", e.target.value)}
        />
        <label htmlFor="NAME">Name:</label>
        <input
          type="text"
          id="NAME"
          value={formData.NAME}
          onChange={(e) => handleInputChange("NAME", e.target.value)}
        />

        
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};

export default Owner_Register;
