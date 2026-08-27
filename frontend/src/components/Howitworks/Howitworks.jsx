import { useState } from "react";
import { Code2, Cpu, Sparkles, CheckCircle2, Zap, ArrowRight, Terminal, Layers, TrendingUp, ShieldCheck } from "lucide-react";
import "./Howitworks.css";

function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            number: "01",
            tag: "STEP 01 • INPUT",
            title: "Submit Code or Choose Topic",
            description: "Paste your algorithmic solution in any language or select a target DSA domain like Trees, Dynamic Programming, or Graphs for a simulated round.",
            icon: Code2,
            previewType: "code",
            accentColor: "#2563EB"
        },
        {
            number: "02",
            tag: "STEP 02 • ANALYSIS",
            title: "Real-Time AI Deep Analysis",
            description: "Our dual-engine AI scans syntax, edge cases, data structure trade-offs, and verifies strict Big-O time and space runtime complexity.",
            icon: Cpu,
            previewType: "analysis",
            accentColor: "#7C3AED"
        },
        {
            number: "03",
            tag: "STEP 03 • MASTERY",
            title: "Actionable Scoring & Feedback",
            description: "Get graded against FAANG standards with quantified scorecards, interviewer critique, strengths, and prioritized optimization roadmaps.",
            icon: Sparkles,
            previewType: "scorecard",
            accentColor: "#059669"
        }
    ];

    return (
        <section className="how-it-works-section" id="how-it-works">
            <div className="how-it-works-wrapper">

                {/* Header */}
                <div className="how-header-center">
                    <div className="workflow-badge">
                        <Sparkles size={13} />
                        <span>Streamlined 3-Step Pipeline</span>
                    </div>
                    <h2>How AlgoMock Elevates Your Preparation</h2>
                    <p className="workflow-subheading">
                        From initial draft to high-scoring interview solution in seconds. Experience an intelligent feedback loop that simulates real technical interview rounds.
                    </p>
                </div>

                {/* Connecting Step Grid */}
                <div className="workflow-grid-container">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = activeStep === idx;

                        return (
                            <div
                                key={step.number}
                                className={`workflow-card ${isActive ? "active-card" : ""}`}
                                onMouseEnter={() => setActiveStep(idx)}
                            >
                                {/* Step Top Header */}
                                <div className="workflow-card-header">
                                    <div className="workflow-icon-box">
                                        <Icon size={22} />
                                    </div>
                                    <span className="step-tag-pill">{step.tag}</span>
                                </div>

                                {/* Step Title & Description */}
                                <h3 className="workflow-card-title">{step.title}</h3>
                                <p className="workflow-card-desc">{step.description}</p>

                                {/* Visual Mockup Preview */}
                                <div className="step-preview-box">
                                    {step.previewType === "code" && (
                                        <div className="preview-code-mockup">
                                            <div className="mockup-header-dots">
                                                <span className="dot red"></span>
                                                <span className="dot yellow"></span>
                                                <span className="dot green"></span>
                                                <span className="mockup-lang">Solution.py</span>
                                            </div>
                                            <div className="mockup-code-lines">
                                                <p><span className="code-kw">def</span> <span className="code-fn">maxSubArray</span>(nums):</p>
                                                <p>&nbsp;&nbsp;max_so_far = nums[<span className="code-num">0</span>]</p>
                                                <p>&nbsp;&nbsp;curr = <span className="code-num">0</span></p>
                                                <p>&nbsp;&nbsp;<span className="code-kw">for</span> x <span className="code-kw">in</span> nums: ...</p>
                                            </div>
                                            <div className="mockup-tags-row">
                                                <span className="mini-tag blue">Arrays</span>
                                                <span className="mini-tag purple">Kadane's Algo</span>
                                                <span className="mini-tag green">Python 3</span>
                                            </div>
                                        </div>
                                    )}

                                    {step.previewType === "analysis" && (
                                        <div className="preview-analysis-mockup">
                                            <div className="analysis-metric-row">
                                                <div className="metric-info">
                                                    <span>Correctness</span>
                                                    <span className="metric-val text-green">100% Pass</span>
                                                </div>
                                                <div className="mini-progress-bar">
                                                    <div className="progress-fill green-fill" style={{ width: "100%" }}></div>
                                                </div>
                                            </div>

                                            <div className="analysis-metric-row">
                                                <div className="metric-info">
                                                    <span>Time Complexity</span>
                                                    <span className="metric-val text-blue">O(N) Linear</span>
                                                </div>
                                                <div className="mini-progress-bar">
                                                    <div className="progress-fill blue-fill" style={{ width: "90%" }}></div>
                                                </div>
                                            </div>

                                            <div className="analysis-badge-pill">
                                                <CheckCircle2 size={13} className="text-green" />
                                                <span>14/14 Edge Cases Verified</span>
                                            </div>
                                        </div>
                                    )}

                                    {step.previewType === "scorecard" && (
                                        <div className="preview-scorecard-mockup">
                                            <div className="scorecard-top-row">
                                                <div className="mini-score-circle">
                                                    <span className="score-main">96</span>
                                                    <span className="score-sub">/100</span>
                                                </div>
                                                <div className="score-verdict">
                                                    <span className="verdict-label">EVALUATION RATING</span>
                                                    <span className="verdict-rank">FAANG Ready</span>
                                                </div>
                                            </div>

                                            <div className="score-insights-list">
                                                <div className="insight-item green-item">
                                                    <CheckCircle2 size={13} />
                                                    <span>Optimal single-pass space trade-off</span>
                                                </div>
                                                <div className="insight-item amber-item">
                                                    <Zap size={13} />
                                                    <span>Added boundary guards for empty array</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Step Index Watermark */}
                                <div className="card-number-watermark">{step.number}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Workflow Benefits Bottom Banner */}
                <div className="workflow-trust-banner">
                    <div className="trust-item">
                        <Zap size={18} className="trust-icon text-amber" />
                        <div>
                            <strong>Instantaneous Feedback</strong>
                            <span>Sub-3-second AI structural response</span>
                        </div>
                    </div>
                    <div className="trust-divider"></div>
                    <div className="trust-item">
                        <Layers size={18} className="trust-icon text-blue" />
                        <div>
                            <strong>50+ Algorithmic Patterns</strong>
                            <span>Comprehensive Big-O diagnostic coverage</span>
                        </div>
                    </div>
                    <div className="trust-divider"></div>
                    <div className="trust-item">
                        <ShieldCheck size={18} className="trust-icon text-green" />
                        <div>
                            <strong>Interview Calibrated</strong>
                            <span>Tested against top technical rubrics</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default HowItWorks;
