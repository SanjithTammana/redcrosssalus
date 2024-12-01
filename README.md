Salus: A Web-Based CPR and First Aid Training Platform

Overview

Salus is a web-based application designed to enhance CPR preparedness and first aid education. As a 2024 project entry for the American Red Cross Hackathon, it aims to empower individuals with the knowledge and tools to act confidently in emergencies. Combining interactive features with Red Cross-aligned guidelines, Salus serves as both a learning tool and a quick-response assistant.

The platform offers two distinct modes:
	1.	Practice Mode: Aimed at providing educational resources and step-by-step first aid guidance.
	2.	Emergency Mode: Designed to assist in real-time emergencies, gathering patient details and offering immediate instructions while encouraging users to call 911 when necessary.

Built with cutting-edge technologies like Next.js, OpenAI Whisper API, and Groq API, Salus is mobile-friendly, scalable, and accessible to diverse user groups.

Features

1. Two Interactive Modes

	•	Practice Mode:
		•	Provides step-by-step CPR and first aid training.
		•	Features Red Cross-approved guidelines, quizzes, and progress tracking.
		•	Includes a user-friendly interface for learning at your own pace.
	•	Emergency Mode:
		•	Gathers critical patient information (e.g., age, weight, medications, allergies).
		•	Offers real-time guidance for life-saving techniques, such as CPR.
		•	Advises users to call 911 and provides additional support where applicable.

2. Accessibility and Scalability

	•	Mobile-friendly design ensures usability across devices.
	•	Scalable architecture allows easy integration of new features or resources.
	•	Designed to adapt to diverse CPR scenarios and first aid requirements.

3. Educational Resources

	•	Integrates Red Cross-approved resources and videos.
	•	Offers quick quizzes to reinforce learning.
	•	Tracks user progress to encourage continued engagement.

4. Alignment with Red Cross Mission

	•	Promotes disaster preparedness and life-saving education.
	•	Provides tools to empower individuals to act confidently during emergencies.

Technology Stack

	•	Frontend: Built with React and Next.js for a responsive, interactive user interface.
	•	Backend: Utilizes Groq API for chatbot responses.
	•	Styling: Customized with Material-UI for a clean and intuitive design.
	•	Hosting: Deployed on Vercel for scalability and reliability.
	•	Data Handling: Efficiently manages user inputs and histories for seamless interaction.

How It Works

Practice Mode:

	1.	Users can ask questions about first aid or CPR techniques.
	2.	The chatbot provides Red Cross-aligned step-by-step guidance.
	3.	Interactive quizzes and resources are available for self-paced learning.

Emergency Mode:

	1.	Users are prompted to provide patient details (age, weight, sex, etc.).
	2.	The chatbot delivers immediate instructions for life-saving actions.
	3.	Encourages users to call 911 in critical situations.

Getting Started

Prerequisites

	•	Node.js (v16 or higher)
	•	npm or yarn package manager
	•	Environment variables set for API keys:
	•	GROQ_API_KEY (for Groq API)

Installation

	1.	Clone the repository:

git clone https://github.com/yourusername/salus.git
cd salus


	2.	Install dependencies:

npm install


	3.	Create a .env.local file and add your API keys:

GROQ_API_KEY=your-groq-api-key
OPENAI_API_KEY=your-openai-api-key


	4.	Start the development server:

npm run dev


	5.	Access the application at http://localhost:3000.

Usage

	1.	Select a Mode: Choose between Practice Mode and Emergency Mode using the toggle at the top of the interface.
	2.	Interact with the Chatbot:
		•	In Practice Mode: Ask questions about CPR or first aid.
		•	In Emergency Mode: Provide patient details and follow actionable instructions.
	3.	Explore Resources:
		•	Access integrated quizzes, Red Cross-approved guides, and videos.
		•	Track your progress in Practice Mode to improve your skills.

Contributing

We welcome contributions to enhance Salus! Follow these steps:
	1.	Fork the repository and create a new branch:

git checkout -b feature/your-feature-name


	2.	Commit your changes and push them to your fork:

git push origin feature/your-feature-name


	3.	Submit a pull request describing your changes.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

	•	American Red Cross: For inspiring this project and providing invaluable resources on CPR and disaster preparedness.
	•	Groq: For their APIs, which power the chatbot and voice interaction features.

### Owners
- [Suhrit Revuri](https://github.com/SuhritRevuri)
- [Sanjith Tammana](https://github.com/SanjithTammana)



