const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', postCtrl.modifyPost); //TODO: remettre auth et multer
router.delete('/:id', auth, postCtrl.deletePost);
router.put('/:id/like', auth, postCtrl.likePost);

module.exports = router;