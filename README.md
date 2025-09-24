## 🚗 BookMyCar – Car Rental Service

BookMyCar is a MERN stack-based Car Rental Service that allows users to search, book, and manage cars seamlessly.
It includes both customer-facing features and a dedicated admin panel for managing cars, bookings, and customers.

## ✨ Features

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

## 🛠️ Tech Stack
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

## 📂 Project Structure
```
BookMyCar/
│── backend/
│ ├── config/ # DB connection
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes (auth, admin, variants, bookings, payment)
│ ├── uploads/ # Uploaded documents
│ └── server.js # Entry point
│
│── frontend/
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Screens (Login, Dashboard, Profile, Admin, etc.)
│ │ ├── context/ # Auth & state management
│ │ └── App.jsx
│ └── vite.config.js
│
└── README.md
```
## ⚡ Environment Variables
Backend (.env)
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

Frontend (.env)
VITE_API_URL=http://localhost:4000/api
VITE_RAZORPAY_KEY=your_key

## 🚀 Getting Started
1️⃣ Clone the repo
git clone https://github.com/zaidkhan06/bookmycar.git
cd bookmycar

2️⃣ Backend Setup
cd backend
npm install
npx nodemon

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Now open 👉 http://localhost:5173

📸 Screenshots

## USER UI
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/eb9d7189-1b1b-4ca5-a849-10abcc67af30" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/61e75e48-127d-4b7a-9bb5-43cf146f6f5e" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/bfa84797-c965-498f-a5dd-054855149332" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/ed3bf4e8-5f84-4544-88e1-f17e26d1c419" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/47fc16b8-2653-4e31-a65e-b0497871b8e5" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/c2d6894f-49b9-4710-853c-656d2ff93076" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/f035a4d9-ed73-4760-80b7-c618bfb0d48d" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/7f5d2652-2f33-4a19-86e7-9475b14334e1" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/3ecb6835-1419-43a2-b4aa-06332bb63bed" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/7db3ce9f-7ce1-4b78-abcd-915c931bb90d" />


## ADMIN UI

<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/0f3cfda6-94be-48d6-9d47-9f494d2ad5c0" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/4c09f160-3e58-44dc-a851-743d5b9123ba" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/36eb5c69-6585-45e9-9b69-832ae4ff35de" />

<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/d5d4698b-309a-4ca7-a825-f9ef58d4519c" />
<img width="1366" height="720" alt="image" src="https://github.com/user-attachments/assets/afa744ab-727c-43a8-8a73-cb519235b7eb" />


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

⚡ Zaid Khan – LinkedIn: www.linkedin.com/in/zaidkhan01  | GitHub: https://github.com/zaidkhan06
