var config = {
  type: Phaser.AUTO,
  width: 800,
  parent: 'juego',
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  autoPause: true
};


var player;
var obstacles;
var score = 0;
var scoreText;
var gameover = false;
var scoreTimer;


function preload ()
{
  this.load.image('sky', 'assets/mine.gif');
  this.load.image('player', 'assets/player.png');
  this.load.image('obstacle', 'assets/star.png');

}

function create ()
{
  this.add.image(400, 300, 'sky');

  player = this.physics.add.sprite(100, 450, 'player');
  player.setCollideWorldBounds(true);

  obstacles = this.physics.add.group();
  this.time.addEvent({ delay: 1000, callback: addObstacle, callbackScope: this, loop: true });

  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

  this.physics.add.collider(player, obstacles, gameOver, null, this);

  scoreTimer = this.time.addEvent({ delay: 2000, callback: increaseScore, callbackScope: this, loop: true });
  
}

function update ()
{
  if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown)
  {
    player.setVelocityX(300);
  }
  else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown)
  {
    player.setVelocityX(-300);
  }
  else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP).isDown)
  {
    player.setVelocityY(-300);
  }
  else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN).isDown)
  {
    player.setVelocityY(300);
  }
  else
  {
    player.setVelocityX(0);
    player.setVelocityY(0);
  }
}

function addObstacle ()
{
  var obstacle = obstacles.create(800, Phaser.Math.Between(100, 500), 'obstacle');
  obstacle.setVelocityX(-200);
}

function gameOver ()
{
  if (!gameover) {
    player.setTint(0xff0000);
    scoreTimer.remove(false);
    this.physics.pause(); // usar la variable game para pausar el juego
    gameover = true;
  }
}

function increaseScore ()
{
  score += 10;
  scoreText.setText('Score: ' + score);
}

const continuar = document.getElementById("btnContinuar");
//Continuar al juego
continuar.addEventListener("click", function(){
  game = new Phaser.Game(config);
  document.getElementById("container-juego").style.display = "block";
  document.getElementById("form").style.display = "none";
  document.getElementById("tabla").style.display = "none";
  document.getElementById("map").style.display = "none";
document.getElementById("body").style.height = "110vh"
})
  
  



