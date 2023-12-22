import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
import "../styles/Cart.css";
import Layout from "../components/Layout";
import UserContext from "../hooks/userProvider";
import { Link } from "react-router-dom";

const Cart = () => {
  const { userId } = useContext(UserContext);
  const [bookmarks, setBookmarks] = useState("");
  console.log(bookmarks);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bookmark/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setBookmarks(data.data))
      .catch((e) => console.log(e));
  }, []);

  const handleDeleteClick = (LICENSE_PLATE) => {
    fetch(`http://127.0.0.1:8000/api/del_bookmark`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        USER_ID: userId,
        LICENSE_PLATE: LICENSE_PLATE,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        const updatedBookmarks = bookmarks.filter(
          (bookmark) =>
            bookmark.LICENSE_PLATE !== LICENSE_PLATE
        );
        setBookmarks(updatedBookmarks);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Layout>
      <div className="cart-container">
        <ul className="cart-list">
          {bookmarks?.length > 0 ? (
            bookmarks.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <div className="item-image">
                    <div>
                      <p className="item-name">Tên xe</p>
                      <span className="item-value">{item.NAME}</span>
                    </div>
                  </div>
                  <div className="item-details">
                    <div>
                      <p className="item-price">Giá thuê</p>
                      <span className="item-value">
                        {item.PRICE_C} vnd/ngày
                      </span>
                    </div>
                    <div>
                      <p className="item-location">Địa điểm nhận xe</p>
                      <span className="item-value">{item.LOCATION}</span>
                    </div>
                  </div>
                  <div className="additional-info">
                    <div className="info-item">
                      <p className="info-label">Số ghế</p>
                      <span className="info-value">{item.SEAT}</span>
                    </div>
                    <div className="info-item">
                      <p className="info-label">Nhiên liệu sử dụng</p>
                      <span className="info-value">{item.FUEL}</span>
                    </div>
                    <div className="info-item">
                      <p className="info-label">Tiêu hao nhiên liệu</p>
                      <span className="info-value">
                        {item.CONSUMPTION} lít/100km
                      </span>
                    </div>
                  </div>
                  <div className="cart-actions">
                    <Link
                      to={`/detail/${item.LICENSE_PLATE}`}
                      className="goto_btn"
                    >
                      Xem
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(item.LICENSE_PLATE)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default Cart;

// {cart.length > 0 ? (
//   cart.map((item) => (
//     <li key={item.id} className="cart-item">
//       <div className="item-status">
//         Trạng thái giao dịch : {item.status ? item.status : "Chưa rõ"}{" "}
//       </div>
//       <div className="item-info">
//         <div className="item-image">
//           <div className="item-fix-image">
//             <img
//               src={
//                 item.image
//                   ? item.image
//                   : "https://static.thenounproject.com/png/741653-200.png"
//               }
//               alt=""
//             />
//           </div>
//           <div>
//             <p className="item-name">Tên xe</p>
//             <span className="item-value">{item.name}</span>
//           </div>
//         </div>
//         <div className="item-details">
//           <div>
//             <p className="item-price">Giá thuê</p>
//             <span className="item-value">{item.price}</span>
//           </div>
//           <div>
//             <p className="item-location">Địa điểm nhận xe</p>
//             <span className="item-value">{item.address}</span>
//           </div>
//         </div>
//         <div className="additional-info">
//           <div className="info-item">
//             <p className="info-label">Số ghế</p>
//             <span className="info-value">{item.seats}</span>
//           </div>
//           <div className="info-item">
//             <p className="info-label">Nhiên liệu sử dụng</p>
//             <span className="info-value">{item.fuelType}</span>
//           </div>
//           <div className="info-item">
//             <p className="info-label">Tiêu hao nhiên liệu</p>
//             <span className="info-value">
//               {item.fuelConsumption} lít/100km
//             </span>
//           </div>
//         </div>
//         <div className="cart-actions">
//           <button
//             className="view-button"
//             // onClick={() => handleViewClick(item.id)}
//           >
//             Xem
//           </button>
//           <button
//             className="delete-button"
//             onClick={() => handleDeleteClick(item.id)}
//           >
//             Xóa
//           </button>
//         </div>
//       </div>
//     </li>
//   ))
// ) : (
//   <p>Không có dữ liệu</p>
// )}
