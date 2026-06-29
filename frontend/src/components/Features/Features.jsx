import "./Features.css";
import FeatureCard from "../FeatureCard/FeatureCard";

function Features() {
    const features = [
        {
        icon: "💻",
        title: "AI Code Review",
        description: "Receive detailed AI-powered feedback to improve your coding skills."
        },
        {
        icon: "🎤",
        title: "AI Mock Interview",
        description: "Practice technical interviews with realistic AI interview simulations."
        },
        {
        icon: "📈",
        title: "Detailed Feedback",
        description: "Track mistakes, improve continuously and prepare with confidence."
        }
    ];
  return (
    <section className="features">

      <h2>Why Choose AlgoMock?</h2>

      <div className="features-grid">
        {
                    features.map((feature) => (

                        <FeatureCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />

                    ))
        }

      </div>

    </section>
  );
}

export default Features;