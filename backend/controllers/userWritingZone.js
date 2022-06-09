const { Message, User } = require('../models/User')
const fs = require('fs');
const express = require("express");
const { autocompleteCommand } = require('cli');


//-----TROVA TUTTI I MESSAGGI in home-page
exports.messageList = async (req, res, next) => {
  try {
    const messageInList = await Message.findAll({where:{parent:req.params.id || null}});
    res.status(200).json(messageInList)
  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//-----CREA MESSAGGI in home-page
exports.createMsgInList = async (req, res, next) => {

  try {
    const msgInList = await Message.create({ 
      message:req.body.message,
      parent:req.body.parent || null, //il messaggio parent puo' avere il valore [NULL] o il numero id quando vi si scrive un messaggio/commento e si fa riferimento al primo messaggio (parent)
      image: req.file?.filename, // il "?" vale come un "if", bisogna metterlo per dire "se c'èl'immagine, allora cercala", altrimenti si ha un errore perché cerca un immagine che non c'é necessariamente
      userId: req.auth.userId,
    // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

   });
   console.log(req.body);
    console.log("Message's auto-generated ID:", msgInList.id);
    res.status(201).json(msgInList);


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
    res.status(200).json({ messageStatus: 'Message trouvé!', msgContent })

  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//ELIMINA il tuo messaggio
exports.deleteMsg = async (req, res, next) => {
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
// exports.createComment = async (req, res, next) => {

//   try {
//     await Message.findOne({ id: req.params.id });
//     const cmtInList = await Message.create({  ...req.body, userId: req.auth.userId });
//     console.log("Comment's auto-generated ID:", cmtInList.id);
//     res.status(201).json(cmtInList)

//   } catch (error) {
//     res.status(500).json({ error })
//     console.error(error);
//   }
// }

//TROVA Commento

// exports.getComment = async (req, res, next) => {
//   try {
//     const cmtFind = await Message.findOne({ where: { id: req.params.id } });
//     console.log(cmtFind.comment);
//     const cmtContent = cmtFind.comment
//     if (cmtContent == null) {
//       return res.status(204).json({ commentStatus: 'Commentaire non trouvé!' })
//     }
//     res.status(200).json({ commentStatus: 'Commentaire trouvé!', cmtContent })
   
//   } catch (error) {
//     res.status(500).json({ error })
//     console.error(error);
//   }
// }

//ELIMINA commento
// exports.deleteComment = async (req, res, next) => {
//   try {
//     const msgFind = await Message.findOne({ where: { id: req.params.id } });
//     if (msgFind.userId !== req.auth.userId) {
//       return res.status(403).json({ messageStatus: 'Cette message ne vous appartient pas' })
//     }
//     if (msgFind.imageUrl) {
//       const filename = msgFind.imageUrl.split('/images/')[1];
//       fs.unlink(`images/${filename}`);
//     }
//     await msgFind.destroy()
//     res.status(200).json({ messageStatus: 'Objet supprimé !' })


//   } catch (error) {
//     res.status(500).json({ error })
//     console.error(error);
//   }
// };

// // In molti editor una linea di codice può
// // essere commentata con la combinazione da tastiera dei tasti Ctrl+/
// e una combinazione simile a Ctrl+Shift+/ – per i commenti multilinea
//  (selezionate prima una parte di codice e poi utilizzate la combinazione di tasti).
//  Su Mac dovrebbe funzionare la combinazione Cmd al posto 
