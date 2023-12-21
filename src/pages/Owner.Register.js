// import React, { useState } from "react";
// import Layout from "../components/Layout";
// import { useAuth } from "../hooks/useAuthentication";
// import { useNavigate } from "react-router-dom";

// const Owner_Register = () => {
//   const { userData, isLogin } = useAuth();
//   const navigate = useNavigate();
//   const [LICENSE_PLATE, setLICENSE_PLATE] = useState("");
//   const [NAME, setNAME] = useState("");
//   const [formData, setFormData] = useState({
//     "LICENSE_PLATE": LICENSE_PLATE,
//     "NAME": NAME,
//     "LOCATION": LOCATION,
//     "BRAND": BRAND,
//     "SEAT": SEAT,
//     "TRANSMISSION": TRANSMISSION,
//     "FUEL": FUEL,
//     "CONSUMPTION": CONSUMPTION,
//     "PRICE_C": PRICE_C,
//     "SERVICE_C": SERVICE_C,
//     "INSURANCE_C": INSURANCE_C,
//     "DESCRIPTION": DESCRIPTION,
//     "MAP": MAP,
//     "BLUETOOTH": BLUETOOTH,
//     "CAMERA_360": CAMERA_360,
//     "CAMERA_SIDES": CAMERA_SIDES,
//     "CAMERA_JOURNEY": CAMERA_JOURNEY,
//     "CAMERA_BACK": CAMERA_BACK,
//     "TIRE_SENSOR": TIRE_SENSOR,
//     "IMPACT_SENSOR": IMPACT_SENSOR,
//     "SPEED_WARNING": SPEED_WARNING,
//     "SKY_WINDOW": SKY_WINDOW,
//     "GPS": GPS,
//     "CHILD_SEAT": CHILD_SEAT,
//     "USB": USB,
//     "SPARE_TIRE": SPARE_TIRE,
//     "DVD": DVD,
//     "ETC": ETC,
//     "AIRBAG": AIRBAG,
//     "PICKUP_COVER": PICKUP_COVER,
//     "FRONT_IMG": FRONT_IMG,
//     "BACK_IMG": BACK_IMG,
//     "LEFT_IMG": LEFT_IMG,
//     "RIGHT_IMG": RIGHT_IMG
//   });

//   const handleInputChange = (key, value) => {
//     setFormData({
//       ...formData,
//       [key]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const apiUrl = "";
//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         console.log("Form data successfully submitted!");
//         navigate("/mycar");
//       } else {
//         console.error("Failed to submit form data");
//       }
//     } catch (error) {
//       console.error("Error occurred while submitting form data", error);
//     }
//   };

//   const hasRegisteredCar = userData && userData.GPLX;
//   if (hasRegisteredCar) {
//     navigate("/mycar");
//     return null;
//   }

//   return (
//     <Layout>
//       <div className="owner-register-container">
//         <form onSubmit={handleSubmit}>
//           <div className="owner-register-custom">
//             <p htmlFor="LICENSE_PLATE">Biển số xe</p>
//             <input
//               type="text"
//               id="LICENSE_PLATE"
//               value={formData.LICENSE_PLATE}
//               onChange={(e) => handleInputChange("LICENSE_PLATE", e.target.value)}
//             />
//           </div>
//           <div>
//             <p htmlFor="NAME">Tên xe</p>
//             <input
//               type="text"
//               id="NAME"
//               value={formData.NAME}
//               onChange={(e) => handleInputChange("NAME", e.target.value)}
//             />
//           </div>
//           <div className="owner-register-custom">
//             <p htmlFor="LICENSE_PLATE">Biển số xe</p>
//             <input
//               type="text"
//               id="LICENSE_PLATE"
//               value={formData.LICENSE_PLATE}
//               onChange={(e) => handleInputChange("LICENSE_PLATE", e.target.value)}
//             />
//           </div>
//           <div className="owner-register-custom">
//             <p htmlFor="LICENSE_PLATE">Biển số xe</p>
//             <input
//               type="text"
//               id="LICENSE_PLATE"
//               value={formData.LICENSE_PLATE}
//               onChange={(e) => handleInputChange("LICENSE_PLATE", e.target.value)}
//             />
//           </div>
//           <div className="owner-register-custom">
//             <p htmlFor="LICENSE_PLATE">Biển số xe</p>
//             <input
//               type="text"
//               id="LICENSE_PLATE"
//               value={formData.LICENSE_PLATE}
//               onChange={(e) => handleInputChange("LICENSE_PLATE", e.target.value)}
//             />
//           </div>
//           <div className="owner-register-custom">
//             <p htmlFor="LICENSE_PLATE">Biển số xe</p>
//             <input
//               type="text"
//               id="LICENSE_PLATE"
//               value={formData.LICENSE_PLATE}
//               onChange={(e) => handleInputChange("LICENSE_PLATE", e.target.value)}
//             />
//           </div>
//           <div className="owner-register-custom">
//             <p htmlFor="LICENSE_PLATE">Biển số xe</p>
//             <input
//               type="text"
//               id="LICENSE_PLATE"
//               value={formData.LICENSE_PLATE}
//               onChange={(e) => handleInputChange("LICENSE_PLATE", e.target.value)}
//             />
//           </div>
//           <div className="owner-register-custom">
//             <p htmlFor="LICENSE_PLATE">Biển số xe</p>
//             <input
//               type="text"
//               id="LICENSE_PLATE"
//               value={formData.LICENSE_PLATE}
//               onChange={(e) => handleInputChange("LICENSE_PLATE", e.target.value)}
//             />
//           </div>
//           <div className="car-feature-register">
//             {/* Car feature items */}
//             <div className="car-feature-register-item">
//               <i className="bx bx-map"></i>
//               <p>Bản đồ</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-bluetooth"></i>
//               <p>Bluetooth</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-camera"></i>
//               <p>Camera 360</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-camera"></i>
//               <p>Camera lập lề</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-camera"></i>
//               <p>Camera hành trình</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-camera"></i>
//               <p>Camera lùi</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-car"></i>
//               <p>Cảm biến va chạm</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-speed"></i>
//               <p>Cảnh báo tốc độ</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-sun"></i>
//               <p>Cửa sổ trời</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-globe"></i>
//               <p>Định vị GPS</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-child"></i>
//               <p>Ghế trẻ em</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-usb"></i>
//               <p>Khe cắm USB</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-car"></i>
//               <p>Lốp dự phòng</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-tv"></i>
//               <p>Màn hình DVD</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-car"></i>
//               <p>Nắp thùng xe bán tải</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-gas-pump"></i>
//               <p>ETC</p>
//             </div>
//             <div className="car-feature-register-item">
//               <i className="bx bx-airbag"></i>
//               <p>Túi khí an toàn</p>
//             </div>
//           </div>
//         </form>

//       </div>
//     </Layout>
//   );
// };

// export default Owner_Register;
