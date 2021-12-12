var isPlayerAttacking;

class Enemy{
    constructor(game, x, y) {
        //super(game);
        this.game = game;
        this.anims = this.game.anims;
        this.x = x;
        this.y = y;
        this.health = 100;
        //Is the enemy being hit
        this.countedhit = false;
        this.isHit = false;
        this.hitframectr = 0;

        //Is the player being hit TODO: do player stuff in player class
        this.countedplayerhit = false;
        this.isplayerHit = false;
        this.playerhitframectr = 0;
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
        this.healthbar = this.game.add.graphics()
            .fillStyle(0x43d113, 1.0)
            .fillRect(0, 0, 100, 20);
        this.healthbarcont = this.game.add.graphics()
            .lineStyle(5, 0xd11313, 1.0)
            .fillStyle(0xFFFFFF, 1.0)
            .strokeRect(0, 0, 100, 20);

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
    getEnemyDir(){
        return this.enemy.flipX;
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
        score += 30;
        scoreText.text = "Score: " + score;
        this.healthbar.destroy();
        this.healthbarcont.destroy();
    }
    damageFly(){
        if(player.getPlayerX() > this.enemy.x){
            this.setEnemyVelocityX(-500);
            this.setEnemyVelocityY(-50);
        }
        else if(this.enemy.x > player.getPlayerX()){
            this.setEnemyVelocityX(500);
            this.setEnemyVelocityY(-50);
        }
    }
    healthBar(){
        this.healthbar.x = this.enemy.x - 50;
        this.healthbar.y = this.enemy.y - 50;
        this.healthbarcont.x = this.enemy.x - 50;
        this.healthbarcont.y = this.enemy.y - 50;
        this.healthbar.scaleX = this.health / 100;
    }
    update(){
        if(!this.isDead){
           this.healthBar();
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
                    if(!this.countedhit && this.health > 0){
                        switch(player.getCurrentAnim()){
                            case 'swordspin':
                                this.health -= 50;
                                break;
                            case 'slidekick':
                                this.health -= 25;
                                break;
                            case 'doubleslash':
                                this.health -= 75;
                                break;
                        }
                        this.countedhit = true;
                        this.isHit = true;
                    }
                    else if(this.health <= 0){
                        this.kill();
                    }
                }, null, this);
            }
            if(this.isHit){
                this.hitframectr++;
                if(this.hitframectr < 30 && this.health > 0){
                   this.damageFly();
                }
                else{
                    this.hitframectr = 0;
                    this.isHit = false;
                    this.countedhit = false;
                }
            }
            /*
            this.game.physics.collide(this.enemy, player.getPlayerObj(), function(){
                //player.kill();
            }, null, this);

             */
            this.game.physics.collide(this.enemy, player.getPlayerObj(), function(){
                if(!this.countedplayerhit && player.health > 0){
                    player.health -= 40;
                    this.countedplayerhit = true;
                    this.isplayerHit = true;
                }
                else if(player.health <= 0){
                    player.kill();
                }
            }, null, this);
            if(this.isplayerHit){
                this.playerhitframectr++;
                if(this.playerhitframectr < 30 && player.health > 0){
                    if(player.getPlayerX() > this.enemy.x){
                        player.setPlayerVelocityX(500);
                        player.setPlayerVelocityY(-50);
                    }
                    else if(this.enemy.x > player.getPlayerX()){
                        player.setPlayerVelocityX(-500);
                        player.setPlayerVelocityY(-50);
                    }
                }
                else{
                    this.playerhitframectr = 0;
                    this.isplayerHit = false;
                    this.countedplayerhit = false;
                }
            }
        }
        else if(this.isDead){
            this.damageFly();
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
        this.health = 200;
        this.score = 0;
        this.health = 100;
        this.countedhit = false;
        this.isHit = false;
        this.hitframectr = 0;

        this.healthbar = this.game.add.graphics()
            .fillStyle(0x43d113, 1.0)
            .fillRect(0, 0, 100, 20);
        this.healthbarcont = this.game.add.graphics()
            .lineStyle(5, 0xd11313, 1.0)
            .fillStyle(0xFFFFFF, 1.0)
            .strokeRect(0, 0, 100, 20);

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
    damageFly(){
        if(player.getPlayerX() > this.enemy.x){
            this.setEnemyVelocityX(-200);
            this.setEnemyVelocityY(-50);
        }
        else if(this.enemy.x > player.getPlayerX()){
            this.setEnemyVelocityX(200);
            this.setEnemyVelocityY(-50);
        }
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
        score += 90;
        scoreText.text = "Score: " + score;
        this.healthbar.destroy();
        this.healthbarcont.destroy();
    }
    healthBar(){
        this.healthbar.x = this.enemy.x - 50;
        this.healthbar.y = this.enemy.y - 50;
        this.healthbarcont.x = this.enemy.x - 50;
        this.healthbarcont.y = this.enemy.y - 50;
        this.healthbar.scaleX = this.health / 100;
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
            this.healthBar();
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
            if(player.rect !== undefined && player.anims !== undefined){
                this.game.physics.overlap(this.enemy, player.rect, function(){
                    if(!this.countedhit && this.health > 0){
                        switch(player.getCurrentAnim()){
                            case 'swordspin':
                                this.health -= 50;
                                break;
                            case 'slidekick':
                                this.health -= 25;
                                break;
                            case 'doubleslash':
                                this.health -= 75;
                                break;
                        }
                        this.countedhit = true;
                        this.isHit = true;
                    }
                    else if(this.health <= 0){
                        this.kill();
                    }
                }, null, this);
            }
            if(this.isHit){
                this.hitframectr++;
                if(this.hitframectr < 30 && this.health > 0){
                    this.damageFly();
                }
                else{
                    this.hitframectr = 0;
                    this.isHit = false;
                    this.countedhit = false;
                }
            }
            this.game.physics.collide(this.enemy, player.getPlayerObj(), function(){
                if(!this.countedplayerhit && player.health > 0){
                    player.health -= 40;
                    this.countedplayerhit = true;
                    this.isplayerHit = true;
                }
                else if(player.health <= 0){
                    player.kill();
                }
            }, null, this);
            if(this.isplayerHit){
                this.playerhitframectr++;
                if(this.playerhitframectr < 30 && player.health > 0){
                    if(player.getPlayerX() > this.enemy.x){
                        player.setPlayerVelocityX(500);
                        player.setPlayerVelocityY(-50);
                    }
                    else if(this.enemy.x > player.getPlayerX()){
                        player.setPlayerVelocityX(-500);
                        player.setPlayerVelocityY(-50);
                    }
                }
                else{
                    this.playerhitframectr = 0;
                    this.isplayerHit = false;
                    this.countedplayerhit = false;
                }
            }
            if(this.enemy.anims.currentAnim.key === 'nbatk'){
                this.attack();
            }
        }
        else if(this.isDead){
            this.hitframectr++;
            if(this.hitframectr < 30){
                this.damageFly();
            }
            else{
                this.setEnemyVelocityX(0);
            }
        }
        else if (this.enemy.anims !== undefined && !this.enemy.anims.isPlaying){
            this.enemy.destroy();
        }
    }
}
