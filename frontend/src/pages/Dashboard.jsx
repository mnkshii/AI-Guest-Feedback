export default function Dashboard() {
  return (
    <div className="p-8">
      <h1>Dashboard</h1>

      <div className="grid gap-4 mt-6">
        <div>Total Reviews: 120</div>
        <div>Positive Reviews: 85</div>
        <div>Negative Reviews: 20</div>
        <div>Neutral Reviews: 15</div>
      </div>
    </div>
  );
}