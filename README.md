# AI-Powered Productivity Assistant

## Frontend (React with Vite)

### Project Setup
This is the frontend for the AI-Powered Productivity Assistant, built using React and Vite.

### Prerequisites
- Node.js installed on your machine.
- Yarn package manager installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd AI-Powered_Productivity_Assistant/client
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn run dev
   ```

4. Open your browser and navigate to the provided URL (usually `http://localhost:5173`).

### Folder Structure
```
client/
├── src/
│   ├── components/      # React components
│   ├── pages/           # Pages for the app
│   ├── assets/          # Static assets (e.g., images, icons)
│   ├── styles/          # Tailwind CSS configuration and custom styles
│   └── main.jsx         # Entry point for the React app
├── public/              # Static files
├── package.json         # Project metadata and scripts
├── vite.config.js       # Vite configuration file
└── README.md            # Documentation
```

### Styling
Tailwind CSS is used for styling. Modify the `tailwind.config.js` file to customize the theme and styles.

---

## Backend (Node.js, Redis, MongoDB Atlas)

### Project Setup
This is the backend for the AI-Powered Productivity Assistant, built using Node.js and Express. It utilizes Redis for caching and MongoDB Atlas as the database.

### Prerequisites
- Node.js installed on your machine.
- A MongoDB Atlas cluster set up.
- Redis installed locally or a cloud-based Redis instance.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd AI-Powered_Productivity_Assistant/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root of the `server` directory.
   - Add the following:
     ```env
     PORT=5000
     MONGO_URI=<your-mongodb-atlas-uri>
     REDIS_HOST=<your-redis-host>
     REDIS_PORT=<your-redis-port>
     REDIS_PASSWORD=<your-redis-password>
     JWT_SECRET=<your-jwt-secret>
     ```

4. Start the server:
   ```bash
   npm run dev
   ```

5. The server will run at `http://localhost:5000`.

### Folder Structure
```
server/
├── src/
│   ├── routes/         # Express routes
│   ├── controllers/    # Route handlers and business logic
│   ├── models/         # Mongoose models for MongoDB
│   ├── middlewares/    # Custom middlewares
│   ├── utils/          # Utility functions
│   └── index.js        # Main server entry point
├── config/             # Configuration files (e.g., Redis, database)
├── package.json        # Project metadata and scripts
├── .env.example        # Example environment variables file
└── README.md           # Documentation
```

### Scripts
- `npm run dev`: Starts the server in development mode with nodemon.

### Dependencies
- `express`: For building the server.
- `mongoose`: For interacting with MongoDB Atlas.
- `redis`: Redis client for caching.
- `dotenv`: For environment variable management.
- `nodemon`: For automatic server restarts during development.

---

### Additional Notes
- Ensure both frontend and backend servers are running simultaneously for full functionality.
- For any issues, check the logs or refer to the documentation in the respective folders.
