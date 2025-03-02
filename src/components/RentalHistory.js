import React, { useEffect, useState, useContext } from "react";
import { getRentalsByUserId } from "../services/rentalService";  // API call để lấy lịch sử
import { AuthContext } from "../context/AuthContext";  // Để lấy user_id
import { Link } from "react-router-dom";

const RentalHistory = () => {
  const { user_id } = useContext(AuthContext);  // Lấy user_id từ context
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user_id) {
      getRentalsByUserId(user_id)
        .then(data => {
          setRentals(data);  // Lưu dữ liệu vào state
          setLoading(false);  // Đã xong tải
        })
        .catch(error => {
          console.error("Lỗi khi lấy dữ liệu rentals:", error);
          setLoading(false);
        });
    }
  }, [user_id]);

  if (loading) {
    return <p className="text-center">Đang tải lịch sử giao dịch...</p>;
  }

  return (
    <div>
      <h3>Danh sách lịch sử giao dịch</h3>
      {rentals.length === 0 ? (
        <p>Bạn chưa có lịch sử giao dịch.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Hình ảnh</th>
                <th>Hãng xe</th>
                <th>Mẫu xe</th>
                <th>Năm</th>
                <th>Ngày thuê</th>
                <th>Ngày trả</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map(rental => (
                <tr key={rental._id}>
                  <td>
                    <img src={rental.image} alt={rental.make} width="100" height="60" className="rounded" />
                  </td>
                  <td>{rental.make}</td>
                  <td>{rental.model}</td>
                  <td>{rental.year}</td>
                  <td>{new Date(rental.start_date).toLocaleDateString()}</td>
                  <td>{new Date(rental.end_date).toLocaleDateString()}</td>
                  <td>${rental.total_cost}</td>
                  <td>
                    <span className={`badge ${rental.status === "active" ? "bg-success" : "bg-secondary"}`}>
                      {rental.status === "active" ? "Đang thuê" : "Hoàn tất"}
                    </span>
                  </td>
                  <td>
                    <Link to={`/rental/${rental._id}`} className="btn btn-info btn-sm">
                      Xem
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RentalHistory;
