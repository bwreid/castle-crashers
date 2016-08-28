var idGen = require('shortid').generate;

function random (limit) {
  return Math.floor(Math.random() * limit);
}

var CastleFactory = (function () {
  var allCastles = [];

  function Castle () {
    this.id = idGen();
    this.hp = 1000 - (200 * allCastles.length);
    this.builders = 100;

    if (this.hp > 0) allCastles.push(this);
  }

  Castle.findOne = function (id) {
    return allCastles.filter(function (item) { return item.id === id })[0];
  }

  Castle.isDestroyed = function () {
    return allCastles.reduce(function (acc, castle) {
      return acc + castle.hp;
    }, 0) <= 0;
  }

  Castle.prototype.fortify = function () {
    if (this.hp > 0) { this.hp += random(this.builders); }
  }

  Castle.prototype.defend = function (type) {
    if (this.hp <= 0) { return this; }

    var dmg;
    if (type === 'charge') {
      dmg = random(100) + 10;
      this.hp -= dmg;
    } else if (type === 'catapult') {
      dmg = !random(5) ? random(1000) : random(10);
      this.hp -= dmg;
    } else if (type === 'arrows') {
      dmg = random(10) + 2;
      this.builders -= dmg;
    }

    this.fortify();
    return this;
  }

  return Castle;
})();

module.exports = CastleFactory;
