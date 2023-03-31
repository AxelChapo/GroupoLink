const Post = require('../models/post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    console.log(req.body);
    console.log("test");
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
        ...postObject,
        createdDate: Date.now(),
        user: req.auth.userId,
    });
    if (req.file) {
        post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    post.save()
        .then(() => res.status(201).json({message: 'Nouveau post créé'}))
        .catch(error => res.status(401).json({error}));
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .populate('user')
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({error}))
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({error}));
};

exports.likePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then(post => {
            if(req.body.like == 1) {
                if(!post.usersLiked.inculdes(req.body.userId)){
                    post.likes++;
                    post.usersLiked.push(req.body.userId);
                }
            }
            if(req.body.like == 0) {
                if(post.usersLiked.include(req.body.userId)){
                    post.usersLiked.remove(req.body.userId);
                    post.likes--;
                }
            }
            post.updateOne({_id: req.params.id}, post)
                .then(post => res.status(200).json({message:'post mis à jour'}))
        })
        .catch(error => res.status(500).json({error}));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then(post => {
            if (post.user.valueOf() != req.auth.userId && !req.auth.admin) {
                res.status(401).json({message: 'Not authorized'});
            }
            else {
                const filename = post.imageUrl?.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({_id: req.params.id})
                        .then(() => res.status(200).json({message: 'Post supprimé'}))
                        .catch(error => res.status(400).json({error}));
                });
            }
        })
        .catch(error => res.status(500).json({error}));
};


//TODO: tester la route avec postman
exports.modifyPost = (req, res, next) => {
    Post.findOne({_id: req.params.id}).then(post => {
        if (post.user.valueOf() != req.auth.userId && !req.auth.admin) {
            res.status(401).json({message: 'Not authorized'});
        }
        else {
            const postObject = req.file ?
                {
                    ...JSON.parse(req.body.post),
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : {...req.body};
            Post.updateOne({_id: req.params.id}, {...postObject, _id: req.params.id})
                .then(() => res.status(200).json({message: 'Post mis à jour !'}))
                .catch(error => res.status(400).json({error}));
        }
    })
};
