const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Page Routes
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/services", (req, res) => res.render("services"));
app.get("/booking", (req, res) => res.render("booking"));
app.get("/faq", (req, res) => res.render("faq"));
app.get("/terms", (req, res) => res.render("terms"));

// Booking Route
const bookingRoutes = require("./routes/booking");
app.use("/api/book", bookingRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log("Server running on http://localhost:" + PORT));
