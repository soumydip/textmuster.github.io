import React, { useState, useRef } from "react";

export default function Mainbody() {
  const [DarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!DarkMode);
  };

  const themeClass = DarkMode ? "bg-dark text-light" : "bg-light text-dark";
  const [text, setText] = useState("");
  const [fontStyle, setFontStyle] = useState("Arial");
  const [fontSize, setFontSize] = useState(16);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
 
  // Text manipulation functions
  const uppercase = () => setText(text.toUpperCase());
  const lowerCase = () => setText(text.toLowerCase());
  const clear = () => setText("");
  const changeText = (e) => setText(e.target.value);
  const removeExtraSpaces = () => setText(text.replace(/\s+/g, " ").trim());
  const capitalizeWords = () =>
    setText(
      text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  const copyToClipboard = () => {
    //for error hendaling
    if (text.length <= 0) {
      alert("plese enter some text to copyToClipboard");
    } else {
      navigator.clipboard
        .writeText(text)
        .then(() => alert("Text copied to clipboard!"))
        .catch(() => alert("Failed to copy text."));
    }
  };

  const downloadTextFile = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "application/msword" });
    element.href = URL.createObjectURL(file);
    element.download = "text.doc";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Speech synthesis functions
  const startSpeaking = () => {
    if (text.trim() === "") {
      alert("Please enter text to read aloud!");
      return;
    }
    if (synthRef.current.speaking) {
      alert("Already speaking!");
      return;
    }

    // Create a new SpeechSynthesisUtterance for English
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.lang = "en-US"; // Set language to English

    // Track the word boundary and highlight the current word
    utteranceRef.current.onboundary = (event) => {
      if (event.name === "word") {
        const index = text.slice(0, event.charIndex).split(/\s+/).length - 1;
        setCurrentIndex(index);
      }
    };

    utteranceRef.current.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentIndex(-1);
    };

    synthRef.current.speak(utteranceRef.current);
    setIsSpeaking(true);
  };

  const togglePausePlay = () => {
    if (synthRef.current.speaking && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
    } else if (synthRef.current.paused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentIndex(-1);
    }
  };

  const countWords = () =>
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const readingTime = () => (countWords() / 200).toFixed(2);

  const renderHighlightedText = () => {
    const words = text.split(/\s+/);
    return words.map((word, index) => (
      <span
        key={index}
        style={index === currentIndex ? { backgroundColor: "aqua" } : {}}
      >
        {word}{" "}
      </span>
    ));
  };

  return (
    <div className={`container p-3 ${themeClass}`}>
      <div className="d-flex justify-content-between align-items-center">
        <p style={{ fontSize: "25px", fontStyle: "italic" }}>
          {DarkMode ? "Dark Mode" : "Light Mode"}
        </p>
        <button
          onClick={toggleDarkMode}
          className="btn btn-secondary"
          style={{ width: "120px", fontSize: "15px" }}
        >
          {DarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div>
          <label htmlFor="fontSizeSelect" className="form-label">
            Select Font Size:
          </label>
          <select
            id="fontSizeSelect"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="form-select"
            style={{ marginBottom: "20px", width: "auto" }}
          >
            {Array.from({ length: 21 }, (_, i) => i + 10).map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fontStyleSelect" className="form-label">
            Select Font Style:
          </label>
          <select
            id="fontStyleSelect"
            value={fontStyle}
            onChange={(e) => setFontStyle(e.target.value)}
            className="form-select text-truncate"
            style={{ marginBottom: "20px", width: "100px" }}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
            <option value="Tahoma">Tahoma</option>
          </select>
        </div>
      </div>
      <div className="main mt-4">
        <textarea
          value={text}
          onChange={changeText}
          className={`form-control ${themeClass}`}
          rows="6"
          style={{ fontSize: `${fontSize}px`, fontFamily: fontStyle }}
        ></textarea>
        <div className="row mt-3">
          <div className="col-6 col-md-3 col-lg mb-2 custom-grid">
            <button
              onClick={uppercase}
              className="btn btn-primary w-100 h-100 text-truncate"
            >
              Uppercase
            </button>
          </div>
          <div className="col-6 col-md-3 col-lg mb-2">
            <button
              onClick={lowerCase}
              className="btn btn-primary w-100 h-100 text-truncate"
            >
              Lower Case
            </button>
          </div>
          <div className="col-6 col-md-3 col-lg mb-2">
            <button
              onClick={clear}
              className="btn btn-danger w-100 h-100 text-truncate"
            >
              Clear
            </button>
          </div>
          <div className="col-6 col-md-3 col-lg mb-2">
            <button
              onClick={removeExtraSpaces}
              className="btn btn-info w-100 h-100 text-truncate"
            >
              Remove Extra Spaces
            </button>
          </div>
          <div className="col-6 col-md-3 col-lg mb-2">
            <button
              onClick={capitalizeWords}
              className="btn btn-warning w-100 h-100 text-truncate"
            >
              Capitalize Words
            </button>
          </div>
          <div className="col-6 col-md-3 col-lg mb-2">
            <button
              onClick={copyToClipboard}
              className="btn btn-success w-100 h-100 text-truncate"
            >
              Copy to Clipboard
            </button>
          </div>
          <div className="col-6 col-md-3 col-lg mb-2">
            <button
              onClick={downloadTextFile}
              className="btn btn-secondary w-100 h-100 text-truncate"
            >
              Download Text
            </button>
          </div>
          <div className="col-6 col-md-3 col-lg mb-2">
            <button
              onClick={isSpeaking ? stopSpeaking : startSpeaking}
              className="btn btn-info w-100 h-100"
            >
              {isSpeaking ? "Stop Speaking" : "Start Speaking"}
            </button>
          </div>
          <div className="col-6 col-md-3 col-lg mb-2">
            <button
              onClick={togglePausePlay}
              className="btn btn-warning w-100 h-100"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          </div>
          
        </div>
        <div className="mt-3">
          <p>
            <strong>Text Length:</strong> {text.length} characters
          </p>
          <p>
            <strong>Word Count:</strong> {countWords()} words
          </p>
          <p>
            <strong>Estimated Reading Time:</strong> {readingTime()} minutes
          </p>
        </div>

        <div className="mt-3">
          <h5>Highlighted Text:</h5>
          <div>{renderHighlightedText()}</div>
        </div>
      </div>
    </div>
  );
}
