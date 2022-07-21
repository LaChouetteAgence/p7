const express = require("express");
const router = express.Router();
//on a besoin de notre contrôler pour associé les fonctions au différentes routes
const userCtrl = require("../controllers/user");
//=================================>
/////////////////// SIGNUP
//=================================>
router.post("/signup", userCtrl.signup);
//=================================>
/////////////////// LOGIN
//=================================>
router.post("/login", userCtrl.login);
//on exporte le router de ce fichier
module.exports = router;
