const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize ("sqlite://data.db")


const List = sequelize.define('List', {
    // Model attributes are defined here
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
     },
     userId:{
        type: DataTypes.STRING,
        unique: true,
     },
    message :{
        type: DataTypes.STRING,
        allowNull: false 
    },
    imageUrl: { type: DataTypes.STRING,
        allowNull: false },
  
    
  }, {
    // Other model options go here
  });

  module.export={List}