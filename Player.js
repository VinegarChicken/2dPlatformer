class Player{
    constructor(game){
        this.game = game;
        this.anims = this.game.anims;
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
            key: 'swordspin',
            frames: this.anims.generateFrameNumbers('hero', {start: 39, end: 51}),
            frameRate: 10,
        });
        this.anims.create({
            key: 'doubleslash',
            frames: this.anims.generateFrameNumbers('hero', {start: 52, end: 57}),
            frameRate: 10,
        });
        this.player = this.game.physics.add.sprite(100, 450, 'hero');
        this.player.setScale(3);
        //this.cam.follow(this.player);
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
    getPlayerDir(){
        return this.player.flipX
    }
    isPlayerGrounded(){
        return this.player.body.touching.down;
    }
    isPlayerAttacking(){
        return this.player.anims.currentAnim.key === 'swordspin' || this.player.anims.currentAnim.key === 'doubleslash' ||
            this.player.anims.currentAnim.key === 'slidekick'
    }
    addPlayerCollider(object){
        this.game.physics.add.collider(this.player, object);
    }
    update(){
        var cursors = this.game.input.keyboard.createCursorKeys();
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

    }
}