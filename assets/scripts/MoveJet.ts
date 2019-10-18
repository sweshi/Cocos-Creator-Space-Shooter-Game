// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    moveLeft:number = 0;
    moveRight:number = 0;
    // LIFE-CYCLE CALLBACKS:

    //bullets
    @property(cc.Prefab)
    greenBullet:cc.Prefab = null;

    @property({
        type:cc.AudioClip
    })
    gun2 = null;

    shootBullets(){
        var bullet = cc.instantiate(this.greenBullet);
        bullet.setPosition(this.node.position.x,this.node.position.y);
        this.node.parent.addChild(bullet);
        cc.audioEngine.playEffect(this.gun2,false);
    }

    moveJet(event){
        switch(event.keyCode){
            case cc.macro.KEY.left:
                this.moveLeft = 1;
                break;
            case cc.macro.KEY.right:
                this.moveRight = 1;
                break;
        }
    }
    stopJet(event){
        switch(event.keyCode){
            case cc.macro.KEY.left:
                this.moveLeft = 0;
                break;
            case cc.macro.KEY.right:
                this.moveRight = 0;
                break;
        }
    }
    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.moveJet,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.stopJet,this);

        //Touch input
        this.node.parent.on('touchstart',function(event){
            if(event.getLocationX()<this.node.parent.getContentSize().width/2){
                this.moveLeft = 1;
            }
            if(event.getLocationX()>this.node.parent.getContentSize().width/2){
                this.moveRight = 1;
            }
        },this);
        this.node.parent.on('touchend',function(event){
            this.moveRight = 0;
            this.moveLeft = 0;
        },this);

        this.schedule(this.shootBullets,0.2,cc.macro.REPEAT_FOREVER,0);
    }

    start () {

    }

    update (dt) {
        if(this.moveLeft == 1){
            this.node.setPosition(this.node.position.x -= 300*dt,this.node.position.y);
        }
        if(this.moveRight == 1){
            this.node.setPosition(this.node.position.x += 300*dt,this.node.position.y);
        }
    }
}
