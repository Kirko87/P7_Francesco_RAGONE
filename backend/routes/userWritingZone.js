const express = require ('express');
const router = express.Router();

const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const userController = require('../controllers/userWritingZone');

router.post('/message',  multer, userController.createMsgInList );
router.get ('/message', userController.userTakeList);
//router.get ('/message/:id', auth, userController.);
//router.delete('/message/:id', auth, userController.)
//router.post ('/comment', auth,  multer, userController.);
//router.get ('/messsage/:id/comment',auth, userController.);
//router.delete('/comment/:id', auth, userController.)

module.exports = router;