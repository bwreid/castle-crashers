var express = require('express');
var router = express.Router();
var { validate, findOne, kingdomIsDestroyed } = require('./middleware');
var Castle = require('../models/castle');

router.use(kingdomIsDestroyed);

var kingdom = [new Castle()];
router.get('/', function (req, res) {
  res.send(kingdom);
});

router.get('/:id', findOne, function (req, res) {
  res.send(req.body.castle);
});

router.post('/', validate, function (req, res) {
  var newCastle = new Castle();
  if (newCastle.hp > 0) {
    kingdom.push(newCastle);
    res.send({
      message: 'Castle created!',
      castle: newCastle
    });
  } else {
    res.status(500).send({ message: 'Cannot create anymore castles!' });
  }
});

router.post('/:id/attack', findOne, function (req, res) {
  var castle = req.body.castle;
  var attackType = req.body.type;

  if (!attackType) { res.status(422).send({ message: 'No attack type!'}); }
  else {
    castle.defend(attackType);
    res.send({
      message: 'Castle attacked!',
      castle: castle
    });
  }
});

router.post('/:id/fortify', validate, findOne, function (req, res) {
  var castle = req.body.castle;
  castle.fortify();
  res.send({
    message: 'Fortification successful!',
    castle: castle
  });
});

module.exports = router;
