const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "images");
  },// explique a multer quel nom de fichier utilisé afin d'avoir un fichier unique
  filename: (request, file, callback) => {
    // on crée son nom avant l'extension
    // on supprime les espaces possible dans les noms de fichier avec la méthode split
    // qui remplace les espaces par des underscores
    const name = file.originalname.split(" ").join("_");
    // on applique une extension au fichier
    // le mime_type: jpg, jpeg, png
    // on crée une extension qui reprends notre dictionnaire
    const extension = MIME_TYPES[file.mimetype];
    // nous retourne le nom complet comme nous le désirons
    callback(null, name + Date.now() + "." + extension);
  },
});
// on exporte notre middleware multer complètement configurer

// on appel la méthode multer, a laquelle on passe notre objet storage,
// on applique la méthode single pour dire que ce sont des fichiers "unique"
module.exports = multer({ storage }).single("inputFile");
