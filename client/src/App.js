import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const generateNotes = async () => {
    setLoading(true);
    setNotes("");

    try {
      const res = await axios.post("http://localhost:5000/api/generate", {
        text,
      });
      setNotes(res.data.result);
    } catch (err) {
      setNotes("Error generating notes");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="title">AI Smart Notes</h1>

      <div className="grid">
        {/* INPUT */}
        <div className="card">
          <h2>Input Text</h2>

          <textarea
            className="textarea"
            placeholder="Paste your lecture, article, or notes here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button className="btn" onClick={generateNotes}>
            Generate Notes
          </button>
        </div>

        {/* OUTPUT */}
        <div className="card">
          <h2>Generated Notes</h2>

          {loading ? (
            <div className="loading">Thinking...</div>
          ) : (
            <pre className="output">{notes}</pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;