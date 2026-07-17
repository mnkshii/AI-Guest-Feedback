import { useState, useEffect } from 'react';

const AIAnalysis = () => {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedReview = localStorage.getItem('savedReview');
    const savedResult = localStorage.getItem('savedResult');
    if (savedReview) setReview(savedReview);
    if (savedResult) {
      try {
        setResult(JSON.parse(savedResult));
      } catch (e) {
        console.error('Failed to parse saved result');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedReview', review);
  }, [review]);

 
  useEffect(() => {
    if (result) {
      localStorage.setItem('savedResult', JSON.stringify(result));
    } else {
      localStorage.removeItem('savedResult');
    }
  }, [result]);

  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  
  const handleAnalyze = async () => {
    if (!review.trim()) {
      setError('Please paste a guest review first.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://ai-guest-feedback.onrender.com/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review: review.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'AI analysis failed.');
      }

      const aiResult = data.analysis;
      console.log('AI Result:', aiResult); 
    
      let raw = aiResult.sentiment.toLowerCase();
      let normalized;
      if (['positive', 'good', 'excellent'].includes(raw)) {
        normalized = 'positive';
      } else if (['negative', 'bad', 'poor'].includes(raw)) {
        normalized = 'negative';
      } else {
        
        normalized = 'neutral';
      }

     
      let score = '3.0';
      if (normalized === 'positive') score = '4.8';
      else if (normalized === 'neutral') score = '3.5';
      else if (normalized === 'negative') score = '2.0';

    
      let themes = [];
      if (Array.isArray(aiResult.keyPoints)) {
        themes = aiResult.keyPoints.map(item => item.trim());
      } else if (typeof aiResult.keyPoints === 'string') {
        themes = aiResult.keyPoints.split(',').map(s => s.trim());
      } else {
        themes = ['No key points extracted'];
      }

      
      setResult({
        sentiment: normalized,
        score: score,
        themes: themes,
        response: aiResult.response,
      });

    } catch (err) {
      setError(err.message || 'Network error – is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  
  const handleNewAnalysis = () => {
    setResult(null);
    localStorage.removeItem('savedResult');
  };

 
  return (
    <div className="page-container">
      <div className="page-header">
        <h1><i className="fas fa-robot"></i> AI Analysis</h1>
        <p>Paste a guest review and get instant AI-powered insights</p>
      </div>

      <div className="analysis-grid">
        {/* Input Section */}
        <div className="analysis-input card">
          <h3><i className="fas fa-pen"></i> Enter Review</h3>
          <textarea
            className="review-textarea"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Paste guest review here..."
            rows="6"
            disabled={loading}
          />
          <button
            className="btn btn-primary"
            onClick={handleAnalyze}
            disabled={loading || !review.trim()}
          >
            {loading ? (
              <><i className="fas fa-spinner fa-spin"></i> Analyzing...</>
            ) : (
              <><i className="fas fa-magic"></i> Analyze Review</>
            )}
          </button>

          {/* Error Toast */}
          {error && (
            <div style={{
              marginTop: '1rem',
              color: '#d32f2f',
              background: '#fde8e8',
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #f5c6cb'
            }}>
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}
        </div>

        {/* Result Section */}
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
            <button className="btn btn-secondary" onClick={handleNewAnalysis}>
              <i className="fas fa-undo"></i> New Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;