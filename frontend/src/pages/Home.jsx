const Home = () => {
  return (
    <>
      {/* Hero section */}
      <section className="hero">
        <div className="badge">
          <i className="fas fa-bolt"></i> AI powered insights for hotels
        </div>
        <h2>Understand Guest Reviews with AI</h2>
        <p>Analyze guest feedback in real-time with our advanced AI-powered insights.</p>
        <p>Turn thousands of reviews into actionable insights in seconds.</p>
        <button className="btn-glow" onClick={() => alert('✨ Welcome to the AI Guest Feedback Analyzer!')}>
          <i className="fas fa-sparkle"></i> Get Started →
        </button>
      </section>

      {/* Cards */}
      <div className="card-container">
        <div className="card">
          
          <h3>Sentiment Analysis</h3>
          <p>Detect positive, negative and neutral reviews.</p>
        </div>
        <div className="card">
          <h3>Keyword Extraction</h3>
          <p>Identify key themes and topics in reviews automatically.</p>
        </div>
        <div className="card">
         
          <h3>AI Response Generator</h3>
          <p>Generate personalized responses to guest feedback using AI.</p>
        </div>
      </div>
    </>
  );
};

export default Home;