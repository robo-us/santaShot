//ustawiamy zmienne a w pierwszym wieszu tworzymy instancję Phasera
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var cursors;
var score = 0;

function preload() {
  game.load.image('santa', 'assets/santa.png');
  game.load.image('child', 'assets/children.png');
  game.load.image('box', 'assets/box.png');
  cursors = game.input.keyboard.createCursorKeys();
}

function create() {
  filedText = game.add.text(10, 10, 'Move use arrow key, drop gift up key', {fill: '#fff'});
  game.physics.startSystem(Phaser.Physics.ARCADE);
  player = game.add.sprite(game.world.width/2, game.world.height, 'santa');
  player.anchor.setTo(0.5, 1);
  //child = game.add.sprite(Math.floor(Math.random()*600), 80, 'child');
  //child.anchor.setTo(0.5, 0.5);
  //box = game.add.sprite(400, 300, 'box');
  //box.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(player);
  //game.physics.arcade.enable(child);
  //game.physics.arcade.enable(box);
  game.time.events.add(Phaser.Timer.SECOND * 4, changeText);

  gifts = game.add.group(game.world, 'Gifts', false);
  var box = gifts.create(player.x, player.y - 124, 'box');
  game.physics.arcade.enable(box);

  children = game.add.group(game.world, 'Children', false);

  for (var i = 1; i < 3; i++) {
    var child = children.create(Math.floor(Math.random()*600), 80, 'child');
    game.physics.arcade.enable(child);
    //child.anchor.setTo(0.5, 0.5);
  }
}

function update() {
  player.body.velocity.x = 0;
  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
  } else {
    player.body.velocity.x = 0;
  }

  if ((cursors.up.isDown && (box.body.y < 80))) {
    var box = gifts.create(player.x, player.y - 124, 'box');
    //box.reset(player.x, player.y - 124);
    box.body.angularVelocity = 200;
    //box.body.velocity.y = -100;
  } else {
    box.body.velocity.y = -100;
  }

  game.physics.arcade.overlap(box, children, givenGift, null);
}

function changeText() {
  filedText.text = 'Gifts: ' + score;
}

function givenGift(box, child) {
  child.kill();
  box.kill();
  score++;
  filedText.text = 'Gifts: ' + score;
}
