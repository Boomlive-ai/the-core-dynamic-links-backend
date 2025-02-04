const express = require("express");
require("dotenv").config();
const cors = require('cors');
const {  fetchLinks } = require("./api/services/dynamicLinks"); // Import the summarizeNews function
const fileUpload = require('express-fileupload');
const app = express();
const axios = require("axios");

// Define allowed origins, including localhost on any port
const allowedOrigins = ['https://analyzesentiment.vercel.app','https://news-article-summarizer.vercel.app','https://nas-lovat.vercel.app','https://www.axionmatrix.com','https://axionmatrix.vercel.app','https://ims-api-beige.vercel.app', /^http:\/\/localhost:\d+$/];

// CORS options
const corsOptions = {
  // origin: function (origin, callback) {
  //   if (!origin || allowedOrigins.some((allowedOrigin) => allowedOrigin instanceof RegExp ? allowedOrigin.test(origin) : allowedOrigin === origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Add any other headers if needed
};

// Use CORS with options and handle preflight requests
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware to handle file uploads
app.use(fileUpload({ useTempFiles: true }));

// Express JSON and URL-encoded data middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// API to get User-Agent
app.get('/user-agent', (req, res) => {
  const userAgent = req.headers['user-agent'];
  res.json({ userAgent });
});


// Dynamic Link for The core
// app.get('/fetch-links/:id', fetchLinks);
app.get('/:id', fetchLinks);

// A fallback route to handle any other GET requests
app.get('*', (req, res) => {
  res.status(200).json({ message: 'Hello ! this is dynamic link generator app' });
});

module.exports = app;
