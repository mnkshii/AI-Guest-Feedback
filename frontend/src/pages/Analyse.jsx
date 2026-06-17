import { useState } from "react";

export default function Analyze() {
  const [result, setResult] = useState("");

  const analyzeReview = () => {
    setResult("Positive Review");
  };

  return (
    <div className="p-8">
      <h1>AI Review Analysis</h1>

      <textarea
        placeholder="Paste Review Here"
      />

      <button onClick={analyzeReview}>
        Analyze
      </button>

      <p>{result}</p>
    </div>
  );
}