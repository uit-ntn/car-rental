import React, { useEffect, useState, useContext } from "react";
import api from "../configs/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const CommentList = ({ car_id }) => {
    const { userData } = useContext(AuthContext); // Get userData from AuthContext
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5; // Hiển thị 5 bình luận mỗi trang

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await api.get(`/api/comments/${car_id}`);
                setComments(response.data);
            } catch (error) {
                console.error("Lỗi khi tải bình luận:", error);
                toast.error("Lỗi khi tải bình luận! ❌");
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [car_id]);

    // Xử lý thêm bình luận mới
    const handleNewComment = (newComment) => {
        setComments([newComment, ...comments]);
    };

    // Xử lý xóa bình luận
    const handleDeleteComment = async (commentId) => {
        console.log('Deleting comment with ID:', commentId);  // Debug log for commentId
        try {
            const response = await api.delete(`/api/comments/${commentId}`);
            if (response.status === 200) {
                setComments(comments.filter((comment) => comment._id !== commentId)); // Remove comment from state
                toast.success("Bình luận đã được xóa! ✅");
            }
        } catch (error) {
            console.error('Error when deleting comment:', error);
            toast.error("Lỗi khi xóa bình luận! ❌");
        }
    };

    // Xử lý phân trang
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    return (
        <div className="container my-4 border rounded p-4">
            <h4 className="mb-3">Bình luận ({comments.length})</h4>
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Form nhập bình luận */}
            <CommentForm car_id={car_id} onCommentSubmit={handleNewComment} />

            {/* Hiển thị danh sách bình luận */}
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Đang tải bình luận...</span>
                    </div>
                    <p className="ms-2">Đang tải bình luận...</p>
                </div>
            ) : currentComments.length === 0 ? (
                <p className="text-muted text-center my-5">Không có bình luận nào.</p>
            ) : (
                <ul className="list-unstyled">
                    {currentComments.map((comment) => (
                        <CommentItem
                            key={comment._id}
                            comment={comment}
                            userData={userData} // Pass userData to CommentItem
                            handleDeleteComment={handleDeleteComment} // Pass handleDeleteComment to CommentItem
                        />
                    ))}
                </ul>
            )}

            {/* Phân trang */}
            <div className="d-flex justify-content-center mt-3">
                <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Trang trước
                </button>
                <span className="align-self-center">Trang {currentPage} / {Math.ceil(comments.length / commentsPerPage)}</span>
                <button
                    className="btn btn-outline-primary ms-2"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(comments.length / commentsPerPage)))}
                    disabled={indexOfLastComment >= comments.length}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
};

export default CommentList;
