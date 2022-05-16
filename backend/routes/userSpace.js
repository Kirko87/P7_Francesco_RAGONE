const express = require ('express');
const router = express.Router();

const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const userControlleur = require('../controllers/userSpace');

router.post('/', multer,userControlleur.userCreate);
router.get ('/',  userControlleur.userTakeList);
router.get ('/:id',  userControlleur.userGetOne);
router.put ('/:id',  multer, userControlleur.userModify);
router.delete('/:id',  userControlleur.userDelete)

module.exports = router;