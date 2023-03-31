const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
          const user = new User({
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
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé'});
            }
            console.log(req.body.password, user.password);
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id, admin: user.admin},
                            process.env.TOKEN_SECRET,
                            {expiresIn: '24h'},
                        ),
                        admin: user.admin,
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.logout = (req, res, next) => {
    User
}

exports.getOneProfile = (req, res, next) => {
    User.findOne({_id: req.auth.userId})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }
            return res.status(200).json(user);
        })
        .catch(error => res.status(500).json({error}));
};

 /**exports.deleteProfile = (req, res, next) => {
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
 };**/