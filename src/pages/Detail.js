import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/Detail.css"
const Detail = () => {
    const { id } = useParams();
    const [carData, setCarData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://6539dce6e3b530c8d9e8c413.mockapi.io/car-rental/car/${id}`);
          const data = await response.json();
  
          setCarData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [id]); 
  
    return (
      <Layout>
        <div className="detail-container">
          {carData && (
            <div className="car-avatar">
              <div className="main-avatar-fix">
                <img className="main-avatar" src={carData.image} alt={carData.name} />
              </div>
              <div className="car-avatar-1-fix">
                <img className="car-avatar-1" src={carData.image} alt={carData.name} />
              </div>
              <div className="car-avatar-2-fix">
                <img className="car-avatar-2" src={carData.image} alt={carData.name} />
              </div>
              <div className="car-avatar-3-fix">
                <img className="car-avatar-3" src={carData.image} alt={carData.name} />
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  };
  
  export default Detail;