const path = require('path');        // module to read file locations
const express = require('express');   // import express to create REST API server
const colors = require('colors');     // allows the console to print colored text
const dotenv = require('dotenv').config();   // import env vars from .env
// const { errorHandler } = require('./middleware/errorMiddleware');    // creates json of error
const connectDB = require('./config/db');    // connect to MongoDB using Mongooose
const port = process.env.PORT || 5000;  //set port to hold api server


// connectDB()// this async function connects to Mongo database using Mongoose | RAN ON SERVER INITIALIZATION

const app = express() // Calls the express function "express()" and puts new Express application inside the app variable

// app.use adds middleware to the data routes
// app.use(express.json()) // adds middleware that parses json requests and moves data into the request body (regardless of hit url)
// app.use(express.urlencoded({ extended: false }))  // parses data using query-string library rather than qs library (regardless of hit url)

// app.use('/api/goals', require('./routes/goalRoutes'))       // serve all goals all /api/goals (regardless of hit url)
// app.use('/api/users', require('./routes/userRoutes'))       // serve all users all /api/users (regardless of hit url)


// If production, serve frontend. Else, 
if (process.env.NODE_ENV === 'production') {                                  // IF PRODUCTION
  app.use(express.static(path.join(__dirname, '../frontend/build')))          //get the directory of the build folder

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')       // output index.html from the build folder
    )
  )
} else {                                                                      // ELSE
  app.get('/', (req, res) => res.send('Please set to production'))            // send production error
}

// app.use(errorHandler) // adds middleware that returns errors in json format (regardless of hit url)

app.listen(port, () => console.log(`Server started on port ${port}`))         // listen for incoming http requests on the PORT && print PORT in console
