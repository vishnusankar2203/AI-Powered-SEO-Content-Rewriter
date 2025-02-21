require("dotenv").config();
const express = require("express");
const puppeteer = require("puppeteer");
const axios = require("axios");
const cors = require("cors");

const app = express();

// CORS configuration to allow requests from frontend
const corsOptions = {
  origin: "http://localhost:3000", 
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
};
app.use(cors(corsOptions));

app.use(express.json()); // Middleware to parse JSON requests

// Load API Key from Environment Variables
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Google Gemini API Key is missing. Set it in the .env file.");
  process.exit(1);
}

// Function to extract page content using Puppeteer
async function extractPageContent(url) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    
    const content = await page.evaluate(() => document.body.innerText);
    
    return content;
  } catch (error) {
    console.error("Error extracting page content:", error);
    return "Could not extract content from the webpage.";
  } finally {
    if (browser) await browser.close();
  }
}

// SEO Analysis Function (Google Gemini API)
async function seoAnalysis(content, targetKeyword) {
  if (!content.trim()) {
    content = "This is a sample webpage discussing various topics.";
  }

  const prompt = `
  You are an SEO expert. Analyze the webpage content below and provide a structured SEO analysis for the keyword '${targetKeyword}'.

  ### Page Content:
  ${content}

  ### Instructions:
  - The analysis should be **structured** with **clear bullet points** for each key area.
  - Cover the following aspects:
    - **Title Optimization**
    - **Keyword Placement**
    - **Meta Description**
    - **Header Structure (H1, H2, etc.)**
    - **Readability & Content Quality**
    - **Technical SEO (Page Speed, Mobile Optimization)**
  - Provide **actionable suggestions** for each point.
  - Write it in a **clear and professional SEO report style**.

  ### Example Output:
  - **Title Optimization**: The title does not effectively use the keyword '${targetKeyword}'. A more engaging title would be: "Discover the Best Strategies for '${targetKeyword}' in 2024."
  - **Keyword Placement**: The keyword appears only twice in the content. Ideally, it should be used in the first 100 words, H1 tags, and throughout the content naturally.
  - **Meta Description**: The meta description should include '${targetKeyword}' in a natural and compelling way to improve click-through rates.
  - **Header Structure**: H1 and H2 tags should include the keyword to enhance on-page SEO.
  - **Readability**: Sentences are too complex. Simplify them for better user experience.
  - **Technical SEO**: Improve page speed by optimizing images and minifying CSS/JS.
  `;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    if (response.data && response.data.candidates) {
      return response.data.candidates[0]?.content?.parts[0]?.text || "No response from AI.";
    } else {
      return "Invalid response from Gemini API.";
    }
  } catch (error) {
    console.error("Error with Gemini API:", error.response?.data || error.message);
    return "There was an error generating SEO suggestions.";
  }
}

// POST route to handle SEO analysis
app.post("/analyze_seo", async (req, res) => {
  const { url, target_keyword } = req.body;

  if (!url || !target_keyword) {
    return res.status(400).json({ error: "URL and target keyword are required." });
  }

  try {
    const pageContent = await extractPageContent(url);
    const seoSuggestions = await seoAnalysis(pageContent, target_keyword);

    res.json({ suggestions: seoSuggestions });
  } catch (error) {
    console.error("Error processing SEO analysis:", error);
    res.status(500).json({ error: "Error analyzing the URL." });
  }
});

// Start the Express server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
