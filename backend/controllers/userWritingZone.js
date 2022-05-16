const { User, UserSpace } = require('../models/User')
const fs = require('fs');
const express = require("express");


//-----creare/registrare 
exports.userTakeList = async(req, res, next) => {
    try{
      const users = await UserSpace.findAll({
        attributes:['message']
      });
console.log(users.every(user => user instanceof UserSpace)); // true
console.log("All users:", JSON.stringify(users, null, 2));
res.status(200).json({ message: 'Message récupéré !'})
    } catch (error) {
      console.error(error)
      res.status(500).json({ error })
      console.error(error);
    }
  }

  

//RECUPERA TUTTA la pagina

/*User.findAll({
  attributes: ['foo', 'bar']
});

*/






// RECUPERA TUTTA la pagina
exports.createMsgInList = async (req, res, next) => {

try{
  const msgInList = await UserSpace.create({ message: "Jane" });
console.log("Jane's auto-generated ID:", msgInList.id);
res.status(201).json({ message: 'Message créé!'})

} catch (error) {
  console.error(error)
  res.status(500).json({ error })
  console.error(error);
}
}
/*
//RECUPERA un elemento
exports.userGetOne = (req, res, next) => {
  User.findOne({
    _id: req.params.id

  }).then(
    (sauce) => {
      res.status(200).json(normalizer(sauce));
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
exports.userModify = (req, res, next) => {
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
    .then(user => {
      const filename = user.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

*/