var platforms;
var player;
var enemy;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
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
    this.load.spritesheet('slime', 'assets/slime-Sheet.png', { frameWidth: 32, frameHeight: 25 });
    this.load.image('bg', "assets/bg.png");
    this.load.image('platform', "assets/platform.png");
   // this.load.json('hero_collision', "assets/hero.json");
}

function create()
{
    this.add.image(300, 400, 'bg').setScale(1.5);
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    player = new Player(this);
    enemy = new Enemy(this);
    player.addPlayerCollider(platforms);
    enemy.addCollider(platforms);
    player.addPlayerCollider(enemy.getEnemyObj());
}

function update()
{
    player.update();
    enemy.update();

}