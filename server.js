// Import dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

// Import custom modules
const connectDB  = require('./backend/db');
const { sessionMiddleware, initIsLoggedIn } = require('./backend/middleware/sessionMiddleware');

// Create Express app
const app = express();

// Set port
const port = process.env.PORT || 4000;

// Connect to database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleware);
app.use(initIsLoggedIn);

// Override for the delete route
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./backend/routes/routes'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(port, () => {
  console.log(`Server successfully hosted at ${port}`);
});
