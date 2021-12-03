class Enemy{
    constructor(game) {
        this.game = game;
        this.anims = this.game.anims;
        this.anims.create({
            key: 'idle2',
            frames: this.anims.generateFrameNumbers('slime', {start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'atk',
            frames: this.anims.generateFrameNumbers('slime', {start: 7, end: 12}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('slime', {start: 13, end: 20}),
            frameRate: 10,
            repeat: -1
        });
        this.enemy = this.game.physics.add.sprite(400, 450, 'slime')
            .setScale(3)
            .setSize(21, 23);
        this.isDead = false;
    }
    changeStatus(status){
        this.currentStatus = status;
        this.enemy.anims.play(status.anim, true);
        status.action;
    }
    setPlayerVelocityX(velocity){
        this.enemy.setVelocityX(velocity);
    }
    setPlayerVelocityY(velocity){
        this.enemy.setVelocityY(velocity);
    }
    isEnemyGrounded(){
        return this.enemy.body.touching.down;
    }
    isEnemyAttacking(){
        return this.enemy.anims.currentAnim.key === 'atk'
    }
    getEnemyObj(){
        return this.enemy;
    }
    addCollider(object){
        this.game.physics.add.collider(this.enemy, object);
    }
    kill(){
        this.isDead = true;
        this.changeStatus({
            anim: 'die',
            action: 0
        });
    }
    update(){
        if(!this.isDead){
            this.changeStatus({
                anim: 'idle2',
                action: 0
            });
        }
        else{
            if(this.enemy.anims !== undefined && this.enemy.anims.currentAnim.key === 'die'){
               //this.enemy.destroy();
            }

        }
    }
}