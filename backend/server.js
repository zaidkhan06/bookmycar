require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();
connectDB();

app.use((req, res, next) => {
  const allowedOrigins = ['https://bookmycar-tau.vercel.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // Add other CORS headers as needed (e.g., Access-Control-Allow-Methods, Access-Control-Allow-Headers)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use(express.json()); // for parsing application/json


// Static route to serve uploaded files (only if you want to serve them)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use("/api/admin", require('./routes/admin'));
app.use("/api/variants", require("./routes/variantRoutes"));
app.use("/api/bookings", require("./routes/booking"));
app.use("/api/payment", require("./routes/payment"));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
