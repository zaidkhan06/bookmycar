require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors({
  origin: "https://bookmycar-7c3x81ntg-zaid-khans-projects-1ae86e05.vercel.app", 
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));


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
