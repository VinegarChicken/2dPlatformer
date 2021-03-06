class Player{
    constructor(game, x, y){
        this.game = game;
        this.anims = this.game.anims;
        this.x = x;
        this.y = y;
        this.isDead = false;
        this.health = 400;
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('hero', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('hero', {start: 8, end: 12}),
            frameRate: 10,
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('hero', {start: 14, end: 21}),
            frameRate: 10
        });
        this.anims.create({
            key: 'crouch',
            frames: this.anims.generateFrameNumbers('hero', {start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('hero', {start: 22, end: 23}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'slidekick',
            frames: this.anims.generateFrameNumbers('hero', {start: 24, end: 28}),
            frameRate: 10,
        });
        this.anims.create({
            key: 'doubleslash',
            frames: this.anims.generateFrameNumbers('hero', {start: 39, end: 51}),
            frameRate: 13,
        });
        this.anims.create({
            key: 'swordspin',
            frames: this.anims.generateFrameNumbers('hero', {start: 52, end: 57}),
            frameRate: 13,
        });
        this.anims.create({
            key: 'killplayer',
            frames: this.anims.generateFrameNumbers('hero', {start: 59, end: 68}),
            frameRate: 10,
        });
        this.player = this.game.physics.add.sprite(this.x, this.y, 'hero')
            .setSize(20, 35)
            .setScale(3);
        this.game.cameras.main.startFollow(this.player, true);
        this.rect = this.game.add.rectangle(this.player.x, this.player.y, 0, 0);

        this.healthbar = this.game.add.graphics()
            .fillStyle(0x43d113, 1.0)
            .fillRect(0, 0, 400, 50);
        this.healthbarcont = this.game.add.graphics()
            .lineStyle(5, 0xd11313, 1.0)
            .fillStyle(0xFFFFFF, 1.0)
            .strokeRect(0, 0, 400, 50);
    };
    changeStatus(status){
        this.currentStatus = status;
        this.player.anims.play(status.anim, true);
        status.action;
    }
    getCurrentStatus(){
        return this.currentStatus;
    }
    setPlayerVelocityX(velocity){
        this.player.setVelocityX(velocity);
    }
    setPlayerVelocityY(velocity){
        this.player.setVelocityY(velocity);
    }
    flipPlayerDir(dir){
        this.player.flipX = dir;
    }
    getPlayerObj(){
        return this.player;
    }
    getPlayerX(){
        return this.player.x;
    }
    getPlayerY(){
        return this.player.y;
    }
    getPlayerRect(){
        return this.rect;
    }
    getPlayerDir(){
        return this.player.flipX
    }
    isPlayerGrounded(){
        return this.player.body.onFloor();
    }
    isPlayerAttacking(){
        return this.player.anims.currentAnim.key === 'swordspin' || this.player.anims.currentAnim.key === 'doubleslash' ||
            this.player.anims.currentAnim.key === 'slidekick'
    }
    addPlayerCollider(object){
        this.game.physics.add.collider(this.player, object);
    }
    getCurrentAnim(){
        return this.player.anims.currentAnim.key;
    }
    kill(){
        this.isDead = true;
        this.changeStatus({
           anim: 'killplayer',
           action: 0
        });
    }
    swordSpinAttack(){
        var dir;
        if(!this.getPlayerDir()){
            dir = 1;
        }
        else{
            dir = -1;
        }
        if(this.player.anims.currentFrame.index === 4){
            this.rect = this.game.add.rectangle(this.player.x + 50 * dir, this.player.y + 20, 40, 25);
            this.game.physics.add.staticGroup(this.rect, false);
        }
        else{
            this.rect.destroy();
        }
    }
    slideKick(){
        var dir;
        if(!this.getPlayerDir()){
            dir = 1;
        }
        else{
            dir = -1;
        }
        if(this.player.anims.currentFrame.index < 5){
            this.rect = this.game.add.rectangle(this.player.x + 50 * dir, this.player.y + 40, 40, 25);
            this.game.physics.add.staticGroup(this.rect, false);
        }
        else{
            this.rect.destroy();
        }
    }
    doubleSlash(){
        var dir;
        if(!this.getPlayerDir()){
            dir = 1;
        }
        else{
            dir = -1;
        }
        if(this.player.anims.currentFrame.index === 6){
            this.rect = this.game.add.rectangle(this.player.x + 50 * dir, this.player.y, 40, 60);
            this.game.physics.add.staticGroup(this.rect, false);
        }
        else if(this.player.anims.currentFrame.index === 12){
            this.rect = this.game.add.rectangle(this.player.x + 50 * dir, this.player.y, 40, 60);
            this.game.physics.add.staticGroup(this.rect, false);
        }
        else{
            this.rect.destroy();
        }
    }
    healthBar(){
        this.healthbar.x = this.player.x - 340;
        this.healthbar.y = this.player.y - 250;
        this.healthbarcont.x = this.player.x - 340;
        this.healthbarcont.y = this.player.y - 250;
        this.healthbar.scaleX = this.health / 400;
    }
    update(){
        var cursors = this.game.input.keyboard.createCursorKeys();
       // console.log("Player x coords: " + this.player.x + " Player y coords: " + this.player.y);
        //scoreText.setPosition(this.player.x, this.player.x);
        if(!this.isDead){
            this.healthBar();
            if (cursors.left.isDown)
            {
                if(this.isPlayerGrounded()){
                    this.flipPlayerDir(true);
                    this.changeStatus({
                        anim: 'run',
                        action: this.setPlayerVelocityX(-160)
                    });
                }
                else{
                    this.setPlayerVelocityX(-160);
                }
            }
            else if (cursors.right.isDown)
            {
                if(this.isPlayerGrounded()){
                    this.flipPlayerDir(false);
                    this.changeStatus({
                        anim: 'run',
                        action: this.setPlayerVelocityX(160)
                    });
                }
                else{
                    this.setPlayerVelocityX(160);
                }
            }
            else if (cursors.shift.isDown && cursors.space.isDown)
            {
                this.changeStatus({
                    anim: 'doubleslash',
                    action: this.setPlayerVelocityX(0)
                });
                /*
                this.rect = this.game.add.rectangle(this.player.x + 50, this.player.y, 40, 40);
                this.game.physics.add.existing(this.rect, false);
                 */
            }
            else if (cursors.down.isDown && cursors.space.isDown){
                let velo;
                if(this.getPlayerDir()){
                    velo = -160;
                }
                else{
                    velo = 160
                }
                this.changeStatus({
                    anim: 'slidekick',
                    action: this.setPlayerVelocityX(velo)
                });
            }
            else if (cursors.space.isDown)
            {
                this.changeStatus({
                    anim: 'swordspin',
                    action: this.setPlayerVelocityX(0)
                });
            }
            else if (this.isPlayerGrounded() && cursors.down.isDown && !this.isPlayerAttacking())
            {
                this.changeStatus({
                    anim: 'crouch',
                    action: this.setPlayerVelocityX(0)
                });
            }
            else if (this.isPlayerGrounded() && !this.isPlayerAttacking())
            {
                this.changeStatus({
                    anim: 'idle',
                    action: this.setPlayerVelocityX(0)
                });
            }
            if(this.isPlayerGrounded() && this.isPlayerAttacking() && !this.player.anims.isPlaying)
            {
                this.changeStatus({
                    anim: 'idle',
                    action: this.setPlayerVelocityX(0)
                });
            }
            if (cursors.up.isDown && this.isPlayerGrounded())
            {
                this.changeStatus({
                    anim: 'jump',
                    action: this.setPlayerVelocityY(-270)
                });
            }
            if(!this.player.anims.isPlaying && !this.isPlayerGrounded())
            {
                this.changeStatus({
                    anim: 'fall',
                    action: 0
                });
            }
            else if(this.player.anims.isPlaying){
                if(this.player.anims.currentAnim.key === 'swordspin'){
                    this.swordSpinAttack();
                }
               else if(this.player.anims.currentAnim.key === 'slidekick'){
                    this.slideKick();
                }
                else if(this.player.anims.currentAnim.key === 'doubleslash'){
                    this.doubleSlash();
                }
                else{
                    this.rect.destroy();
                }
            }
        }
        else if(this.player.anims !== undefined && !this.player.anims.isPlaying){
            this.player.destroy();
        }
    }
}
