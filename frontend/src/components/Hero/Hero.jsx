import { useNavigate } from "react-router-dom";
import { Sparkles, Code2, Mic, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAction = (path) => {
    if (token) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-glow"></span>
            <Sparkles size={14} className="badge-icon" />
            <span>Next-Gen Technical Interview AI</span>
          </div>

          <h1 className="hero-title">
            Master the Algorithms. <br />
            <span className="hero-title-gradient">Ace the Interview.</span>
          </h1>

          <p className="hero-description">
            Experience real-time AI code reviews, conversational mock interview sessions,
            and precise complexity diagnostics built for ambitious software engineers.
          </p>

          <div className="hero-actions">
            <button
              className="hero-btn-primary"
              onClick={() => handleAction("/review")}
            >
              <Code2 size={18} />
              <span>Review My Code</span>
              <ArrowRight size={16} className="btn-arrow" />
            </button>

            <button
              className="hero-btn-secondary"
              onClick={() => handleAction("/mock-interview")}
            >
              <Mic size={18} />
              <span>AI Mock Interview</span>
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>Instant Deep Code Analysis</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>DSA Domain Mastery</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>Complexity Diagnostics</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow"></div>
          
          {/* Luxury Floating Interactive Code Terminal Showcase */}
          <div className="terminal-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-title">
                <Code2 size={13} />
                <span>Solution.java • Live Review</span>
              </div>
              <div className="terminal-status">
                <span className="live-pill">Evaluated</span>
              </div>
            </div>

            <div className="terminal-body">
              <pre className="terminal-code">
                <code>
                  <span className="code-kw">public int</span> <span className="code-fn">maxSubArray</span>(<span className="code-type">int</span>[] nums) &#123;{"\n"}
                  {"  "}<span className="code-type">int</span> maxSum = nums[0];{"\n"}
                  {"  "}<span className="code-type">int</span> currSum = nums[0];{"\n"}
                  {"  "}<span className="code-kw">for</span> (<span className="code-type">int</span> i = 1; i &lt; nums.length; i++) &#123;{"\n"}
                  {"    "}currSum = Math.max(nums[i], currSum + nums[i]);{"\n"}
                  {"    "}maxSum = Math.max(maxSum, currSum);{"\n"}
                  {"  "}&#125;{"\n"}
                  {"  "}<span className="code-kw">return</span> maxSum;{"\n"}
                  &#125;
                </code>
              </pre>
            </div>

            {/* Floating Review Metric Badges */}
            <div className="floating-metric-badge badge-top-right">
              <div className="metric-score-circle">98</div>
              <div>
                <div className="metric-label">AI Score</div>
                <div className="metric-val">Optimal Solution</div>
              </div>
            </div>

            <div className="floating-metric-badge badge-bottom-left">
              <div className="metric-icon-wrap">
                <Zap size={16} />
              </div>
              <div>
                <div className="metric-label">Time Complexity</div>
                <div className="metric-val">O(N) Linear Time</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;