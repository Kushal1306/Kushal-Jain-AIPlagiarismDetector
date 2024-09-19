# Plagiarism Detector

This project is a real-time plagiarism detection tool powered by AI. It allows users to upload documents and receive detailed reports on plagiarism, including suggestions for improving content originality.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Multer for file uploads
- **AI Integration**:  Winston AI for Plagiarism Detection & OpenAI's GPT-4o-mini for generating suggestions
- **File Processing**: pdf-parse and mammoth for extracting text from documents

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone https://github.com/yourusername/plagiarism-detector.git
cd plagiarism-detector
```

### Install Dependencies

Navigate to both the `client` and `server` directories and install the required dependencies:

```bash
cd client
npm install
cd ../server
npm install
```

### Set Up Environment Variables

Create a `.env` file in the `server` directory and add the following variables:

OPENAI_API_KEY=your_openai_api_key

WINSTON_API_TOKEN=your_winston_api_token
