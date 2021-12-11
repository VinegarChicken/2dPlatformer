var isPlayerAttacking;

class Enemy{
    constructor(game, x, y) {
        //super(game);
        this.game = game;
        this.anims = this.game.anims;
        this.x = x;
        this.y = y;
        this.hits = 3;
        this.countedhit = false;
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
            repeat: 0
        });
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('slime', {start: 13, end: 20}),
            frameRate: 10,
            repeat: 0
        });
        this.enemy = this.game.physics.add.sprite(this.x, this.y, 'slime')
            .setScale(3)
            .setSize(25, 18)
            .setOffset(4, 7);
        this.isDead = false;
       // this.addCollider(player.getPlayerObj());
        this.game.physics.overlap(this.enemy, player.getPlayerObj(), function(){
            player.kill();
        }, null, this);
        this.addCollider(tile_layer);
    }
    changeStatus(status){
        this.currentStatus = status;
        this.enemy.anims.play(status.anim, true);
        status.action;
    }
    setEnemyVelocityX(velocity){
        this.enemy.setVelocityX(velocity);
    }
    setEnemyVelocityY(velocity){
        this.enemy.setVelocityY(velocity);
    }
    isEnemyGrounded(){
        return this.enemy.body.onFloor();
    }
    isEnemyAttacking(){
        return this.enemy.anims.currentAnim.key === 'atk'
    }
    flipEnemyrDir(dir){
        this.enemy.flipX = dir;
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
            action: this.setEnemyVelocityX(0)
        });
    }
    update(){
        if(!this.isDead){
            if(this.enemy.x > player.getPlayerX()){
                if(this.enemy.x - player.getPlayerX() < 150){
                    this.changeStatus({
                        anim: 'atk',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(140);
                        this.flipEnemyrDir(true);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-140);
                        this.flipEnemyrDir(false);
                    }
                }
                else{
                    this.changeStatus({
                        anim: 'idle2',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(35);
                        this.flipEnemyrDir(true);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-35);
                        this.flipEnemyrDir(false);
                    }
                }

            }
            else{
                if(!player.getPlayerX() - this.enemy.x < 150){
                    this.changeStatus({
                        anim: 'atk',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(140);
                        this.flipEnemyrDir(true);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-140);
                        this.flipEnemyrDir(false);
                    }
                }
                else{
                    this.changeStatus({
                        anim: 'idle2',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(35);
                        this.flipEnemyrDir(true);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-35);
                        this.flipEnemyrDir(false);
                    }
                }

            }
            if(player.rect !== undefined){
                this.game.physics.overlap(this.enemy, player.rect, function(){
                    this.kill();
                }, null, this);
            }
            this.game.physics.collide(this.enemy, player.getPlayerObj(), function(){
                player.kill();
            }, null, this);
        }
        else if (this.enemy.anims !== undefined && !this.enemy.anims.isPlaying){
            this.enemy.destroy();
        }
    }
}

