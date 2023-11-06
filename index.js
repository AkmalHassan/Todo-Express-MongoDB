require('dotenv').config()
// console.log(process.env)
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/categories');
const taskRoutes = require('./routes/tasks');
const Category = require('./models/Category');
const methodOverride = require('method-override');
const Task = require('./models/Task');

const app = express();

// Set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use bodyParser to parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the categories and tasks routers
app.use('/categories', categoryRoutes);
app.use('/tasks', taskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Route for the root path
app.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    // Pass the categories to the index view
    res.render('index', { categories });
  } catch (error) {
    // If an error occurs, send a server error status code
    res.status(500).send('Error fetching categories');
  }
});

// Catch-all for 404 errors
app.use((req, res) => {
  // res.status(404).render('404');
  res.status(404).send("404 - Page Not Found"); 
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

