// importazione di bcrypt per l'hash della password
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('jsonwebtoken');


//importazione del modello
const { User, Message } = require('../models/User');
//console.log(User);

//signup per accedere come nuovo utilizzatore
exports.signup = async (req, res, next) => {
  try {
    //console.log(req.body);  
    const hash = await bcrypt.hash(req.body.password, 10)
    const userList = User.build({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      surname: req.body.surname,
      userName: req.body.userName,
    });
    await userList.save();
    res.status(201).json({
      newUserInfo: userList,
      userId: userList.id,
      // UserId: userList.id,        si puo' selezionare il singolo valore, come nell'esempio
      // Email: userList.email,
      // Username: userList.userName,
      // Name: userList.name,
      // Surname: userList.surname,
      token: jwt.sign(
        { userId: userList.id, 
          role: userList.role
        },
        process.env.RANDOM_SECRET_KEY,
        { expiresIn: '24h' },
      ),
      
    })

  } catch (error) {
    res.status(400).json({ error: error.message })
    console.error(error)
  }
}


//login per accedere come utilizzatore



exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé !' });


    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect !' });



    res.status(200).json({

      userId: user.id,
      token: jwt.sign(
        { userId: user.id,
          role: user.role
        },
        process.env.RANDOM_SECRET_KEY,
        { expiresIn: '24h' },

      )

    })



  } catch (error) {
    res.status(500).json({ error })
    console.error(error);
  }


};

//barra delle informazioni per accedere al nome utilizzatore

exports.infoUser = async (req, res, next) => {

try{

  const user = await User.findOne({ where: { id: req.params.id  } });
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé !' });

  res.status(200).json({

 Username: user.userName,
 id:user.id

  })

}catch (error) {
  res.status(500).json({ error })
  console.error(error);
}
}
