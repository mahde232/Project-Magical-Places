require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const logRequests = require('./express_middleware/logs')
const port = 4000;

app.use(logRequests); //middleware to log server requests
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/users/', require('./routes/users.route'));
app.use('/posts/', require('./routes/posts.route'));
app.use('/comments/', require('./routes/comments.route'));
app.use('/tags/', require('./routes/tags.route'));
app.use('/categories/', require('./routes/categories.route'));
app.use('/regions/', require('./routes/regions.route'));

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));
  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//handle any other nonexisting requests (after checking in server then client)
app.get('*', (req, res) => { 
  res.status(404).json({message: "No such GET request."})
}).post('*', (req, res) => {
  res.status(404).json({message: "No such POST request."})
}).put('*', (req, res) => {
  res.status(404).json({message: "No such PUT request."})
}).delete('*', (req, res) => {
  res.status(404).json({message: "No such DELETE request."})
})

//mongoose connection
mongoose.connect(`${process.env.DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => { console.log('Connected to DB') });
//Start up server
app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${process.env.PORT || port}`)
});
