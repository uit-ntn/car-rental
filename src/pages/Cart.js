import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AccountLayout from "../components/AccountLayout";
import "../styles/Cart.css";

const Cart = () => {
  const apiCart = "https://656d757bbcc5618d3c23335e.mockapi.io/car-rental/cart";
  const [cart, setCart] = useState([]);

  // const { userId } = useParams();
  const navigation = useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(apiCart);
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, []);

  const handleViewClick = (itemId) => {
    navigation(`/detail/${itemId}`);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      await fetch(`${apiCart}/${itemId}`, {
        method: "DELETE",
      });
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <AccountLayout>
      <div className="cart-container">
        <ul className="cart-list">
          {cart.length > 0 ? cart.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="item-status">Trạng thái giao dịch : { item.status ? item.status : "Chưa rõ"} </div>
              <div className="item-info">
                <div className="item-image">
                  <div className="item-fix-image">
                  <img src={item.image ? item.image : "https://static.thenounproject.com/png/741653-200.png"} alt="" />
                  </div>
                  <div>
                    <p className="item-name">Tên xe</p>
                    <span className="item-value">{item.name}</span>
                  </div>
                </div>
                <div className="item-details">
                  <div>
                    <p className="item-price">Giá thuê</p>
                    <span className="item-value">{item.price}</span>
                  </div>
                  <div>
                    <p className="item-location">Địa điểm nhận xe</p>
                    <span className="item-value">{item.address}</span>
                  </div>
                </div>
                <div className="additional-info">
                  <div className="info-item">
                    <p className="info-label">Số ghế</p>
                    <span className="info-value">{item.seats}</span>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Nhiên liệu sử dụng</p>
                    <span className="info-value">{item.fuelType}</span>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Tiêu hao nhiên liệu</p>
                    <span className="info-value">{item.fuelConsumption} lít/100km</span>
                  </div>
                </div>
                <div className="cart-actions">
                  <button
                    className="view-button"
                    onClick={() => handleViewClick(item.id)}
                  >
                    Xem
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </li>
          )) : <p>Không có dữ liệu</p>}
        </ul>
      </div>
    </AccountLayout>
  );
};

export default Cart;
