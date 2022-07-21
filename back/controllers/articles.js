const Article = require("../models/articles");
// declaration de 'fs' pour la gestion des fichiers image des sauces
const fs = require("fs");
const { request } = require("http");
const { Console } = require("console");
// Le redimensionnement d'une image
const sharp = require("sharp");

exports.createArticles = async (request, response) => {
  try {
    const articleObject = request.body;
    if (request.file !== undefined) {
      const article = new Article({
        ...articleObject,
        imageUrl: `${request.protocol}://${request.get("host")}/images/${
          request.file.filename
        }`,
      });
      await article.save();

      response.status(201).json({ message: "Objet enregistré !" });
    } else {
      const article = new Article({
        ...articleObject,
      });
      await article.save();
      response.status(201).json({ message: "Objet enregistré !" });
    }
  } catch (e) {
    response.status(400).json({ e });
  }
};

exports.modifyArticles = async (request, response) => {
  const articleObject = request.file
    ? {
        ...request.body,
        imageUrl: `${request.protocol}://${request.get("host")}/images/${
          request.file.filename
        }`,
      }
    : { ...request.body };
  const article = await Article.findOne({ _id: request.params.id });
  try {
    if (
      request.auth.userId !== article.userId &&
      request.body.isAdmin === false
    ) {
      return response.status(401).json({ message: "Requete non autorisée" });
    }
    if (article.imageUrl !== undefined) {
      const filename = article.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {});
    }
    await Article.updateOne(
      { _id: request.params.id },
      { ...articleObject, _id: request.params.id }
    );
    response.status(200).json({ message: "Objet modifié" });
  } catch (e) {
    response.status(500).json({ e });
  }
};

exports.deleteArticles = async (request, response) => {
  const article = await Article.findOne({ _id: request.body.postId });
  try {
    if (
      request.auth.userId !== article.userId &&//verificatiion que ce n'est pas fait par un inconnue
      request.body.isAdmin === false
    ) {
      return response.status(401).json({ message: "Requete non autorisée" });
    }
    if (article.imageUrl !== undefined) {
      const filename = article.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {});
    }

    await Article.deleteOne({ _id: request.body.postId });// une fois que le fichier est supprimé on supprime le post

    response.status(200).json({ message: "Objet supprimé" });
  } catch (e) {
    response.status(500).json({ e });
  }
};

exports.getAllArticles = async (request, response) => {
  const article = await Article.find();
  try {
    response.status(200).json(article);
  } catch (e) {
    response.status(404).json({ e });
  }
};

exports.getOneArticles = async (request, response) => {
  const article = await Article.findOne({ _id: request.params.id });
  try {
    response.status(200).json(article);
  } catch (e) {
    response.status(404).json({ e });
  }
};

exports.like = async (request, response) => {
  try {
    const article = await Article.findOne({ _id: request.params.id });
    const liked = article.usersLiked.includes(request.body.userId);
    if (liked) {
      article.likes--;
      article.usersLiked = article.usersLiked.filter(
        (user) => user !== request.body.userId
      );
    } else {
      article.likes++;
      article.usersLiked.push(request.body.userId);
    }

    await Article.updateOne({ _id: request.params.id }, article);

    response.status(200).json({ article });
  } catch (e) {
    response.status(400).send("[Error]: " + e);
  }
};
