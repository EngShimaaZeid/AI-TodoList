# MERN Stack Migration Guide

This project has been enhanced with a MERN (MongoDB, Express, React, Node.js) stack structure.

## 1. Responsive Design (Completed ✅)
The existing `index.html`, `index.css`, and `script.js` have been updated to be fully responsive.
- **Mobile Menu:** A hamburger menu has been added for mobile devices.
- **Grid Layouts:** CSS Grid layouts now adapt to smaller screens.
- **Touch Targets:** Buttons and links are sized for touch interaction.

## 2. Backend Setup (Node.js + Express + MongoDB)
A `server` folder has been created with the following structure:
- `server/index.js`: The main entry point for the backend server.
- `server/models/Task.js`: A Mongoose model for storing tasks in MongoDB.
- `server/routes/tasks.js`: API routes for creating, reading, updating, and deleting tasks.

### How to run the backend:
1. Open a terminal in the `server` folder.
2. Run `npm install` to install dependencies (express, mongoose, cors, dotenv).
3. Create a `.env` file with your MongoDB connection string (`MONGODB_URI=...`).
4. Run `npm start` to start the server.

## 3. Frontend Migration (React)
A `client` folder has been created to house the React application.
- `client/src/App.jsx`: A sample React component showing how to structure the app.

### To fully convert to React:
1. Open a terminal in the `client` folder.
2. Run `npx create-react-app .` (if the folder is empty) or set up a Vite project.
3. Move the styles from `index.css` to `client/src/App.css`.
4. Break down the `index.html` sections into React components (e.g., `Hero.jsx`, `Features.jsx`).
5. Use `fetch` or `axios` to communicate with the backend API running on port 5000.

## Current Status
- The **Static Site** (root folder) is fully functional and responsive.
- The **Backend** (server folder) is ready to be initialized.
- The **Frontend** (client folder) contains a starting point for React migration.
