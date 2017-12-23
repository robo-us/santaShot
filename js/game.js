//ustawiamy zmienne a w pierwszym wieszu tworzymy instancję Phasera
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var cursors;
var box;
var children;

function preload() {
  game.load.image('santa', 'assets/santa.png');
  game.load.image('children', 'assets/children.png');
  game.load.image('box', 'assets/box.png');
  cursors = game.input.keyboard.createCursorKeys();
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  player = game.add.sprite(game.world.width/2, game.world.height, 'santa');
  player.anchor.setTo(0.5, 1);
  children = game.add.sprite(400, 300, 'children');
  children.anchor.setTo(0.5, 0.5);
  box = game.add.sprite(400, 300, 'box');
  box.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(player);
  game.physics.arcade.enable(children);
  game.physics.arcade.enable(box);
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

  if (cursors.up.isDown) {
    box.reset(player.x, player.y - 124);
    box.body.angularVelocity = 200;
    box.body.velocity.y = -100;
  }
}