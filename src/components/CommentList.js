import React, { useState, useEffect } from "react";
import CommentPost from "./CommentPost";

function CommentList() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const commentAPI = "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(commentAPI);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [commentAPI]);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <CommentPost key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CommentList;
