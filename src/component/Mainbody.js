import React, { useState } from "react";

export default function Mainbody() {
  const [DarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!DarkMode);
  };

  const themeClass = DarkMode ? "bg-dark text-light" : "bg-light text-dark";
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);

  // Utility functions
  let uppercase = () => setText(text.toUpperCase());
  let lowerCase = () => setText(text.toLowerCase());
  let clear = () => setText("");
  let changeText = (e) => setText(e.target.value);
  let removeExtraSpaces = () => setText(text.replace(/\s+/g, " ").trim());
  let capitalizeWords = () =>
    setText(
      text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  let reverseText = () => setText(text.split("").reverse().join(""));

  let copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  //download in a text.txt file 
  let downloadTextFile = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "text.txt";
    document.body.appendChild(element);
    element.click();
  };

  let textToSpeech = () => {
    if (text.trim() === "") {
      alert("Please enter text to read aloud!");
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; 
    window.speechSynthesis.speak(utterance);
  };

  // Word count and text statistics
  const countWords = () =>
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const readingTime = () => (countWords() / 200).toFixed(2);
  const wordFrequency = () => {
    let words = text.toLowerCase().split(/\s+/);
    let frequency = {};
    words.forEach((word) => {
      if (word) frequency[word] = frequency[word] ? frequency[word] + 1 : 1;
    });
    return frequency;
  };

  return (
    <div
      className={`container mt-5 p-3 ${themeClass}`}
      style={{ minHeight: "100vh", border: "2px solid blue" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h3>{DarkMode ? "Dark Mode" : "Light Mode"}</h3>
        <button onClick={toggleDarkMode} className="btn btn-secondary">
          {DarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      <div className="main mt-4">
        <input
          type="range"
          min="10"
          max="30"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="form-range"
        />
        <span>Font Size: {fontSize}px</span>

        <textarea
          style={{ fontSize: `${fontSize}px` }}
          value={text}
          onChange={changeText}
          className={`form-control ${themeClass}`}
          rows="6"
        ></textarea>
        <div className="mt-3">
          <button onClick={uppercase} className="btn btn-primary mx-1">
            Uppercase
          </button>
          <button onClick={lowerCase} className="btn btn-primary mx-1">
            Lower Case
          </button>
          <button onClick={clear} className="btn btn-danger mx-1">
            Clear
          </button>
          <button onClick={removeExtraSpaces} className="btn btn-info mx-1">
            Remove Extra Spaces
          </button>
          <button onClick={capitalizeWords} className="btn btn-warning mx-1">
            Capitalize Words
          </button>
          <button onClick={reverseText} className="btn btn-secondary mx-1">
            Reverse Text
          </button>
          <button onClick={copyToClipboard} className="btn btn-success mx-1">
            Copy to Clipboard
          </button>
          <button onClick={downloadTextFile} className="btn btn-secondary mx-1">
            Download Text
          </button>
          <button onClick={textToSpeech} className="btn btn-info mx-1">
            Read Text Aloud
          </button>
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
          <h5>Preview</h5>
          <p>{text.length > 0 ? text : "Nothing to preview"}</p>
        </div>
        <div>
          <h5>Word Frequency:</h5>
          {Object.entries(wordFrequency()).map(([word, count]) => (
            <p key={word}>
              {word}: {count}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
