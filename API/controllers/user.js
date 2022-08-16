const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
          const user = new User({
              id: req.body.id,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              birthDate: req.body.birthDate,
              department: req.body.department,
              email: req.body.email,
              password: hash
          });
          user.save()
              .then(() => res.status(201).json({message: 'Utilisateur créé'}))
              .catch(error => res.status(400).json({error}));
      })
      .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    User.findOne({_id: req.body.id})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect'});
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            {userId: user._id},
                            '@AcRwn)q"x&46/=',
                            {expiresIn: '24h'},
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.getOneProfile = (req, res, next) => {
    User.findOne({_id: req.body.id})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }

        })
        .catch(error => res.status(401).json({}))
};

exports.modifyProfile = (req, res, next) => {
    const userObject = req.file ?
    {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.filename}`
    } : {...req.body};
    User.updateOne({_id: req.body.id}, {...userObject, _id: req.body.id})
        .then(() => res.status(200).json({message: 'Profile mis à jour !'}))
        .catch(error => res.status(400).json({error}));
};

 exports.deleteProfile = (req, res, next) => {
    user.findOne({_id: req.body.id})
        .then(user => {
            const filename = user.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, () => {
                User.deleteOne({_id: req.body.id})
                    .then(() => res.status(200).json({message: 'Utilisateur supprimé !'}))
                    .catch(error => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(500).json({error}));
 };
