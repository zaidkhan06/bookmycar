🚗 BookMyCar – Car Rental Service

BookMyCar is a MERN stack-based Car Rental Service that allows users to search, book, and manage cars seamlessly.
It includes both customer-facing features and a dedicated admin panel for managing cars, bookings, and customers.

✨ Features
🔹 User Side

🔐 Authentication – Register & login with email, password, Aadhaar & Driving Licence upload.

🚘 Car Search & Filters – Search cars by name, type, price, company, AC, seating capacity, etc.

📅 Booking System – Select date range, auto-price calculation based on per-day rate.

💳 Online Payment – Integrated with Razorpay for secure payments.

📄 My Bookings – Track upcoming, completed, and cancelled bookings.

🧾 Invoice Download – Generate PDF invoices for completed bookings.

👤 User Profile – Manage personal details and documents (Aadhaar, DL).

🔹 Admin Panel

👨‍💼 Admin Management – Register new admins.

🚗 Add Variants – Add car variants with images, price, seating, AC, etc.

📋 Variants Dashboard – View, update, delete variants and manage vehicle registration numbers.

📦 Bookings Management – Approve/reject customer bookings after document verification.

👥 Customer Management – Verify Aadhaar and Driving Licence of users.

🛠️ Tech Stack
Frontend

⚛️ React.js (Vite)

🎨 Tailwind CSS + Lucide Icons + Shadcn/UI

Backend

🟢 Node.js + Express.js

🗄️ MongoDB (Mongoose ODM)

🔑 JWT Authentication

🌐 CORS + dotenv

Deployment

🌍 Frontend → Vercel

⚡ Backend → Render 

🗄️ Database → MongoDB 

📂 Project Structure
BookMyCar/
│── backend/
│   ├── config/        # DB connection
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes (auth, admin, variants, bookings, payment)
│   ├── uploads/       # Uploaded documents
│   └── server.js      # Entry point
│
│── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Screens (Login, Dashboard, Profile, Admin, etc.)
│   │   ├── context/     # Auth & state management
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md

⚡ Environment Variables
Backend (.env)
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

Frontend (.env)
VITE_API_URL=http://localhost:4000/api
VITE_RAZORPAY_KEY=your_key

🚀 Getting Started
1️⃣ Clone the repo
git clone https://github.com/zaidkhan06/bookmycar.git
cd bookmycar

2️⃣ Backend Setup
cd backend
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Now open 👉 http://localhost:5173

📸 Screenshots (Optional)

👉 Add some UI screenshots here (Home, Car Search, Bookings, Admin Panel, etc.)

📌 Roadmap

✅ Car search & booking

✅ Online payment

✅ Admin panel

⏳ Email notifications

⏳ Multi-language support

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

📜 License

This project is licensed under the MIT License.

⚡ Zaid Khan – LinkedIn
 | GitHub
