import React, { useState } from "react";
import "./SeoForm.css";

function SeoForm() {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [seoSuggestions, setSeoSuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSeoSuggestions(""); 
    setError("");

    try {
      const response = await fetch("http://localhost:5000/analyze_seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, target_keyword: keyword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSeoSuggestions(data.suggestions);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }

    setIsLoading(false);
  };

  return (
    <div className="seo-form-container">
      <h1 className="title">SEO Content Analyzer</h1>
      <form onSubmit={handleSubmit} className="seo-form">
        <label>Enter URL:</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
        <br />
        <label>Enter Target Keyword:</label>
        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} required />
        <br />
        <button type="submit" className="submit-btn">
          {isLoading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      
      {seoSuggestions && !isLoading && (
        <div className="seo-results">
          <h2>SEO Suggestions</h2>
          <div className="seo-content">
            {seoSuggestions.split("\n").map((line, index) => {
              if (line.startsWith("**")) {
                return <h3 key={index} className="seo-heading">{line.replace(/\*\*/g, "")}</h3>;
              } else if (line.startsWith("*")) {
                return <p key={index} className="seo-point">{line.replace(/\*/g, "").trim()}</p>;
              } else {
                return <p key={index}>{line}</p>;
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SeoForm;
