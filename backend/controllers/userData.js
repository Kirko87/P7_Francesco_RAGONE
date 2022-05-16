// importazione di bcrypt per l'hash della password
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//importazione del modello
const {User, Users} = require('../models/User');
//console.log(User);

//signup per accedere come nuovo utilizzatore
exports.signup = async (req, res, next) => {
    try {
      //console.log(req.body);  
      const hash = await bcrypt.hash(req.body.password, 10)
      const userList =  User.build ({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        surname: req.body.surname,
        userName:req.body.userName,
      });
      await userList.save();
      res.status(201).json({ message: 'Utilisateur créé !'})
    } catch(error) {
       console.error(error) 
      res.status(400).json({error:error.message}) 
    }
  }


//login per accedere come utilizzatore



exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({where:{email: req.body.email}});
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé !' });
    

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect !' });
 

    res.status(200).json({
      userId: user._id,
      token: jwt.sign(
        { userId: user._id },
        process.env.RANDOM_SECRET_KEY,
        { expiresIn: '24h' }
      )
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
    console.error(error);
  }
};