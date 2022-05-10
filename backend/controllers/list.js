const Sauces = require('../models/List')
const fs = require('fs');

//-----creare/registrare una lista
exports.add = (req, res, next) => {
  console.log(req.body);
  const lista= new List({
    ...JSON.parse(req.body.list),
  });
  lista.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => {
      console.error(error)
      res.status(400).json({ error })
    }
    );

}

// RECUPERA TUTTE le liste
exports.list = (req, res, next) => {

  Sauces.find().then(
    (sauces) => {
      res.status(200).json(sauces.map(normalizer));
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

//RECUPERA UNA salsa
exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id

  }).then(
    (sauce) => {
      res.status(200).json(normalizer (sauce));
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
function normalizer (sauce) {
  return{
    ...sauce.toObject(),
    likes: sauce.usersLiked.length,
    dislikes: sauce.usersDisliked.length
  }
  
}

//MODIFICA una salsa
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};
//ELIMINA una salsa
exports.deleteSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

