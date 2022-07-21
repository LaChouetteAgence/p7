// package de cryptage du MDP
const bcrypt = require("bcrypt");
// package pour la vérification et la création de token
const jwt = require("jsonwebtoken");
//on a besoin de notre model users
const User = require("../models/user");

exports.signup = async (request, response) => {
  const hash = await bcrypt.hash(request.body.password, 10);
  try {
    //on créer notre nouveau user avec notre modèle mongoose
    const user = new User({
      //on récupère l'e-mail du corp de la requête
      email: request.body.email,
      //on récupère le hash du MDP
      password: hash,
      username: request.body.username,
    });
    //on utilise la méthode .save pour sauvegarder dans la BDD
    await user.save();
    //on renvoi un 201 pour une création de ressource et on renvoi un message en objet
    response.status(201).json({ message: "Utilisateur crée !" });
  } catch (e) {
    response.status(500).json({ e });
  }
};

exports.login = async (request, response) => {
  //on va commencer par trouvé le user dans la BDD qui correspond à l'email renseigner par la personne
  const user = await User.findOne({ email: request.body.email });
  try {
    if (!user) {
      return response.status(401).json({ error: "Utilisateur non trouvé" });
    }//on utilise la méthode .compare
    const valid = bcrypt.compare(request.body.password, user.password);
    if (!valid) {
      return response.status(401).json({ error: "Mot de passe incorrect" });
    }
    response.status(200).json({
       //si le MDP est le bon l'utilisateur reçoit
          //son user id et son token d'identification
      userId: user._id,
      token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      }),
      isAdmin: user.isAdmin,
      username: user.username,
    });
  } catch (e) {
    response.status(500).json({ e });
  }
};
