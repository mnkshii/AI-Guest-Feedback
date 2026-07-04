import { useState } from "react";
import { Button } from "../components/ui";

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

      <Button onClick={analyzeReview}>
        Analyze
      </Button>

      <p>{result}</p>
    </div>
  );
}