/*
Doesn't work rn
class WormEnemy{
    constructor(game, x, y) {
        this.game = game;
        this.anims = this.game.anims;
        this.x = x;
        this.y = y;
        this.anims.create({
            key: 'wormidle',
            frames: this.anims.generateFrameNumbers('fireworm', {start: 50, end: 56}),
            frameRate: 10,
            repeat: -1
        });
        this.enemy = this.game.physics.add.sprite(this.x, this.y, 'fireworm')
            .setScale(3)
            .setImmovable(true)
            .setSize(26, 30)
            .setOffset(30, 30);
        this.isDead = false;
        this.addCollider(player.getPlayerObj());
        this.addCollider(tile_layer);
    }
    changeStatus(status){
        this.currentStatus = status;
        this.enemy.anims.play(status.anim, true);
        status.action;
    }
    setEnemyVelocityX(velocity){
        this.enemy.setVelocityX(velocity);
    }
    setEnemyVelocityY(velocity){
        this.enemy.setVelocityY(velocity);
    }
    flipEnemyrDir(dir){
        this.enemy.flipX = dir;
    }
    isEnemyGrounded(){
        return this.enemy.body.onFloor();
    }
    isEnemyAttacking(){
        return this.enemy.anims.currentAnim.key === 'nbatk'
    }
    getEnemyObj(){
        return this.enemy;
    }
    getEnemyDir(){
        return this.enemy.flipX
    }
    addCollider(object){
        this.game.physics.add.collider(this.enemy, object);
    }
    kill(){
        this.isDead = true;
        this.changeStatus({
            anim: 'nbdie',
            action: this.setEnemyVelocityX(0)
        });
    }
    attack(){
        var dir;
        if(!this.getEnemyDir()){
            dir = 1;
        }
        else{
            dir = -1;
        }
        if(this.enemy.anims.currentFrame.index === 10 || this.enemy.anims.currentFrame.index === 10){
            this.swordcol = this.game.add.rectangle(this.enemy.x + 100 * dir, this.enemy.y + 20, 60, 75);
            this.game.physics.add.staticGroup(this.swordcol, false);
            this.game.physics.collide(this.swordcol, player.getPlayerObj(), function(){
                player.kill();
            }, null, this);
            this.swordcol.destroy();
        }
    }
    update(){
        if(!this.isDead){
            if(this.enemy.x > player.getPlayerX()){
                if(this.enemy.x - player.getPlayerX() < 150){
                    this.changeStatus({
                        anim: 'wormidle',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(140);
                        this.flipEnemyrDir(false);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-140);
                        this.flipEnemyrDir(true);
                    }
                }
                else{
                    this.changeStatus({
                        anim: 'wormidle',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(35);
                        this.flipEnemyrDir(false);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-35);
                        this.flipEnemyrDir(true);
                    }
                }

            }
            else{
                if(!player.getPlayerX() - this.enemy.x < 150){
                    this.changeStatus({
                        anim: 'wormidle',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(140);
                        this.flipEnemyrDir(false);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-140);
                        this.flipEnemyrDir(true);
                    }
                }
                else{
                    this.changeStatus({
                        anim: 'wormidle',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(35);
                        this.flipEnemyrDir(false);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-35);
                        this.flipEnemyrDir(true);
                    }
                }

            }
            if(player.rect !== undefined){
                this.game.physics.overlap(this.enemy, player.rect, function(){
                    this.kill();
                }, null, this);
            }
            this.game.physics.collide(this.enemy, player.getPlayerObj(), function(){
                player.kill();
            }, null, this);
            if(this.enemy.anims.currentAnim.key === 'nbatk'){
                this.attack();
                console.log(this.enemy.anims.currentFrame.index);
            }
        }
        else if (this.enemy.anims !== undefined && !this.enemy.anims.isPlaying){
            this.enemy.destroy();
        }
    }
}
*/
class NightBorneEnemy{
    constructor(game, x, y) {
        this.game = game;
        this.anims = this.game.anims;
        this.x = x;
        this.y = y;
        this.hits = 5;
        this.score = 0;
        this.scoreTxt;
        this.anims.create({
            key: 'nbidle',
            frames: this.anims.generateFrameNumbers('nightborne', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'nbrun',
            frames: this.anims.generateFrameNumbers('nightborne', {start: 23, end: 28}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'nbatk',
            frames: this.anims.generateFrameNumbers('nightborne', {start: 46, end: 57}),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'nbhurt',
            frames: this.anims.generateFrameNumbers('nightborne', {start: 69, end: 73}),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'nbdie',
            frames: this.anims.generateFrameNumbers('nightborne', {start: 92, end: 114}),
            frameRate: 5,
            repeat: 0
        });
        this.enemy = this.game.physics.add.sprite(this.x, this.y, 'nightborne')
            .setScale(3)
            .setImmovable(true)
            .setSize(26, 30)
            .setOffset(30, 30);
        this.isDead = false;
        this.game.physics.overlap(this.enemy, player.getPlayerObj(), function(){
            player.kill();
        }, null, this);
        this.addCollider(tile_layer);
    }
    changeStatus(status){
        this.currentStatus = status;
        this.enemy.anims.play(status.anim, true);
        status.action;
    }
    setEnemyVelocityX(velocity){
        this.enemy.setVelocityX(velocity);
    }
    setEnemyVelocityY(velocity){
        this.enemy.setVelocityY(velocity);
    }
    flipEnemyrDir(dir){
        this.enemy.flipX = dir;
    }
    isEnemyGrounded(){
        return this.enemy.body.onFloor();
    }
    isEnemyAttacking(){
        return this.enemy.anims.currentAnim.key === 'nbatk'
    }
    getEnemyObj(){
        return this.enemy;
    }
    getEnemyDir(){
        return this.enemy.flipX
    }
    addCollider(object){
        this.game.physics.add.collider(this.enemy, object);
    }
    kill(){
        this.isDead = true;
        this.changeStatus({
            anim: 'nbdie',
            action: this.setEnemyVelocityX(0)
        });
    }
    attack(){
        var dir;
        if(!this.getEnemyDir()){
            dir = 1;
        }
        else{
            dir = -1;
        }
        if(this.enemy.anims.currentFrame.index === 10 || this.enemy.anims.currentFrame.index === 10){
            this.swordcol = this.game.add.rectangle(this.enemy.x + 100 * dir, this.enemy.y + 20, 60, 75);
            this.game.physics.add.staticGroup(this.swordcol, false);
            this.game.physics.collide(this.swordcol, player.getPlayerObj(), function(){
                player.kill();
            }, null, this);
            this.swordcol.destroy();
        }
    }
    update(){
        if(!this.isDead){
            if(this.enemy.x > player.getPlayerX()){
                if(this.enemy.x - player.getPlayerX() < 150){
                    this.changeStatus({
                        anim: 'nbatk',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(140);
                        this.flipEnemyrDir(false);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-140);
                        this.flipEnemyrDir(true);
                    }
                }
                else{
                    this.changeStatus({
                        anim: 'nbrun',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(35);
                        this.flipEnemyrDir(false);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-35);
                        this.flipEnemyrDir(true);
                    }
                }

            }
            else{
                if(!player.getPlayerX() - this.enemy.x < 150){
                    this.changeStatus({
                        anim: 'nbatk',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(140);
                        this.flipEnemyrDir(false);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-140);
                        this.flipEnemyrDir(true);
                    }
                }
                else{
                    this.changeStatus({
                        anim: 'nbrun',
                        action: 0
                    });
                    if(player.getPlayerX() - 70 > this.enemy.x){
                        this.setEnemyVelocityX(35);
                        this.flipEnemyrDir(false);
                    }
                    else if(this.enemy.x - 70 > player.getPlayerX()){
                        this.setEnemyVelocityX(-35);
                        this.flipEnemyrDir(true);
                    }
                }

            }
            if(player.rect !== undefined){
                this.game.physics.overlap(this.enemy, player.rect, function(){
                    this.kill();
                }, null, this);
            }
            this.game.physics.collide(this.enemy, player.getPlayerObj(), function(){
                player.kill();
            }, null, this);
            if(this.enemy.anims.currentAnim.key === 'nbatk'){
                this.attack();
            }
        }
        else if (this.enemy.anims !== undefined && !this.enemy.anims.isPlaying){
            this.enemy.destroy();
        }
    }
}
