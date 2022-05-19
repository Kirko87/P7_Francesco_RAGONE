const { Message, User } = require('../models/User')
const fs = require('fs');
const express = require("express");
const { autocompleteCommand } = require('cli');


//-----TROVA TUTTI I MESSAGGI in home-page
exports.userTakeList = async (req, res, next) => {
  try {
    const users = await Message.findAll();
    console.log(users.every(user => user instanceof Message)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
    const msgHomePage = users
    res.status(200).json({ messageStatus: 'Messages récupérés !', msgHomePage })
  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//-----CREA MESSAGGI in home-page
exports.createMsgInList = async (req, res, next) => {

  try {
    const msgInList = await Message.create({ message: "MESSAGGIO personale bacheca", userId: req.auth.userId });
    console.log("Message's auto-generated ID:", msgInList.id);
    const msgContent = msgInList.message
    res.status(201).json({ messageStatus: 'Message créé!', msgContent});


  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//-----TROVA un messaggio specifico
exports.userGetOneMsg = async (req, res, next) => {
  try {
    const msgFind = await Message.findOne({ where: { id: req.params.id } });
    console.log(msgFind.message);
    const msgContent = msgFind.message
    if (msgContent == null) {
      return res.status(204).json({ messageStatus: 'Message non trouvé!' })
    }
    res.status(200).json({ messageStatus: 'Message trouvé!', msgContent })

  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//ELIMINA il tuo messaggio
exports.userDeleteMsg = async (req, res, next) => {
  try {
    const msgFind = await Message.findOne({ where: { id: req.params.id } });
    if (msgFind.userId !== req.auth.userId) {
      return res.status(403).json({ messageStatus: 'Cette message ne vous appartient pas' })
    }
    if (msgFind.imageUrl) {
      const filename = msgFind.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`);
    }
    await msgFind.destroy()
    res.status(200).json({ messageStatus: 'Objet supprimé !' })


  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
};

// CREA un commento 
exports.createComment = async (req, res, next) => {

  try {
    await Message.findOne({ id: req.params.id });
    const cmtInList = await Message.create({ comment: "COMMENTO Esterno", userId: req.auth.userId });
    console.log("Comment's auto-generated ID:", cmtInList.id);
    const cmtContent = cmtInList.comment
    res.status(201).json({ commentStatus: 'Commentaire créé!', cmtContent})

  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//TROVA Commento

exports.userGetComment = async (req, res, next) => {
  try {
    const cmtFind = await Message.findOne({ where: { id: req.params.id } });
    console.log(cmtFind.comment);
    const cmtContent = cmtFind.comment
    if (cmtContent == null) {
      return res.status(204).json({ commentStatus: 'Commentaire non trouvé!' })
    }
    res.status(200).json({ commentStatus: 'Commentaire trouvé!', cmtContent })
   
  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//ELIMINA commento
exports.userDeleteComment = async (req, res, next) => {
  try {
    const msgFind = await Message.findOne({ where: { id: req.params.id } });
    if (msgFind.userId !== req.auth.userId) {
      return res.status(403).json({ messageStatus: 'Cette message ne vous appartient pas' })
    }
    if (msgFind.imageUrl) {
      const filename = msgFind.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`);
    }
    await msgFind.destroy()
    res.status(200).json({ messageStatus: 'Objet supprimé !' })


  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
};

// // In molti editor una linea di codice può
// // essere commentata con la combinazione da tastiera dei tasti Ctrl+/
// e una combinazione simile a Ctrl+Shift+/ – per i commenti multilinea
//  (selezionate prima una parte di codice e poi utilizzate la combinazione di tasti).
//  Su Mac dovrebbe funzionare la combinazione Cmd al posto 
