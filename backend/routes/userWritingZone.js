const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const userController = require('../controllers/userWritingZone');

router.post('/message', auth, multer, userController.createMsgInList);
router.get('/message', auth, userController.messageList);
router.get('/message/:id', auth, userController.getOneMsg);
router.delete('/message/:id', auth, userController.deleteMsg);
router.get('/message/:id/childrenCount',auth, userController.messageCount);
router.get('/message/:id/children', auth, userController.messageList);
router.put ('/message/:id', auth, multer, userController.modifyMsg);
router.post('/message/:id/like', auth, userController.likesDislikes);



module.exports = router;