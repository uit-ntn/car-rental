import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Cookies from "js-cookie";
import { useAuth } from "../authContext";

const Owner_Register = () => {
  const navigate = useNavigate();
  const { previousPath, setPreviousPathContext } = useAuth();

  useEffect(() => {
    setPreviousPathContext(window.location.pathname);
  }, [setPreviousPathContext]);
  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Layout>
    </Layout>
  );
};

export default Owner_Register;
