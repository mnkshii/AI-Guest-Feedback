import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="card-container">
      <Navbar />

      <Hero />

      <Card title="Sentiment Analysis" description="Detect positive, neutral and negative reviews." />
      <Card title="Keyword Extraction" description="Identify important keywords and phrases in reviews." />
      <Card title="AI Response Generator" description="Generate professional responses for the guest reviews." />
      <Footer />
    </div>
  );
}

export default Home;