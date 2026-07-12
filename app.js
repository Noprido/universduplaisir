const express = require("express");
const path = require("path");

const publicRoutes = require("./routes/public");
const authRoutes = require("./routes/auth");
const memberRoutes = require("./routes/member");
const adminRoutes = require("./routes/admin");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", publicRoutes);
app.use("/auth", authRoutes);
app.use("/member", memberRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
    res.status(404).render("pages/404");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});