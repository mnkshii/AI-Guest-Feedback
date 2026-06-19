import { useState } from 'react';

const AIAnalysis = () => {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!review.trim()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)],
        themes: ['Cleanliness', 'Service', 'Amenities', 'Location', 'Value'].slice(0, 2 + Math.floor(Math.random() * 3)),
        response: 'Thank you for your valuable feedback. We appreciate your insights and will work to improve.',
        score: (Math.random() * 4 + 1).toFixed(1)
      };
      setResult(mockResult);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><i className="fas fa-robot"></i> AI Analysis</h1>
        <p>Paste a guest review and get instant AI-powered insights</p>
      </div>

      <div className="analysis-grid">
        <div className="analysis-input card">
          <h3><i className="fas fa-pen"></i> Enter Review</h3>
          <textarea
            className="review-textarea"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Paste guest review here..."
            rows="6"
          />
          <button
            className="btn btn-primary"
            onClick={handleAnalyze}
            disabled={loading || !review.trim()}
          >
            {loading ? <><i className="fas fa-spinner fa-spin"></i> Analyzing...</> : <><i className="fas fa-magic"></i> Analyze Review</>}
          </button>
        </div>

        {result && (
          <div className="analysis-result card">
            <h3><i className="fas fa-chart-pie"></i> Analysis Result</h3>
            <div className="result-item">
              <span className="label">Sentiment:</span>
              <span className={`sentiment-${result.sentiment}`}>
                <i className={`fas fa-${result.sentiment === 'positive' ? 'smile' : result.sentiment === 'neutral' ? 'meh' : 'frown'}`}></i>
                {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
              </span>
            </div>
            <div className="result-item">
              <span className="label">Sentiment Score:</span>
              <span>{result.score}/5.0</span>
            </div>
            <div className="result-item">
              <span className="label">Key Themes:</span>
              <div className="theme-tags">
                {result.themes.map((theme, i) => (
                  <span key={i} className="theme-tag">{theme}</span>
                ))}
              </div>
            </div>
            <div className="result-item">
              <span className="label">Suggested Response:</span>
              <p className="response-text">{result.response}</p>
            </div>
            <button className="btn btn-secondary" onClick={() => setResult(null)}>
              <i className="fas fa-undo"></i> New Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;