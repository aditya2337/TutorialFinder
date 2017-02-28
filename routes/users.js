const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const User = require('../model/schema/userSchema');
const Tutorial = require('../model/schema/tutorialSchema');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const passport = require('passport');
require('../passport');

/* GET users listing. */
router
  .use(passport.initialize())
  .use(passport.session())
  // API
  .get('/', function (req, res, next) {
    User.db.collection('tutorialFinderUsers').find().toArray((err, users) => {
      if (err) res.sendStatus(400);
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json({title: 'All Users',
        users});
    });
  })
  .get('/user/:id', (req, res, next) => {
    var id = req.params.id;
    User.db.collection('tutorialFinderUsers')
    .findOne({_id: ObjectId(id)}, (err, user) => {
      if (err) res.send(err);
      res.send(user);
    });
  })
  .post('/', (req, res, next) => {
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password);
    User.db.collection('tutorialFinderUsers')
    .insert({email, password}, (err, doc) => {
      if (err) res.send(err);
      res.send(doc);
    });
  })
  .put('/:id', (req, res, next) => {
    var {id} = req.params;
    User.db.collection('tutorialFinderUsers')
    .update({_id: ObjectId(id)}, {username: req.body.username}, (err, user) => {
      if (err) res.send(err);
      res.send(user);
    });
  })
  .delete('/:id', (req, res, next) => {
    var {id} = req.params;
    User.db.collection('tutorialFinderUsers')
    .remove({_id: ObjectId(id)}, (err, user) => {
      if (err) res.send(err);
      console.log(user);
      if (user === 0) res.sendStatus(400);
      res.sendStatus(200);
    });
  })

  // login and registration actions
  .get('/home', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json({
      session: req.session,
      user: req.user,
      authenticated: req.isAuthenticated()
    });
  })
  .get('/login', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json({name: 'login again',
      authenticated: req.isAuthenticated()
    });
  })
  .post('/login', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }, passport.authenticate('local', {
    successRedirect: '/users/home',
    failureRedirect: '/users/login'
  }))
  .get('/logout', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    req.session.destroy((err) => {
      if (err) res.sendStatus(400);
      res.redirect('/users/login');
    });
  })

  // signup
  .get('/signup', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.json({name: 'signup again',
      authenticated: req.isAuthenticated()
    });
  })
  .post('/signup', (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }, passport.authenticate('local-register', {
    successRedirect: '/users/home',
    failureRedirect: '/users/signup'
  }))

  // OAUTH2
  .get('/auth/twitter',
  passport.authenticate('twitter'))
  .get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/home');
  })

  // tutorial links
  .get('/tutorial', function (req, res, next) {
    Tutorial.db.collection('tutorialFinderTutorials').find().toArray((err, users) => {
      if (err) res.sendStatus(400);
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.json({title: 'All Tutorials',
        users});
    });
  })
  .post('/tutorial', (req, res, next) => {
    // Tutorial.db.collection('tutorialFinderTutorials')
    // .insert({tutorialLink, tutorialTitle, demoLink, githubLink, typeOfTutorials, image}, (err, doc) => {
    //   if (err) res.send(err);
    //   res.send(doc);
    // });

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    let newTutorial = new Tutorial();

    newTutorial.title = req.query.tutorialTitle;
    newTutorial.tutorialLink = req.query.tutorialLink;
    newTutorial.liveDemoLink = req.query.demoLink;
    newTutorial.githubLink = req.query.githubLink;
    newTutorial.type = req.query.typeOfTutorials;
    newTutorial.image = req.query.image;
    // save the user
    newTutorial.save(function (err) {
      if (err) {
        res.sendStatus(400);
      }
      res.send(newTutorial);
    });
  })
;

module.exports = router;
