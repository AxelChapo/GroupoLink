const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

router.post('/createPost', postCtrl.createPost);
router.get('/getAllPost', postCtrl.getAllPosts);
router.get('/getOnePost', postCtrl.getOnePost);

module.exports = router;