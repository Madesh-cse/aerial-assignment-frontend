## 🚁 AI Drone Surveillance Dashboard (Frontend)

A real-time surveillance dashboard that visualizes incidents, AI analysis, and autonomous drone patrol with alert-based interactions.

## 📦 Tech Stack

⚛️ React + TypeScript
🎨 Tailwind CSS
🎬 Framer Motion
🌐 REST API integration

-------------------------------------------------------------------------------------------
## 🚀 Features

-📊 Incident Timeline (dynamic data)
-🗺️ Site Map visualization
-🚁 Autonomous Drone Patrol System
-🤖 AI-based incident analysis
-🔴 Alert highlighting (danger zones)
-🔊 Audio alert when drone reaches incident
-⏸ Drone pauses at alert location
-🔁 Auto-resume patrol
----------------------------------------------------------------------------------------------------
## 🛠️ Setup Instructions

1️⃣ Clone the repository
git clone https://github.com/your-username/your-project.git
cd your-project/frontend

2️⃣ Install dependencies
npm install

3️⃣ Add environment variable
Create a .env file in root:

VITE_API_URL=http://localhost:5000

4️⃣ Add alert sound
Place your sound file here:
/public/alert.mp3
👉 This is required for alert audio system

5️⃣ Start development server
npm run dev

6️⃣ Open in browser
http://localhost:5173

🔌 Backend Requirement

Make sure backend is running:

http://localhost:5000/api/investigate

🧪 How to Test
Open the app
Click anywhere once (to enable audio)
Wait for AI response


Observe:
🔴 Alert location highlighted
🚁 Drone patrol movement
⏸ Drone pauses at alert
🔊 Sound plays once
