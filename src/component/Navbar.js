import { Link, useLocation } from 'react-router-dom';
import { currentVersion } from './Version';
import '../App.css';
import React, { useState } from 'react';

function Navbar() {
    const location = useLocation();
    const [copySuccess, setCopySuccess] = useState(false);

    const shareOnSocialMedia = (platform) => {
        const url = "https://soumydip.github.io/textmuster.github.io/";
        const title = "Text Muster - Share and Edit Text Easily"; 
        const description = "Edit and share text snippets quickly and easily with Text Muster!";
        let shareUrl = "";

        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(
                    title + " - " + description
                )}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/share?url=${url}&text=${encodeURIComponent(
                    title + " - " + description
                )}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/shareArticle?url=${url}&title=${encodeURIComponent(
                    title
                )}&summary=${encodeURIComponent(description)}`;
                break;
            case "whatsapp":
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
                    title + " - " + description + " " + url
                )}`;
                break;
            default:
                break;
        }
        window.open(shareUrl, "_blank");
    };

    const copyLink = () => {
        navigator.clipboard.writeText("https://soumydip.github.io/textmuster.github.io/");
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid NavberMain">
                <Link className="navbar-brand" to="/" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                    Text Muster
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/version-history" ? "active" : ""}`} to="/version-history">
                                Version History
                            </Link>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link version-pill">
                                <i className="fas fa-tag"></i> Version: <span className="badge rounded-pill bg-primary">{currentVersion}</span>
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Social Media Icons */}
                <div className="d-flex align-items-center social">
                    <button className="btn btn-link" onClick={() => shareOnSocialMedia("facebook")}>
                        <i className="fab fa-facebook" style={{ color: "blue" }}></i>
                    </button>
                    <button className="btn btn-link" onClick={() => shareOnSocialMedia("twitter")}>
                        <i className="fab fa-twitter" style={{ color: "aqua" }}></i>
                    </button>
                    <button className="btn btn-link" onClick={() => shareOnSocialMedia("linkedin")}>
                        <i className="fab fa-linkedin" style={{ color: "blue" }}></i>
                    </button>
                    <button className="btn btn-link" onClick={() => shareOnSocialMedia("whatsapp")}>
                        <i className="fab fa-whatsapp" style={{ color: "green" }}></i>
                    </button>

                    {/* Copy Link Button */}
                    <button className="btn btn-outline-secondary btn-sm ms-2 copyText" onClick={copyLink}>
                        {copySuccess ? "Copied!" : "Copy"}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
