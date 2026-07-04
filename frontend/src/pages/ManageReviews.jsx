import { useEffect, useState } from "react";

const API = "https://ai-guest-feedback.onrender.com/api/reviews";

function ManageReviews() {
  const [reviews, setReviews] = useState([]);

  const [form, setForm] = useState({
    guest: "",
    rating: 5,
    comment: "",
    sentiment: "positive",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);
    return (
    <div className="manage-reviews">

  <h1>Manage Reviews</h1>

  <form
    onSubmit={async (e) => {
      e.preventDefault();

      try {
        const url = editingId
          ? `${API}/${editingId}`
          : API;

        const method = editingId ? "PUT" : "POST";

        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!res.ok) {
          throw new Error("Failed");
        }

        setForm({
          guest: "",
          rating: 5,
          comment: "",
          sentiment: "positive",
        });

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
      onChange={(e) =>
        setForm({ ...form, guest: e.target.value })
      }
      required
    />

    <input
      type="number"
      min="1"
      max="5"
      value={form.rating}
      onChange={(e) =>
        setForm({
          ...form,
          rating: Number(e.target.value),
        })
      }
    />

    <textarea
      placeholder="Comment"
      value={form.comment}
      onChange={(e) =>
        setForm({
          ...form,
          comment: e.target.value,
        })
      }
      required
    />

    <select
      value={form.sentiment}
      onChange={(e) =>
        setForm({
          ...form,
          sentiment: e.target.value,
        })
      }
    >
      <option value="positive">Positive</option>
      <option value="neutral">Neutral</option>
      <option value="negative">Negative</option>
    </select>

    <button type="submit">
      {editingId ? "Update Review" : "Add Review"}
    </button>

  </form>
  <hr />

<h2>All Reviews</h2>

<table border="1" cellPadding="10">
  <thead>
    <tr>
      <th>Guest</th>
      <th>Rating</th>
      <th>Comment</th>
      <th>Sentiment</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {reviews.map((review) => (
      <tr key={review._id}>
        <td>{review.guest}</td>
        <td>{review.rating}</td>
        <td>{review.comment}</td>
        <td>{review.sentiment}</td>

        <td>
          <button
            onClick={() => {
              setEditingId(review._id);

              setForm({
                guest: review.guest,
                rating: review.rating,
                comment: review.comment,
                sentiment: review.sentiment,
              });
            }}
          >
            Edit
          </button>

          <button
            onClick={async () => {
              if (!window.confirm("Delete this review?")) return;

              await fetch(`${API}/${review._id}`, {
                method: "DELETE",
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

  );
}

export default ManageReviews;