function Hero()
{
    return(
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
    );
}
export default Hero;