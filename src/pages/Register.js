import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";

import "../styles/Register.css";
import UserContext from "../hooks/userProvider";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const navigate = useNavigate();
  const { userId, setUserId } = useContext(UserContext);

  useEffect(() => {
    // Nếu đã đăng nhập, chuyển hướng người dùng đến trang chính
    if (userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  return (
    <Layout>
      
    </Layout>
  );
}

export default Register;
