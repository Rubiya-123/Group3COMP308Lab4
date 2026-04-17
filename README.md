AI Smart Notes Generator

**Project Overview**

AI Smart Notes Generator is a full-stack web application that transforms raw text (lecture notes, articles, or study material) into structured, easy-to-study notes using a Large Language Model (LLM).

The system acts as a custom LLM wrapper, where users interact with a simple UI while the backend controls the AI behavior using a strict system prompt.

Features
Convert long text into structured study notes
AI-generated:
Summary
Key Points
Important Terms
Loading state while generating responses
Secure backend API (no exposed API keys)
Fast and responsive React frontend

**Tech Stack**

Frontend:
React.js
Axios
CSS

Backend:
Node.js
Express.js
Google Gemini API
AI Model:
Google Gemini 2.5 Flash

**Setup Instructions**
1. Clone the repository
git clone <your-repo-link>
cd SmartNotes

2. Backend Setup
cd server
npm install

3. Create a .env file:
GEMINI_API_KEY=your_api_key_here

4.Run backend:
node server.js
Server runs on:
http://localhost:5000

5.Frontend Setup
cd client
npm install
npm start

Frontend runs on:

http://localhost:3000

**Application Screenshots:**
<img width="1280" height="590" alt="1" src="https://github.com/user-attachments/assets/f17bd607-6ce1-453e-9dae-06abc05542dc" />

<img width="1277" height="539" alt="2" src="https://github.com/user-attachments/assets/b237e625-923b-4ae3-a40f-6bb4cf5e6968" />


**System Prompt (Prompt Engineering)**

The backend uses the following system prompt to control the LLM output:

You are an AI study assistant.

Your task is to convert raw text into structured study notes.

Rules:
- Output ONLY in this format:

Summary:
- ...

Key Points:
- ...
- ...

Important Terms:
- Term: Definition

- Keep it concise and easy to study
- Do NOT add extra commentary
- Do NOT change format
