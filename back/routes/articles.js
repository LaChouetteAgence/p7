const express = require("express");
const router = express.Router();
//on importe nos controllers pour les sauces
const articlesCtrl = require("../controllers/articles");
//middleware d'authentification que nous appliquerons à nos routes pour les protégés
const auth = require("../middleware/auth");
//middleware pour les fichiers
const multer = require("../middleware/multer-config");
//=================================>
/////////////////// Create Update Like Delete Get all Get one
//=================================>
router.post("/", auth, multer, articlesCtrl.createArticles);
router.put("/:id", auth, multer, articlesCtrl.modifyArticles);
router.post("/:id/like", auth, articlesCtrl.like);
router.delete("/:id", auth, articlesCtrl.deleteArticles);
router.get("/", auth, articlesCtrl.getAllArticles);
router.get("/:id", auth, articlesCtrl.getOneArticles);

//on exporte le router de ce fichier
module.exports = router;
