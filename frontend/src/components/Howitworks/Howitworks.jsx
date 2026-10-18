import "./HowItWorks.css";

function HowItWorks() {

    const steps = [
        {
            number: "1️⃣",
            title: "Paste Your Code",
            description: "Paste your coding solution or choose a practice problem."
        },
        {
            number: "2️⃣",
            title: "AI Reviews It",
            description: "Receive detailed feedback, improvements and optimization tips."
        },
        {
            number: "3️⃣",
            title: "Improve & Retry",
            description: "Fix your mistakes and continue improving your interview skills."
        }
    ];

    return (

        <section className="how-it-works">

            <h2>How It Works</h2>

            <p className="section-subtitle">
                Prepare for coding interviews in three simple steps.
            </p>

            <div className="steps-container">

                {
                    steps.map((step) => (

                        <div
                            className="step-card"
                            key={step.number}
                        >

                            <div className="step-number">
                                {step.number}
                            </div>

                            <h3>{step.title}</h3>

                            <p>{step.description}</p>

                        </div>

                    ))
                }

            </div>

        </section>

    );

}

export default HowItWorks;