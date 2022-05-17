const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const userController = require('../controllers/userWritingZone');

router.post('/message', auth, multer, userController.createMsgInList);
router.get('/message', auth, userController.userTakeList);
router.get('/message/:id', auth, userController.userGetOneMsg);
router.delete('/message/:id', auth, userController.userDeleteMsg);
router.post('/comment', auth, multer, userController.createComment);
router.get('/message/:id/comment', auth, userController.userGetComment);
router.delete('/comment/:id', auth, userController.userDeleteComment)

module.exports = router;