const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
//importation des routes
const articlesRoutes = require("./routes/articles");
const userRoutes = require("./routes/user");

// Connexion à la base de données
mongoose
  .connect(
    "mongodb+srv://NordineS:Jnigxy9L7KsGwRf@cluster0.r1mlu.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
// Lancement de Express
const app = express();

app.use(express.json());
/**
 * MIDDLEWARES
 */
// Configuration cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
/**
 * ROUTES
 */
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/articles", articlesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
