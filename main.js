var platforms;
var player;
var enemy;
var nightborne;
var tile_layer;
var worm;
var score = 0;
var scoreText;
var isGameFinished;

//https://anokolisa.itch.io/castle-prison
//https://rvros.itch.io/animated-pixel-hero
//https://creativekind.itch.io/nightborne-warrior
//https://rvros.itch.io/pixel-art-animated-slime

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


new Phaser.Game(config);

function preload()
{
    this.load.spritesheet('hero', 'assets/hero/adventurer-v1.5-Sheet.png', { frameWidth: 50, frameHeight: 37 });
    this.load.spritesheet('slime', 'assets/enemies/slime/slime-Sheet.png', { frameWidth: 32, frameHeight: 25 });
    this.load.spritesheet('fireworm', "assets/enemies/Worm/worm-sheet.png", { frameWidth: 90, frameHeight: 90 });
    this.load.spritesheet('nightborne', "assets/enemies/NightBorne/NightBorne.png", { frameWidth: 80, frameHeight: 80 });
    this.load.image('bg', "assets/enviroment/CastleTileset/Background.png");
    this.load.image('CastleTileset_image', "assets/enviroment/CastleTileset/CastleTileset.png");
    this.load.tilemapTiledJSON('tileset_json', 'assets/enviroment/CastleTileset/CastleTileset.json');
    this.load.image('platform', "assets/platform.png");
   // this.load.json('hero_collision', "assets/hero.json");
}

function create()
{
    //this.add.image(300, 400, 'bg').setScale(3.0);
    map = this.add.tilemap('tileset_json');
    const tileset = map.addTilesetImage('CastleTileset', 'CastleTileset_image');
    map.createStaticLayer('BgLayer', tileset);
    tile_layer = map.createStaticLayer('Level 1', tileset);
    tile_layer.setPosition(-400, -268);
    tile_layer.setCollisionByExclusion([-1]);

    ///Level Stuff
    player = new Player(this, 500, 50);
    enemy = new Enemy(this, 1038, 50);
  //  enemy2 = new Enemy(this, 1020, 50);
  //  enemy3 = new Enemy(this, 350, 50);
    nightborne = new NightBorneEnemy(this, 1638, 53);
    //worm = new WormEnemy(this, 0, 0);
    player.addPlayerCollider(tile_layer);
    scoreText = this.add.text(player.getPlayerX(), player.getPlayerY(), 'Score: 0', { fontSize: '32px', fill: '#FFF' });
}

function update()
{
    enemy.update();
    player.update();
  // enemy2.update();
   // enemy3.update();
    nightborne.update();
    //console.log(player.getPlayerY());
    //worm.update();
    scoreText.setPosition(player.getPlayerX() + 200, player.getPlayerY() - 280);
    if(player.isDead && !isGameFinished){
        this.cameras.main.fade(1000);
        isGameFinished = true;
    }
}