import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getReviewsByProduct, deleteReview } from "../../redux/reducer/reviewReducer";
import { Trash2 } from "lucide-react";

function Reviews({ id, userId }) {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) dispatch(getReviewsByProduct(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;

    dispatch(createReview({ productId: id, rating, comment })).then(() => {
      setRating(0);
      setComment("");
      dispatch(getReviewsByProduct(id));
    });
  };

  const handleDelete = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview(reviewId)).then(() => {
        dispatch(getReviewsByProduct(id));
      });
    }
  };

  return (
    <div className="mt-8 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 pb-2">Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6 text-sm max-w-xl">
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border border-gray-500 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
        >
          <option value="">Rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num} ⭐</option>
          ))}
        </select>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="2"
          placeholder="Write a review..."
          className="border border-gray-500 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
        />
        <button className="bg-pink-500 text-white text-sm px-3 py-1 rounded hover:bg-pink-600 transition">
          Submit
        </button>
      </form>

      {/* Reviews List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 text-center">No reviews yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="border rounded p-2 bg-gray-50 flex justify-between items-start gap-2 text-sm"
            >
              <div className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">{r.user?.name || "Anonymous"}</h4>
                  <span className="text-yellow-500">{r.rating} ⭐</span>
                </div>
                <p className="text-gray-700">{r.comment}</p>
                <small className="text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</small>
              </div>

              {r.user?._id === userId && (
                <button
                  onClick={() => handleDelete(r._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;
