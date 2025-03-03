import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaTrashAlt } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap"; // Để sử dụng modal xác nhận xóa
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const CommentItem = ({ comment, handleDeleteComment }) => {
    const { userData } = useContext(AuthContext); // Lấy thông tin user từ context
    const [showModal, setShowModal] = useState(false);

    // Hiển thị số sao dựa vào `rating`
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) =>
            i < rating ? <FaStar key={i} className="text-warning me-1" /> : <FaRegStar key={i} className="text-muted me-1" />
        );
    };

    // Hàm mở modal xác nhận xóa
    const handleShow = () => setShowModal(true);

    // Hàm đóng modal xác nhận xóa
    const handleClose = () => setShowModal(false);

    return (
        <li className="p-3 mb-3 shadow-sm rounded d-flex" style={{ backgroundColor: "#f9f9f9", transition: "0.3s" }}>
            {/* Avatar của người dùng */}
            <img
                src={comment.user_avatar || "https://scontent.fsgn5-14.fna.fbcdn.net/v/t1.6435-9/116264906_340041997020888_6356968955999431305_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=w_EkUcRU76kQ7kNvgHvC7-b&_nc_oc=AdhdObcFuqrswu5jVPNIeZR_nl-piZyXtf8Obj3GOATLXUZneOgvTcqE7Gr1Z2s6_d0&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=A8QKlC6_w1yVS7ca0F8sicu&oh=00_AYDw-Pjbrp15gX7VTV90AJTHHqhlVeICcmY6PmoF-MfEHA&oe=67ED550F"}
                alt="User Avatar"
                className="rounded-circle me-3"
                width="50"
                height="50"
                style={{ objectFit: "cover", border: "2px solid #ddd" }}
            />
            <div className="w-100">
                <div className="d-flex justify-content-between">
                    <div>
                        <h6 className="mb-1 fw-bold">{comment.user_name || "Người dùng ẩn danh"}</h6>
                        <div>{renderStars(comment.rating)}</div>
                        <p className="text-muted small mb-1">{new Date(comment.timestamp).toLocaleString()}</p>
                    </div>
                    {/* Hiển thị nút xóa nếu userData trùng với user_id của bình luận */}
                    {userData && userData._id === comment.user_id && (
                        <FaTrashAlt
                            onClick={handleShow}
                            className="text-danger cursor-pointer"
                            style={{ fontSize: "20px" }}
                        />
                    )}
                </div>
                <p className="mb-0">{comment.content}</p>
            </div>

            {/* Modal xác nhận xóa */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa bình luận này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            handleDeleteComment(comment._id); // Xử lý xóa bình luận khi xác nhận
                            handleClose();
                        }}
                    >
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </li>
    );
};

export default CommentItem;
