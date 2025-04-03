# Glycocare 
This is the backend for Glycocare, a personalized health management platform for diabetic patients. It provides APIs for user authentication, health data storage, chatbot responses, and caregiver communication.

## Features
- **Blood Sugar Logging**: Store and retrieve blood glucose data.
- **AI Chatbot**: Integrated with DeepSeek model for medical queries.
- **Dietary & Medication Recommendations**: AI-driven suggestions based on user health data.

## Tech Stack

- **Node.js & Express.js** - Backend framework
- **MySQL** - Relational database
- **DeepSeek Model** - AI chatbot for medical queries
- **Multer** - Handling file uploads (e.g., prescription images)
- **Cors** - Security enhancements

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/GauthamSrini/GlycoCare-Backend.git
   cd GlycoCare-Backend
2. Install dependencies:
   ```sh
   npm install
3. Set up environment variables (.env file):
   ```sh
   DEV_PORT=5000
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
4. Start the server
   ```sh
   node src/server.js
5. The backend will be running at http://localhost:5000.

6. open up the cmd and run the DeepSeek Model R1
   ```sh
   ollama run deepseek-r1
   ollama serve
7. DeepSeek Model will be Running locally at http://127.0.0.1:11434/api/chat

8. The Server and the Deepseek Model is Now Ready You can explore.