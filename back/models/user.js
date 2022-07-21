const mongoose = require("mongoose");
//on récupère son contrôleur d'authentification unique
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  username: { type: String, required: true },
});

//on pass notre validator mongoose en plugin sur notre schema utilisateur
userSchema.plugin(uniqueValidator);
//on exporte le schema sous forme de model, on utilise .model de mongoose
module.exports = mongoose.model("User", userSchema);
