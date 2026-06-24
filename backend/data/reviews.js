let reviews = [
  { id: 1, guest: 'John Doe', date: '2026-06-17', rating: 5, comment: 'Great stay, very clean!', sentiment: 'positive' },
  { id: 2, guest: 'Jane Smith', date: '2026-06-16', rating: 3, comment: 'WiFi was slow but room was nice.', sentiment: 'neutral' },
  { id: 3, guest: 'Alice Brown', date: '2026-06-15', rating: 2, comment: 'Noisy at night, not comfortable.', sentiment: 'negative' },
  { id: 4, guest: 'Bob Johnson', date: '2026-06-14', rating: 4, comment: 'Excellent location and friendly staff.', sentiment: 'positive' },
  { id: 5, guest: 'Emily Davis', date: '2026-06-13', rating: 5, comment: 'Perfect stay, highly recommend!', sentiment: 'positive' }
];
let nextId = 6;

exports.getAll = () => reviews;
exports.getById = (id) => reviews.find(r => r.id === id);
exports.create = (newReview) => {
  const review = { id: nextId++, ...newReview };
  reviews.push(review);
  return review;
};
exports.update = (id, updatedData) => {
  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) return null;
  reviews[index] = { ...reviews[index], ...updatedData };
  return reviews[index];
};
exports.remove = (id) => {
  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) return false;
  reviews.splice(index, 1);
  return true;
};
exports.search = (query) => {
  const q = query.toLowerCase();
  return reviews.filter(r =>
    r.guest.toLowerCase().includes(q) ||
    r.comment.toLowerCase().includes(q)
  );
};