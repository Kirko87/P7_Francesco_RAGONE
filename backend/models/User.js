const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize ("sqlite://data.db")


const User = sequelize.define('User', {
    // Model attributes are defined here
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
     },
     name: {
      type: DataTypes.STRING,
      allowNull: false
     },
     surname: {
      type: DataTypes.STRING,
      allowNull: false
     },
     password :{
        allowNull: false 
     },
     email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }

    
  }, {
    // Other model options go here
  });

  module.export={User}