const { Message, User } = require('../models/User')
const fs = require('fs');
const express = require("express");
const { autocompleteCommand } = require('cli');
const { send } = require('process');
const { normalize } = require('path');

//-----FUNZIONE PER NORMALIZZARE LA GESTIONE IMMAGINI

function messageNormalizer(message, req) {
  return {
    ...message.toJSON(),
    imageUrl: message.imageUrl && `${req.protocol}://${req.get('host')}/images/${message.imageUrl}`,
    usersLiked:JSON.parse(message.usersLiked),
    usersDisliked:JSON.parse(message.usersDisliked)
  }
}

//-----TROVA TUTTI I MESSAGGI in home-page
exports.messageList = async (req, res, next) => {
  try {
    const messageInList = await Message.findAll({ where: { parent: req.params.id || null } });
    res.status(200).json(messageInList.map(msg => messageNormalizer(msg, req)))
  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//-----CONTA messaggi-children(commenti)
exports.messageCount = async (req, res, next) => {

  try {
    const messageInList = await Message.count({ where: { parent: req.params.id || null } });
    res.status(200).send("" + messageInList)
  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//-----CREA MESSAGGI in home-page
exports.createMsgInList = async (req, res, next) => {

  try {
    const msgInList = await Message.create({
      message: req.body.message,
      parent: req.body.parent || null, //il messaggio parent puo' avere il valore [NULL] o il numero id quando vi si scrive un messaggio/commento e si fa riferimento al primo messaggio (parent)
      imageUrl: req.file?.filename, // il "?" vale come un "if", bisogna metterlo per dire "se c'è l'immagine, allora cercala", altrimenti si ha un errore perché cerca un immagine che non c'é necessariamente
      userId: req.auth.userId,
    });
    console.log(req.body);
    console.log("Message's auto-generated ID:", msgInList.id);

    res.status(201).json(messageNormalizer(msgInList, req));

  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//-----TROVA un messaggio specifico
exports.getOneMsg = async (req, res, next) => {
  try {
    const msgFind = await Message.findOne({ where: { id: req.params.id } });
    console.log(msgFind.message);
    const msgContent = msgFind
    if (msgContent == null) {
      return res.status(204).json({ messageStatus: 'Message non trouvé!' })
    }
    res.status(200).json(messageNormalizer(msgContent, req))

  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//ELIMINA il tuo messaggio
exports.deleteMsg = async (req, res, next) => {
  try {
    const msgFind = await Message.findOne({ where: { id: req.params.id } });
    if (!(msgFind.userId === req.auth.userId || req.auth.role === "Admin")) {
      return res.status(403).json({ messageStatus: 'Cette message ne vous appartient pas' })
    }

    if (msgFind.imageUrl) {

      fs.unlinkSync(`images/${msgFind.imageUrl}`);

    }
    await msgFind.destroy()
    res.status(200).json({ messageStatus: 'Objet supprimé !' })

  } catch (error) {
    res.status(500).json({ error })
    console.error(error);

  }
};

// //MODIFICA un messaggio

exports.modifyMsg = async (req, res, next) => {
  try {

    const msgModify = await Message.findOne({ where: { id: req.params.id } })

    if (msgModify.userId !== req.auth.userId && req.auth.role !== "Admin") {
      return res.status(400).json({ message: 'Cette message ne vous appartient pas' });
    }

    if (req.body.message) msgModify.message = req.body.message
    if (req.file) msgModify.imageUrl = req.file.filename
    await msgModify.save()
    res.status(200).json(messageNormalizer(msgModify, req))

    // .catch(error => res.status(400).json({ error }));

  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
};

//  //FEEDBACK messaggi
exports.likesDislikes = async (req, res, next) => {
  try {
    const msgLikes = await Message.findOne({ where: { id: req.params.id } })
    let usersLikes = JSON.parse(msgLikes.usersLiked) || []
    let usersDislikes = JSON.parse(msgLikes.usersDisliked) || []
    console.log(msgLikes.usersLiked);
    usersLikes = usersLikes.filter(userId => userId !== req.auth.userId)
    usersDislikes = usersDislikes.filter(userId => userId !== req.auth.userId)

    // if(msgLikes.usersLiked.includes(req.auth.userId)) { alors ... } else { ... }

    const like = req.body.like
    console.log(req.body);
    switch (like) {
      case 1:
        usersLikes.push(req.auth.userId)


        break;

      case -1:
        usersDislikes.push(req.auth.userId)



        break;
    }
    msgLikes.usersLiked = JSON.stringify(usersLikes)
    msgLikes.usersDisliked = JSON.stringify(usersDislikes)
    await msgLikes.save()



    res.status(200).json(messageNormalizer( msgLikes, req ))
  }
  catch (error) {
    res.status(400).json({ message: 'error' })
    console.log(error);
  }
}




// // In molti editor una linea di codice può
// // essere commentata con la combinazione da tastiera dei tasti Ctrl+/
// e una combinazione simile a Ctrl+Shift+/ – per i commenti multilinea
//  (selezionate prima una parte di codice e poi utilizzate la combinazione di tasti).
//  Su Mac dovrebbe funzionare la combinazione Cmd al posto 
