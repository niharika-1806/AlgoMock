import { Code2, Mail, Heart } from "lucide-react";
import "./Footer.css";

function Footer() {

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">

                    <div className="footer-brand">
                        <div className="footer-logo">
                            <div className="footer-logo-icon">
                                <Code2 size={20} />
                            </div>
                            <span>Algo<span>Mock</span></span>
                        </div>

                        <p className="footer-desc">
                            The premier AI-powered placement and technical interview preparation platform.
                            Built for ambitious developers.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4>Platform</h4>
                        <ul>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#how-it-works">How It Works</a></li>
                            <li><a href="/signup">Create Account</a></li>
                            <li><a href="/login">Sign In</a></li>
                            <li><a href="/admin">Admin Portal</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Preparation</h4>
                        <ul>
                            <li><a href="/login">Mock Interviews</a></li>
                            <li><a href="/login">Code Review</a></li>
                            <li><a href="#practice">DSA Patterns</a></li>
                            <li><a href="#practice">Interview Guides</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4>Connect</h4>
                        <div className="social-links">
                            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect width="4" height="12" x="2" y="9" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                </svg>
                            </a>
                        </div>
                        <a href="mailto:support@algomock.ai" className="footer-email">
                            <Mail size={15} />
                            <span>support@algomock.ai</span>
                        </a>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>© 2026 AlgoMock. All rights reserved.</p>
                    <p className="footer-credit">
                        Crafted with <Heart size={14} className="heart-icon" /> for the engineering community.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
