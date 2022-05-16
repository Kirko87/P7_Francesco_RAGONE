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

const UserSpace = sequelize.define('UserSpace', {
  // Model attributes are defined here
  userId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  message: {
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

 sequelize.sync({force:true})

module.exports = { User, UserSpace }
