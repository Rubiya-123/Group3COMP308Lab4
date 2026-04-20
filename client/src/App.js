import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generateNotes = async () => {
    if (!text.trim()) {
      setError("Please enter some text first.");
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const res = await axios.post("http://localhost:5000/api/generate", {
        text,
      });
      setNotes(res.data.result);
    } catch (err) {
      console.error("Frontend error:", err);
      console.error("Backend response data:", err.response?.data);
      console.error("Backend response status:", err.response?.status);
      console.error("Backend response headers:", err.response?.headers);

      const message = err.response?.data?.error || "";

      if (message.toLowerCase().includes("quota")) {
        setError("API quota has been reached. Please wait a minute and try again.");
      } else if (message.toLowerCase().includes("unavailable")) {
        setError("The AI model is busy right now. Please try again shortly.");
      } else {
        setError("Something went wrong while generating notes. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setNotes("");
    setError("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!notes) return;

    try {
      await navigator.clipboard.writeText(notes);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy error:", err);
      setError("Failed to copy notes.");
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">AI Smart Notes</h1>
      <p className="subtitle">
        Paste your lecture notes, article, or study material and generate a
        clear summary instantly.
      </p>

      <div className="grid">
        <div className="card">
          <h2>Input Text</h2>

          <textarea
            className="textarea"
            placeholder="Paste your lecture, article, or notes here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />

          <div className="input-meta">
            <span>{text.length} characters</span>
          </div>

          <div className="button-group">
            <button
              className="btn"
              onClick={generateNotes}
              disabled={loading || !text.trim()}
            >
              {loading ? "Generating..." : "Generate Notes"}
            </button>

            <button
              className="btn secondary-btn"
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="card">
          <div className="output-header">
            <h2>Generated Notes</h2>
            {notes && !loading && (
              <button className="btn secondary-btn small-btn" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy Notes"}
              </button>
            )}
          </div>

          {loading ? (
            <div className="loading">Generating study notes...</div>
          ) : notes ? (
            <pre className="output">{notes}</pre>
          ) : (
            <div className="empty-state">
              Your generated notes will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;