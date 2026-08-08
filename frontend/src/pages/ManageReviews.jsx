import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import Toast from "../components/ui/Toast";

const API = "https://ai-guest-feedback.onrender.com/api/reviews";
const AI_API = "https://ai-guest-feedback.onrender.com/api/ai/analyze";


function detectSentiment(comment) {
  const text = comment.toLowerCase();

  const positiveWords = [
    "good", "great", "excellent", "amazing", "awesome",
    "perfect", "love", "friendly", "clean", "nice",
    "recommend", "wonderful", "happy", "comfortable", "best",
  ];

  const negativeWords = [
    "bad", "dirty", "worst", "poor", "slow", "terrible",
    "awful", "noisy", "hate", "broken", "disappointed",
    "uncomfortable", "rude",
  ];

  let positiveScore = 0;
  let negativeScore = 0;

  positiveWords.forEach((word) => {
    if (text.includes(word)) positiveScore++;
  });

  negativeWords.forEach((word) => {
    if (text.includes(word)) negativeScore++;
  });

  if (positiveScore > negativeScore) return "positive";
  if (negativeScore > positiveScore) return "negative";
  return "neutral";
}

function ManageReviews() {
  const location = useLocation();

  const [reviews, setReviews] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [form, setForm] = useState({
    guest: "",
    rating: 5,
    comment: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [savingReview, setSavingReview] = useState(false);

 
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", variant: "success" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  

  const fetchReviews = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setReviews([]);
      return;
    }

    try {
      const res = await fetch(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setReviews([]);
        return;
      }
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("FETCH REVIEWS ERROR:", err);
      setReviews([]);
    }
  };

  const openGallery = (images, index) => {
    setGalleryImages(images);
    setCurrentIndex(index);
  };

  useEffect(() => {
    fetchReviews();
  }, [location.pathname]);

 
 

  const generateAIResponses = async () => {
    try {
      setAiLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allReviews = await res.json();

      if (!res.ok) {
        throw new Error(allReviews.message || "Failed to fetch reviews");
      }

      const reviewsToProcess = allReviews.filter(
        (review) => !review.aiResponse
      );

      if (reviewsToProcess.length === 0) {
        setToast({
          show: true,
          message: "✅ All reviews already have AI responses!",
          variant: "success",
        });
        return;
      }

      let successCount = 0;
      let failCount = 0;

      for (const review of reviewsToProcess) {
        try {
          const aiRes = await fetch(AI_API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ review: review.comment }),
          });

          const aiData = await aiRes.json();

          if (aiRes.ok && aiData.success) {
            const updateRes = await fetch(`${API}/${review._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                aiResponse: aiData.analysis.response,
              }),
            });

            if (updateRes.ok) {
              successCount++;
            } else {
              failCount++;
            }
          } else {
            failCount++;
          }
        } catch (err) {
          failCount++;
          console.error("AI RESPONSE ERROR:", err);
        }
      }

      setToast({
        show: true,
        message: `✅ AI Responses Generated! Success: ${successCount}, Failed: ${failCount}`,
        variant: "success",
      });

      fetchReviews();
    } catch (err) {
      console.error("AI GENERATION ERROR:", err);
      setToast({
        show: true,
        message: "❌ Failed to generate AI responses.",
        variant: "error",
      });
    } finally {
      setAiLoading(false);
    }
  };

  

  const renderStars = (rating) => {
    return "★".repeat(rating);
  };

 

  const handleImageChange = (e) => {
  const files = Array.from(e.target.files || []);

  if (files.length > 5) {
    setToast({
      show: true,
      message: "Maximum 5 images allowed.",
      variant: "error",
    });

    e.target.value = "";
    return;
  }

  setSelectedFiles(files);

  const previews = files.map((file) =>
    URL.createObjectURL(file)
  );

  setPreviewImages(previews);

  console.log("Selected Files:", files);
};

  

  const resetForm = () => {
    setForm({ guest: "", rating: 5, comment: "" });
    setSelectedFiles([]);
    setPreviewImages([]);
    setEditingId(null);

    const fileInput = document.querySelector(".review-file-input");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (savingReview) return;

    if (form.guest.trim().length < 2) {
      setToast({
        show: true,
        message: "Guest name must be at least 2 characters.",
        variant: "error",
      });
      return;
    }

    if (form.comment.trim().length < 10) {
      setToast({
        show: true,
        message: "Comment must be at least 10 characters.",
        variant: "error",
      });
      return;
    }

    try {
      setSavingReview(true);
      const token = localStorage.getItem("token");
      const sentiment = detectSentiment(form.comment);

      if (!editingId) {
       
        const formData = new FormData();
        formData.append("guest", form.guest.trim());
        formData.append("rating", form.rating);
        formData.append("comment", form.comment.trim());
        formData.append("sentiment", sentiment);

       selectedFiles.forEach((file) => {
            formData.append("images", file);
          });

          console.log("Uploading files:");

          for (let pair of formData.entries()) {
            console.log(pair[0], pair[1].name || pair[1]);
          }
        
        const res = await fetch(API, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to save review");
        }

        setReviews((prev) => [data, ...prev]);
        setToast({
          show: true,
          message: "✅ Review added successfully!",
          variant: "success",
        });
      } else {
        
        const res = await fetch(`${API}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            guest: form.guest.trim(),
            rating: Number(form.rating),
            comment: form.comment.trim(),
            sentiment,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to update review");
        }

        setReviews((prev) =>
          prev.map((review) => (review._id === editingId ? data : review))
        );

        setToast({
          show: true,
          message: "✅ Review updated successfully!",
          variant: "success",
        });
      }

      resetForm();
    } catch (err) {
      console.error("SAVE REVIEW ERROR:", err);
      setToast({
        show: true,
        message: err.message || "❌ Something went wrong. Please try again.",
        variant: "error",
      });
    } finally {
      setSavingReview(false);
    }
  };



  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/${reviewId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
      setToast({
        show: true,
        message: "🗑️ Review deleted successfully!",
        variant: "success",
      });
    } catch (err) {
      console.error("DELETE ERROR:", err);
      setToast({
        show: true,
        message: "❌ Failed to delete review.",
        variant: "error",
      });
    }
  };

 

  const handleEdit = (review) => {
    setEditingId(review._id);
    setForm({
      guest: review.guest,
      rating: review.rating,
      comment: review.comment,
    });
    setSelectedFiles([]);
    setPreviewImages([]);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  

  const cancelEdit = () => {
    resetForm();
  };

  
  return (
    <>
      <div className="manage-reviews">

        
        <div className="page-header">
          <h1>Manage Reviews</h1>
          <p className="subtitle">Add, edit, or delete guest reviews.</p>

          <button
            className="ai-button"
            onClick={generateAIResponses}
            disabled={aiLoading}
          >
            {aiLoading
              ? "⏳ Generating AI Responses..."
              : "✨ Generate AI Responses"}
          </button>
        </div>

        

        <div className="form-card">
          <form onSubmit={handleSubmit}>

            {/* Guest Name */}
            <input
              type="text"
              placeholder="Guest Name"
              value={form.guest}
              onChange={(e) => setForm({ ...form, guest: e.target.value })}
              required
              disabled={savingReview}
            />

            {/* Rating */}
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= form.rating ? "star active" : "star"}
                  onClick={() => {
                    if (!savingReview) {
                      setForm({ ...form, rating: star });
                    }
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Comment */}
            <textarea
              placeholder="Comment"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              required
              disabled={savingReview}
              rows="4"
            />

           

            <div className="file-upload-group">
              <div className="file-input-wrapper">
                <label className="file-label">
                  
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    stroke="currentColor" 
                    width="18" 
                    height="18"
                    style={{ marginRight: '8px' }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" 
                    />
                  </svg>
                  Choose Files
                  <input
                    className="review-file-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={savingReview}
                    style={{ display: 'none' }}
                  />
                </label>
                <span className="file-name">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} file(s) selected`
                    : 'No file chosen'}
                </span>
              </div>

              {previewImages.length > 0 && (
                <div className="image-preview">
                  {previewImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Preview ${index + 1}`}
                      width="60"
                    />
                  ))}
                </div>
              )}
            </div>

            

            <div className="form-actions">
              <button type="submit" disabled={savingReview}>
                {savingReview
                  ? "⏳ Uploading..."
                  : editingId
                  ? "Update Review"
                  : "Add Review"}
              </button>

              {editingId && (
                <button type="button" onClick={cancelEdit} disabled={savingReview}>
                  Cancel Edit
                </button>
              )}
            </div>

          </form>
        </div>

        <hr />

        

        <div className="table-card">

          <h2>All Reviews</h2>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Sentiment</th>
                  <th>AI Response</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {reviews.length === 0 ? (

                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>
                      📝 No reviews yet. Add your first review above!
                    </td>
                  </tr>

                ) : (

                  reviews.map((review) => (

                    <tr key={review._id}>

                      {/* Guest */}
                      <td data-label="Guest">{review.guest}</td>

                      {/* Rating */}
                      <td data-label="Rating" className="rating-stars-cell">
                        {renderStars(review.rating)}
                      </td>

                      
                      <td data-label="Comment">
                        <p>{review.comment}</p>

                        {review.images && review.images.length > 0 && (
                          <div className="review-images">
                            {review.images.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`Review image ${index + 1}`}
                                width="80"
                                className="clickable-image"
                                onClick={() => openGallery(review.images, index)}
                              />
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Sentiment */}
                      <td data-label="Sentiment" className={`sentiment-${review.sentiment}`}>
                        {review.sentiment}
                      </td>

                      {/* AI Response */}
                      <td data-label="AI Response">
                        {review.aiResponse ? (
                          <p>{review.aiResponse}</p>
                        ) : (
                          <span>Not Generated</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td data-label="Actions">
                        <button onClick={() => handleEdit(review)} disabled={savingReview}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(review._id)} disabled={savingReview}>
                          Delete
                        </button>
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>
        </div>
      </div>

      

      {galleryImages.length > 0 &&
        createPortal(
          <div
            className="image-modal"
            onClick={() => setGalleryImages([])}
          >

            <button
              className="close-image"
              onClick={(e) => {
                e.stopPropagation();
                setGalleryImages([]);
              }}
            >
              ✕
            </button>

            <button
              className="prev-image"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(
                  (currentIndex - 1 + galleryImages.length) % galleryImages.length
                );
              }}
            >
              ❮
            </button>

            <img
              src={galleryImages[currentIndex]}
              className="large-image"
              alt="Review"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="next-image"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((currentIndex + 1) % galleryImages.length);
              }}
            >
              ❯
            </button>

          </div>,
          document.body
        )}

      

      {toast.show && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast({ show: false, message: "", variant: "success" })}
        />
      )}
    </>
  );
}

export default ManageReviews;