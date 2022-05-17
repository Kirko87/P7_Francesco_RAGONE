const { Message, User } = require('../models/User')
const fs = require('fs');
const express = require("express");


//-----TROVA TUTTI I MESSAGGI in home-page
exports.userTakeList = async (req, res, next) => {
  try {
    const users = await Message.findAll();
    console.log(users.every(user => user instanceof Message)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
    res.status(200).json({ message: 'Message récupéré !' })
  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//-----CREA MESSAGGI in home-page
exports.createMsgInList = async (req, res, next) => {

  try {
    const msgInList = await Message.create({ content: "MESSAGGIO personale bacheca", userId: req.auth.userId});
    console.log("Messsage's auto-generated ID:", msgInList.id);
    res.status(201).json({ message: 'Message créé!' })

  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//-----TROVA un messaggio specifico
exports.userGetOneMsg = async (req, res, next) => {
try{
  const msgFind = await Message.findOne({ where:{id: req.params.id}});
  console.log(msgFind.content);
  res.status(200).json({ message: 'Message trouvé!' })
 
}catch(error){
  res.status(500).json({ error })
  console.error(error);
}
}

//ELIMINA il tuo messaggio
exports.userDeleteMsg = async (req, res, next) => {
   try{
    const msgFind = await Message.findOne({ where: {id: req.params.id}});
     if( msgFind.userId !== req.auth.userId){
      return res.status(400).json({message: 'Cette message ne vous appartient pas'})
     }
      if(msgFind.imageUrl) {
      const filename = msgFind.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`);
      }
     await msgFind.destroy()
           res.status(200).json({ message: 'Objet supprimé !' })          
      
    
  }catch(error){
    res.status(500).json({ error })
    console.error(error);
}};

//CREA un commento
exports.createComment = async (req, res, next) => {

  try {
    await Message.findOne({id: req.params.id});
    const msgInList = await Message.create({ content: "COMMENTO Esterno", userId: req.auth.userId});
    console.log("Comment's auto-generated ID:", msgInList.id);
    res.status(201).json({ message: 'Commentaire créé!' })

  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }
}

//TROVA Commento

exports.userGetComment = async (req, res, next) => {
  try{
    const msgFind = await Message.findOne({where:{id: req.params.id}});
    console.log(msgFind.content);
    res.status(200).json({ message: 'Commentaire trouvé!' })
   
  }catch(error){
    res.status(500).json({ error })
    console.error(error);
  }
  }

  //ELIMINA commento
  exports.userDeleteComment = async (req, res, next) => {
    try{
     const msgFind = await Message.findOne({ where: {id: req.params.id}});
      if( msgFind.userId !== req.auth.userId || req.auth.userId !== req.auth.userId){
       return res.status(400).json({message: 'Cette message ne vous appartient pas'})
      } 
       if(msgFind.imageUrl) {
       const filename = msgFind.imageUrl.split('/images/')[1];
       fs.unlink(`images/${filename}`);
       }
      await msgFind.destroy()
            res.status(200).json({ message: 'Objet supprimé !' })          
       
     
   }catch(error){
     res.status(500).json({ error })
     console.error(error);
 }};