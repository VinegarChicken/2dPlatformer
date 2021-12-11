var platforms;
var player;
var enemy;
var nightborne;
var tile_layer;
var worm;
var score = 0;
var scoreText;

//https://edermunizz.itch.io/free-pixel-art-plataformer-painted-style
//https://free-game-assets.itch.io/free-enemy-sprite-sheets-pixel-art
//https://luizmelo.itch.io/fire-worm

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
    this.add.image(300, 400, 'bg').setScale(3.0);
    map = this.add.tilemap('tileset_json');
    const tileset = map.addTilesetImage('CastleTileset', 'CastleTileset_image');
    tile_layer = map.createStaticLayer('Level 1', tileset);
    tile_layer.setPosition(-400, -268);
    tile_layer.setCollisionByExclusion([-1]);

    ///Level Stuff
    player = new Player(this, 100, 150);
    //enemy = new Enemy(this, 638, 303);
    enemy2 = new Enemy(this, 320, 150);
    //enemy3 = new Enemy(this, 350, 250);
    nightborne = new NightBorneEnemy(this, 638, 53);
    //worm = new WormEnemy(this, 0, 0);
    player.addPlayerCollider(tile_layer);
    //scoreText = this.add.text(0, 0, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
}

function update()
{
   // enemy.update();
    player.update();
    if(!player.isDead){
        enemy2.update();
        //enemy3.update();
        nightborne.update();
        //console.log(player.getPlayerY());
        //worm.update();
    }
    else{

    }
}