import express from "express";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import { pool, testConnection, initializeDatabase } from "./db.js";

const app = express();
const port = 3000;
const saltRounds = 10;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================
// MIDDLEWARE
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// =====================
// HELPERS
// =====================
function sendPage(res, fileName) {
  res.sendFile(path.join(__dirname, "public", fileName));
}

function missingFields(username, password) {
  return !username || !password;
}

function makeSuccessUrl(title, text, action, user = "") {
  let url = `/success.html?title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}&action=${encodeURIComponent(action)}`;

  if (user) {
    url += `&user=${encodeURIComponent(user)}`;
  }

  return url;
}

// =====================
// PAGES
// =====================
app.get("/", (req, res) => {
  sendPage(res, "index.html");
});

app.get("/register", (req, res) => {
  sendPage(res, "register.html");
});

app.get("/login", (req, res) => {
  sendPage(res, "login.html");
});

// =====================
// REGISTER
// =====================
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (missingFields(username, password)) {
      return res.status(400).json({
        ok: false,
        field: "general",
        message: "Please complete both fields before continuing."
      });
    }

    const cleanUsername = username.trim();

    if (cleanUsername.length < 3) {
      return res.status(400).json({
        ok: false,
        field: "username",
        message: "Use at least 3 characters for your username."
      });
    }

    if (password.length < 4) {
      return res.status(400).json({
        ok: false,
        field: "password",
        message: "Your password should contain at least 4 characters."
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [cleanUsername]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        ok: false,
        field: "username",
        message: "This username is already in use. Try another one."
      });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2)",
      [cleanUsername, passwordHash]
    );

    return res.status(201).json({
      ok: true,
      redirect: makeSuccessUrl(
        "Account created",
        "Your profile has been created successfully.",
        "login"
      )
    });
  } catch (error) {
    console.error("Register error:", error.message);

    return res.status(500).json({
      ok: false,
      field: "general",
      message: "Something went wrong on our side. Please try again."
    });
  }
});

// =====================
// LOGIN
// =====================
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (missingFields(username, password)) {
      return res.status(400).json({
        ok: false,
        field: "general",
        message: "Please complete both fields before continuing."
      });
    }

    const cleanUsername = username.trim();

    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [cleanUsername]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        ok: false,
        field: "username",
        message: "We couldn’t find an account with that username."
      });
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({
        ok: false,
        field: "password",
        message: "That password doesn’t match this account."
      });
    }

    return res.status(200).json({
      ok: true,
      redirect: makeSuccessUrl(
        "Welcome back",
        "You have signed in successfully.",
        "home",
        user.username
      )
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      ok: false,
      field: "general",
      message: "Something went wrong on our side. Please try again."
    });
  }
});

// =====================
// START SERVER
// =====================
async function start() {
  await testConnection();
  await initializeDatabase();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}



start();