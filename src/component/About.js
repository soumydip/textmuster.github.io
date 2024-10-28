import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="container mt-5 about-container">
      <div className="row text-center mb-4">
        <div className="col">
          <h1 className="display-4 fw-bold">About Me</h1>
          <p className="lead about-description">
            I am a passionate developer skilled in HTML, CSS, JavaScript, React,
            and the MERN stack. I love building web applications that enhance
            user experience and creativity.
          </p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col">
          <h2 className="text-center mb-4">Key Features of My Application</h2>
          <ul className="list-unstyled features-list">
            <li className="mb-3">
              <i className="fas fa-text-height feature-icon"></i>{" "}
              <strong>Text Transformation:</strong> Uppercase, lowercase, and
              capitalized text options.
            </li>
            <li className="mb-3">
              <i className="fas fa-copy feature-icon"></i>{" "}
              <strong>Copy & Download:</strong> Quickly copy text to the
              clipboard or download it as a file.
            </li>
            <li className="mb-3">
              <i className="fas fa-volume-up feature-icon"></i>{" "}
              <strong>Text-to-Speech:</strong> Listen to text with live word
              tracking.
            </li>
            <li className="mb-3">
              <i className="fas fa-eraser feature-icon"></i>{" "}
              <strong>Space Management:</strong> Remove extra spaces for cleaner
              text.
            </li>
            <li className="mb-3">
              <i className="fas fa-chart-bar feature-icon"></i>{" "}
              <strong>Word & Character Count:</strong> Get word count, character
              count, and reading time.
            </li>
            <li className="mb-3">
              <i className="fas fa-eye feature-icon"></i>{" "}
              <strong>Preview & Edit:</strong> See a live preview of text
              changes in real-time.
            </li>
            <li className="mb-3">
              <i className="fas fa-trash feature-icon"></i>{" "}
              <strong>Clear Text:</strong> Clear all input with a single click.
            </li>
          </ul>
        </div>
      </div>

      <div className="row text-center mb-5">
        <div className="col">
          <h3 className="fw-bold">Contact Me</h3>
          <p>For questions or collaboration, feel free to reach out!</p>
          <p>
            <i className="fas fa-envelope"></i> Email:{" "}
            <a href="mailto:xyz@gmail.com">xyz@gmail.com</a>
          </p>
          <p>
            <i className="fas fa-phone"></i> Phone: +123-456-7890
          </p>
        </div>
      </div>

      <div className="row text-center">
        <div className="col">
          <h3 className="fw-bold">Follow Me</h3>
          <p>Connect on these platforms:</p>
          <a
            href="https://www.instagram.com/soumyadip2912"
            className="me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram fa-2x social-icon"></i>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100073031764111&mibextid=ZbWKwL"
            className="me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook fa-2x social-icon"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/soumyadip-maity-183ba3310"
            className="me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin fa-2x social-icon"></i>
          </a>
          <a
            href="https://github.com/soumydip"
            className="me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github fa-2x social-icon"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
