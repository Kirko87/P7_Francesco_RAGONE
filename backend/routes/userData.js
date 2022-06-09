const express = require ('express');
const router = express.Router();
const user = require('../controllers/userData');
const password = require('../middleware/password');



router.post('/signup', password, user.signup);
router.post('/login', user.login);
router.get('/user/:id', user.infoUser)

module.exports = router;