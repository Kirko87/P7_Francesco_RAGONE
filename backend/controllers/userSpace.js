const {User} = require('../models/User')
const fs = require('fs');
const express = require ("express");


//-----creare/registrare 
exports.userCreate = (req, res, next) => {
  console.log(req.body);
  const lista= new User ({
    ...JSON.parse(req.body.lista),
  });
  lista.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => {
      console.error(error)
      res.status(400).json({ error })
    }
    );

}

// RECUPERA TUTTA la pagina
exports.userTakeList = (req, res, next) => {

  User.find().then(
    (users) => {
      res.status(200).json(users.map(normalizer));
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

//RECUPERA un elemento
exports.userGetOne = (req, res, next) => {
  User.findOne({
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

//MODIFICA 
exports.userModify= (req, res, next) => {
  const userObject = req.file ?
    {
      ...JSON.parse(req.body.message),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

//ELIMINA 
exports.userDelete = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then( user => {
      const filename = user.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

