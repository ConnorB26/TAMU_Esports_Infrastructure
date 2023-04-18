const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createDatabaseInstance = require('../../database/database.js');
const db = createDatabaseInstance(false);

const usersRoute = require('./routes/users')(db);

const app = express();
const PORT = process.env.PORT || 3001;

// Serve the frontend files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use route files
app.use('/api/users', usersRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  db.connect();
});