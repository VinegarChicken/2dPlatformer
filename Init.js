var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

class MainGame{
    constructor(sizex, sizey) {
        this.sizex = sizey;
        this.sizey = sizey;
        config.width = this.sizex;
        config.height = this.sizey;
        new Phaser.Game(config);
    }
}

const game = new MainGame(800, 600);
var platforms;
var player;
function preload()
{
    this.load.spritesheet('hero', 'assets/hero/adventurer-v1.5-Sheet.png', { frameWidth: 50, frameHeight: 37 });
    this.load.image('bg', "assets/bg.png");
    this.load.image('platform', "assets/platform.png");
}
function create()
{
    this.add.image(BGWIDTH, BGHEIGHT, 'bg');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    player = new Player(this);
    player.addPlayerCollider(platforms);

}

function update()
{
    player.update();
}
