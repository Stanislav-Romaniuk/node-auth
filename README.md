# 🔐 Auth Demo

![Node](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Postgres](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

A simple authentication system built with **Node.js**, **Express**, and **PostgreSQL**.

The project demonstrates how a basic authentication flow works including user registration, password hashing and login verification.

---

# ✨ Features

- User registration
- Secure password hashing using **bcrypt**
- Login authentication
- PostgreSQL database integration
- Server-side validation
- Client-side error handling
- Redirect after successful authentication

---

# 🛠 Tech Stack

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

### Database
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### Security
![bcrypt](https://img.shields.io/badge/bcrypt-2C2C2C?style=for-the-badge)

### Frontend
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

# 📂 Project Structure

```
node-auth/
│
├── server.js
├── db.js
├── package.json
│
├── public/
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── success.html
│   └── style.css
│
└── README.md
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Stanislav-Romaniuk/node-auth.git
```

Enter the project folder

```bash
cd node-auth
```

Install dependencies

```bash
npm install
```

---

# ⚙️ Environment Setup

Create a `.env` file in the root directory.

Example:

```env
DB_URL=postgresql://postgres:password@localhost:5432/auth_db
```

---

# ▶️ Run the Server

```bash
node server.js
```

Open in the browser

```
http://localhost:3000
```

---

# 🗄 Database

The application automatically creates the required table if it does not exist.

Table

```
users
```

Columns

```
id
username
password_hash
created_at
```

Passwords are stored as **bcrypt hashes**, not plain text.

---
## ☕ Support the Author

If you find this project useful, consider supporting the development.

| Currency | Card |
|--------|--------|
| UAH | `4441 1111 0773 8019` |
| USD | `4441 1144 8916 8136` |


<a href="https://buymeacoffee.com/cryssq" target="_blank">
<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50">
</a>
---

# 👨‍💻 Author

Stanislav Romaniuk

GitHub  
https://github.com/Stanislav-Romaniuk
