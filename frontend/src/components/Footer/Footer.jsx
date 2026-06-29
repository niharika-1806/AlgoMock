import "./Footer.css";

function Footer() {

    return (

        <footer className="footer">

            <div className="footer-content">

                <div className="footer-brand">

                    <h2>🚀AlgoMock</h2>

                    <p>
                        Preparing students for coding interviews,
                        one mock interview at a time.
                    </p>

                </div>

                <div className="footer-links">

                    <h3>Quick Links</h3>

                    <ul>

                        <li>Features</li>

                        <li>Practice</li>

                        <li>About</li>

                    </ul>

                </div>

                <div className="footer-contact">

                    <h3>Contact</h3>
                    <div className="social-links">

                        <span>🐙</span>

                        <span>💼</span>

                        <span>🐦</span>

                </div>

                    <a href="mailto:support@algomock.ai">
                        support@algomock.ai
                    </a>

                </div>

            </div>

            <div className="footer-bottom">

                © 2026 AlgoMock • Built with React & Spring Boot ❤️
            </div>

        </footer>

    );

}

export default Footer;