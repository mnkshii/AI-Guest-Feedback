import { useEffect, useState } from "react";
import "../styles/manageReviews.css";

const API = "http://localhost:5000/api/reviews";
const AI_API = "http://localhost:5000/api/ai/generate";
function detectSentiment(comment) {
  const text = comment.toLowerCase();
  const positiveWords = ["good","great","excellent","amazing","awesome","perfect","love","friendly","clean","nice","recommend","wonderful","happy","comfortable","best"];
  const negativeWords = ["bad","dirty","worst","poor","slow","terrible","awful","noisy","hate","broken","disappointed","uncomfortable","rude"];
  let positiveScore = 0, negativeScore = 0;
  positiveWords.forEach(word => { if (text.includes(word)) positiveScore++; });
  negativeWords.forEach(word => { if (text.includes(word)) negativeScore++; });
  if (positiveScore > negativeScore) return "positive";
  if (negativeScore > positiveScore) return "negative";
  return "neutral";
}

function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ guest: "", rating: 5, comment: "" });
  const [editingId, setEditingId] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const fetchReviews = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(API, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await res.json();
    setReviews(data);
  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => {
    fetchReviews();
  }, []);

const generateAIResponses = async () => {
  try {
    setAiLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(AI_API, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "AI failed");
    }

    alert(`${data.count} AI responses generated successfully!`);

    fetchReviews();

  } catch (err) {
    console.log(err);
    alert("Failed to generate AI responses");
  } finally {
    setAiLoading(false);
  }
};
  const renderStars = (rating) => {
    return "★".repeat(rating);
  };

  return (
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
    ? "Generating AI Responses..."
    : "✨ Generate AI Responses"}
</button>
      </div>

      <div className="form-card">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const url = editingId ? `${API}/${editingId}` : API;
              const method = editingId ? "PUT" : "POST";
              const sentiment = detectSentiment(form.comment);
              const token = localStorage.getItem("token");
              const res = await fetch(url, {
              method,
              headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({ ...form, sentiment }),
              });
              if (!res.ok) throw new Error("Failed");
              setForm({ guest: "", rating: 5, comment: "" });
              setEditingId(null);
              fetchReviews();
            } catch (err) {
              alert("Something went wrong");
            }
          }}
        >
          <input
            type="text"
            placeholder="Guest Name"
            value={form.guest}
            onChange={(e) => setForm({ ...form, guest: e.target.value })}
            required
          />

          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= form.rating ? "star active" : "star"}
                onClick={() => setForm({ ...form, rating: star })}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Comment"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            required
          />

          <button type="submit">
            {editingId ? "Update Review" : "Add Review"}
          </button>
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
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td data-label="Guest">{review.guest}</td>
                  <td data-label="Rating" className="rating-stars-cell">
                    {renderStars(review.rating)}
                  </td>
                  <td data-label="Comment">{review.comment}</td>
                  <td data-label="Sentiment" className={`sentiment-${review.sentiment}`}>
                    {review.sentiment}
                  </td>
                  <td data-label="AI Response">
                    {review.aiResponse ? (
                      <p>{review.aiResponse}</p>
                    ) : (
                      <span>Not Generated</span>
                    )}
                  </td>

                  <td data-label="Priority">
                    {review.priority || "Pending"}
                  </td>
                  <td data-label="Actions">
                    <button
                      onClick={() => {
                        setEditingId(review._id);
                        setForm({
                          guest: review.guest,
                          rating: review.rating,
                          comment: review.comment,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (!window.confirm("Delete this review?")) return;
                        const token = localStorage.getItem("token");
                        await fetch(`${API}/${review._id}`, {
                        method: "DELETE",
                        headers: {
                        "Authorization": `Bearer ${token}`
                        }
                        });
                        fetchReviews();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageReviews;