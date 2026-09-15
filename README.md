# QRify — Free Modern QR Code Generator

> **Create beautiful QR codes in seconds.**
> Free • No Sign Up • Static QR

![QRify App Preview](https://img.shields.io/badge/QRify-Web%20App-4f46e5?style=for-the-badge&logo=qrcode&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v22-43853D?style=for-the-badge&logo=node.js&logoColor=white)

---

## 🌟 Project Overview

**QRify** is a modern, full-stack QR Code generator SaaS-style web application evolved from a simple Node.js command-line interface into a production-grade developer tool.

Built with **React**, **Vite**, and **Express.js**, QRify allows anyone to transform links and texts into clean, high-resolution QR codes in milliseconds — complete with customization controls, instant clipboard copy, PNG downloads, and a dedicated dark/light mode.

> ℹ️ **Project History**: This project originally started as a simple Node.js CLI script that prompted for an URL with `inquirer` and output a file with `qr-image`. The core generation logic has been preserved and elevated into a robust REST API backend serving an ultra-responsive single-page application.

---

## ✨ Features

- ⚡ **Instant Generation**: Real-time rendering as you type or submit.
- 🎨 **Appearance Customization**:
  - **Sizes**: Small, Medium, Large
  - **Margins**: Adjust matrix padding (Small, Medium, Large)
  - **Palette**: Custom foreground and background hex colors, plus curated quick presets (*Default Dark*, *Indigo Dream*, *Emerald*, *Midnight*, *Crimson*).
- 📥 **Direct Download**: Export sharp PNG image (`qrify-qr-code.png`) ready for print or web.
- 📋 **1-Click Copy**: Copy the encoded target URL to clipboard with live toast feedback.
- 🌓 **Dedicated Dark Mode**: Sleek dark and light themes with smooth transitions, persisting user preference in `localStorage`.
- 📱 **Fully Responsive**: Designed with mobile-first typography and dynamic layout adjustments.
- 🔒 **Privacy-First**: No authentication, no database, no link logging or tracking.

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite 8**
- **Lucide Icons**
- **Modern CSS**: Custom CSS tokens, fluid glassmorphism, responsive grid & flexbox

### Backend
- **Node.js** (ES Modules)
- **Express 5**
- **qr-image**: Fast server-side matrix generation and buffer streaming
- **CORS** & **Dotenv**

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### 2. Installation
Clone the repository and install all dependencies:

```bash
# Clone the repo
git clone https://github.com/elansari111/QR-code-generator-web.git
cd QR-code-generator-web

# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Development Mode
Run both backend API (`port 5000`) and Vite frontend dev server (`port 5173`) concurrently:

```bash
npm run dev
```

- Open **`http://localhost:5173`** for Vite live-reload frontend.
- Backend API will be live at **`http://localhost:5000`**.

### 4. Production Mode
Build the client and serve everything from Express on a single port:

```bash
# 1. Build client bundle
npm run client:build

# 2. Start unified production server
npm start
```
- Open **`http://localhost:5000`** in your browser.

---

## 📡 API Documentation

### `POST /api/qr/generate`
Generates a QR code image as base64 PNG data URL or SVG.

#### Request Body
```json
{
  "type": "url",
  "data": "https://github.com/",
  "size": "medium",
  "margin": "medium",
  "format": "png"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "type": "url",
  "data": "https://github.com/",
  "format": "png",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "size": "medium",
  "margin": "medium"
}
```

#### Error Response (422 / 400)
```json
{
  "error": "Please enter a valid website URL (e.g., https://example.com or github.com)."
}
```

### `GET /api/qr/download`
Directly triggers a file download attachment for browser requests.
- **Query Params**: `?data=https://example.com&size=large&margin=medium`

### `GET /api/health`
Returns API status and uptime.

---

## 📁 Project Structure

```
QR-code-generator-web/
├── client/                     # React + Vite frontend application
│   ├── public/                 # Static assets & favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation bar & theme toggle
│   │   │   ├── Hero.jsx        # Landing hero with badges
│   │   │   ├── QRGenerator.jsx # Generator form & tabs
│   │   │   ├── Customization.jsx # Colors, sizes, margins picker
│   │   │   ├── QRPreview.jsx   # Live preview, download & copy
│   │   │   ├── Features.jsx    # Feature cards grid
│   │   │   ├── HowItWorks.jsx  # 3-step timeline
│   │   │   ├── Footer.jsx      # SaaS footer
│   │   │   ├── GithubIcon.jsx  # SVG Github icon
│   │   │   └── ThemeToggle.jsx # Light/dark mode toggle
│   │   ├── services/
│   │   │   └── qrService.js    # API service client
│   │   ├── App.jsx             # Main state coordinator
│   │   ├── index.css           # Design tokens & responsive styles
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                     # Express REST backend
│   ├── routes/
│   │   └── qr.js               # QR generation endpoints
│   └── index.js                # Express app entry & static SPA serving
├── index.js                    # Legacy CLI runner (retained for backward compatibility)
├── package.json                # Root package & development scripts
└── README.md
```

---

## 💻 CLI Compatibility
If you still want to run the original command-line interface:

```bash
npm run cli
```

---

## 🔮 Future Improvements
- [ ] Direct Wi-Fi credential generator (WPA/WPA2 QR matrix).
- [ ] vCard / Contact QR generator.
- [ ] Custom center logo embedding.
- [ ] Vector SVG download option.

---

## 📄 License
This project is open source under the [MIT License](LICENSE).
