# ✨ EventSphere VIP - Event Registration Platform

An event registration portal built with Node.js, Express.js, MongoDB (Mongoose), and Bootstrap 5 featuring a dark/light glassmorphism UI.

---

## 📌 Project Overview
**CodeAlpha_EventRegistration** allows users to discover live technical events, register seats, search active bookings by email, and cancel registrations. It also features an Organizer Quick Publish Panel with security key authentication for posting new events.

---

## ✨ Key Features
* **✨ Glassmorphism VIP UI:** Responsive design with dynamic dark and light mode toggle.
* **➕ Organizer Quick Publish:** Dedicated panel for event organizers to post new events using an authorization key (`admin123`).
* **🔍 Email Booking Search:** Participants can enter their email to retrieve all active registrations.
* **🎟️ Dynamic Registration & Cancellation:** Instant seat booking linked with MongoDB `ObjectId` references and one-click cancellation.

---

## 🛠️ Tech Stack
* **Backend Framework:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Frontend UI:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, FontAwesome
* **Dev Tools:** Nodemon, Dotenv, CORS, Git

---

## 📁 Repository Structure
```text
CodeAlpha_EventRegistration/
├── index.js            # Express server, database seeding & REST APIs
├── models.js           # Mongoose schemas (Event & Registration)
├── index.html          # Interactive Glassmorphism UI
├── package.json        # Dependencies & scripts
└── .gitignore          # Git ignore rules (node_modules, .env)
