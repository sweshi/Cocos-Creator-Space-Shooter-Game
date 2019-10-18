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

    @property
    duration:number = 0.5;
    @property
    moveAmountX:number = 300;
    @property
    moveAmountY:number =75;
    moveEnemy:cc.ActionInterval;

    @property(cc.Prefab)
    YellowBullet:cc.Prefab  = null;
    @property
    ShootFrequency:number = 3.0;
   
    
    enemyLife:number = 6;
    playAnimation:boolean = true;

    // LIFE-CYCLE CALLBACKS:

    setMovements(){
        var moveLeft = cc.moveBy(this.duration,cc.v2(-this.moveAmountX,-this.moveAmountY)).easing(cc.easeCircleActionInOut());
        var moveRight = cc.moveBy(this.duration,cc.v2(this.moveAmountX,-this.moveAmountY)).easing(cc.easeCircleActionInOut());
        return cc.repeatForever(cc.sequence(moveLeft,moveRight));
    }
    spawnBullets(){
        var Bullet = cc.instantiate(this.YellowBullet);
        Bullet.setPosition(this.node.position.x,this.node.position.y);
        this.node.parent.addChild(Bullet);

        var Bullet = cc.instantiate(this.YellowBullet);
        Bullet.setPosition(this.node.position.x+this.node.getContentSize().width,this.node.position.y);
        this.node.parent.addChild(Bullet);

        var Bullet = cc.instantiate(this.YellowBullet);
        Bullet.setPosition(this.node.position.x-this.node.getContentSize().width,this.node.position.y);
        this.node.parent.addChild(Bullet);
    }
    onLoad () {
        this.moveEnemy = this.setMovements();
        this.node.runAction(this.moveEnemy);
        this.schedule(this.spawnBullets,this.ShootFrequency,cc.macro.REPEAT_FOREVER,3.0);

        cc.director.preloadScene('Menu');
    }
    onCollisionEnter(otherCollider,selfCollider){
        if(otherCollider.name == "greenbullet<PolygonCollider>"){
            this.enemyLife -=1;
            if((this.enemyLife<=0)&&(this.playAnimation == true)){
                this.node.stopAllActions();
                this.playAnimation = false;
                this.node.getComponent(cc.Animation).play();
            }
        }
        if(otherCollider.name == "player<PolygonCollider>"){
            cc.director.loadScene('Menu');
        }
    }
    removeExplosion(){
        this.node.destroy();
        this.node.parent.getComponent('Game').spawnShips();
        this.node.parent.getComponent('Game').AddScore();
        this.node.parent.getComponent('Game').AddScore();
    }
    
    start () {

    }

    update (dt) {
        if(this.node.position.y<= -(this.node.parent.getContentSize().height)){
            this.node.destroy();
            cc.director.loadScene('Menu');
        }
    }
}
