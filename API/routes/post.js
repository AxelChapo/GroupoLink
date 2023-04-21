const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.put('/like/:id', auth, postCtrl.likePost);

module.exports = router;