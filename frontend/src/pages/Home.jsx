import Hero from "../components/hero";
const Home = () => {
  return (
    <>
      {/* Hero section */}
      <Hero />

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