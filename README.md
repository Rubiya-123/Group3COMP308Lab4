# AI Smart Notes

## Course
COMP-308 Emerging Technologies  
Group 3 Assignment #4

## Project Overview
AI Smart Notes is a full-stack web application that converts raw study material into structured and easy-to-review notes using a Large Language Model (LLM).

This project works as a custom **LLM wrapper**. Instead of letting users interact with the AI model directly, the application provides a simple interface and uses a strict backend system prompt to control the output format and purpose.

## Purpose
The purpose of this app is to help students quickly turn lecture notes, articles, or textbook content into concise study notes.

The generated output is organized into:
- Summary
- Key Points
- Important Terms

## Features
- Paste raw lecture notes, article text, or study material
- Generate structured AI-powered study notes
- Loading state while waiting for the response
- Copy generated notes with one click
- Clear input and output easily
- Character count for the input field
- Secure backend API with hidden Gemini API key

## Tech Stack
**Frontend**
- React.js
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- CORS
- dotenv

**AI Model**
- Google Gemini API

## How the Application Works
1. The user pastes raw study content into the input text area.
2. The React frontend sends the text to the backend through a POST request.
3. The Node.js/Express backend combines the input with a strict system prompt.
4. The backend sends the final prompt to the Gemini API.
5. The Gemini API returns structured study notes.
6. The frontend displays the generated notes in the output panel.

## Setup and Run the Project
1. Clone the repository and open the project folder.
2. Go to the `server` folder and install dependencies.
3. Create a `.env` file inside the `server` folder.
4. Add your API key in this format:

`
GEMINI_API_KEY=your_actual_api_key_here
`

5. Start the backend server from the `server` folder. Run `npm install`, then run `node server.js`.
6. Open a new terminal, go to the `client` folder, and install dependencies. Run `npm install`, then run `npm start`.
8. The backend runs on `http://localhost:5000` and the frontend runs on `http://localhost:3000`.


## System Prompt
The backend uses the following exact system prompt:

`
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
`

## Security
The Gemini API key is stored in the backend `.env` file and is never exposed in the React frontend.

## Notes
- The app currently supports plain text input only.
- Free-tier Gemini usage may sometimes hit temporary quota or availability limits.