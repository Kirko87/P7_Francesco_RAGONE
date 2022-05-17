const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("sqlite://data.db");



const User = sequelize.define('User', {
  // Model attributes are defined here
  userName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull:false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
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

const Message = sequelize.define('Message', {
  // Model attributes are defined here
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  content: {
    type: DataTypes.STRING,

  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  }

}, {
  // Other model options go here
});

 sequelize.sync()

module.exports = { User, Message }
