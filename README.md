# RepoDocGen — Frontend

The frontend interface for **RepoDocGen**, a web application that automatically generates comprehensive, beautiful documentation for GitHub repositories using AI.

## 🚀 Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Routing:** React Router v7
- **Markdown:** React Markdown

## ✨ Features

- **Modern Minimalist UI:** Clean, high-contrast black-and-white aesthetic designed for readability and focus.
- **Live Streaming Generation:** Uses Server-Sent Events (SSE) to display real-time progress while AI reads and analyzes the code.
- **Dynamic Routing:** Fetches and displays cached documentation directly via URLs (`/docs/:owner/:repo`).
- **Fully Responsive:** Optimized for both desktop and mobile viewing with sleek micro-interactions.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the root of the `client` folder.
```env
# Point this to your backend server URL
VITE_BACKEND_API=http://localhost:3001/api
```

### Running Locally
To start the development server:
```bash
npm run dev
```

### Building for Production
To build the application for deployment:
```bash
npm run build
```
Upload the contents of the `dist` folder to your hosting provider (Vercel, GitHub Pages, Netlify, etc).

## 📄 License
MIT
