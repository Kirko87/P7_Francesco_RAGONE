const express = require ('express');
const router = express.Router();

const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const listControlleur = require('../controllers/list');

router.post('/', auth, multer,listControlleur.add);
router.get ('/', auth, listControlleur.list);
router.get ('/:id',auth, listControlleur.getOneList);
router.put ('/:id', auth, multer, listControlleur.modifyList);
router.delete('/:id',auth, listControlleur.deleteList)

module.exports = router;