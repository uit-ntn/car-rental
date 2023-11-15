import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Cookies from "js-cookie";

const Owner_Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      alert("Bạn phải đăng nhập để sử dụng tính năng này")
    }
  }, [navigate]);

  return (
    <Layout>

    </Layout>
  );
};

export default Owner_Register;
