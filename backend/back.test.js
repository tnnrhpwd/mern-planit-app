// App.test.js
// import React from 'react';
// import { render } from '@testing-library/react';
// import AboutComponent from '../frontend/src/pages/About/About';
const mongoose = require('mongoose');   // Object Data Modeling (ODM) library for MongoDB and Node. js

describe('My Stack', ()=>{
  it('has a running backend', () => {
      // this async function connects to Mongo database using Mongoose => exported to server.js | RAN ON SERVER INITIALIZATION
      const connectDB = async () => {
          try {
            const conn = await mongoose.connect(process.env.MONGO_URI)
        
            console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
          } catch (error) {
            console.log(error)
            process.exit(1)
          }
        }
        
        module.exports = connectDB
  });
  it.todo('can use OpenAI compression api');
})