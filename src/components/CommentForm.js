import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../configs/api";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const CommentForm = ({ car_id, onCommentSubmit }) => {
    const { userData } = useContext(AuthContext);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);

    if (!userData) {
        return (
            <div className="p-4 bg-light rounded shadow-sm">
                <p className="text-center text-muted"><Link className="fw-bold text-success" to="/auth/login">Đăng nhập </Link> để bình luận</p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            toast.error("Vui lòng nhập bình luận!");
            return;
        }

        setSubmitting(true);

        const commentData = {
            user_id: userData?._id,
            car_id,
            user_name: userData?.full_name || "Người dùng ẩn danh",
            user_avatar: userData?.avt || "https://via.placeholder.com/50",
            content: newComment,
            rating,
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await api.post("/api/comments", commentData);
            onCommentSubmit(response.data); // Gọi hàm callback để thêm bình luận vào state
            setNewComment("");
            setRating(5);
            toast.success("Bình luận thành công! ✅");
        } catch (error) {
            toast.error("Lỗi khi gửi bình luận ❌");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-4 bg-light rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold">Viết bình luận</h5>
                <div className="d-flex align-items-center">
                    <span className="me-2 fw-bold">Đánh giá:</span>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <FaStar
                            key={num}
                            onClick={() => setRating(num)}
                            style={{
                                cursor: "pointer",
                                fontSize: "22px",
                                color: num <= rating ? "#FFD700" : "#ccc", // Màu vàng hoặc xám
                                transition: "0.2s ease-in-out"
                            }}
                        />
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        className="form-control border rounded p-3"
                        placeholder="Nhập bình luận của bạn..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows="3"
                        style={{ resize: "none", fontSize: "16px" }}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={submitting}
                    style={{ fontSize: "18px", fontWeight: "bold", borderRadius: "10px" }}
                >
                    {submitting ? "Đang gửi..." : "Gửi bình luận"}
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
