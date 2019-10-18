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

    @property(cc.Prefab)
    alienship1:cc.Prefab = null;
    @property(cc.Prefab)
    alienship2:cc.Prefab = null;
    @property(cc.Prefab)
    alienship3:cc.Prefab = null;

    @property(cc.Prefab)
    bigguy:cc.Prefab = null;
    @property(cc.Label)
    score:cc.Label = null;

    ActualScore:number = 0;
   
    // LIFE-CYCLE CALLBACKS:

    
    spawnCount:number = 0;

    spawnShips()
    {
        var ships = [this.alienship1,this.alienship2,this.alienship3];
        var random = Math.floor(Math.random()*ships.length);
        var newShip = cc.instantiate(ships[random]);
        var randomX = [170,0,-170];
        var randX = Math.floor(Math.random()*randomX.length);
        newShip.setPosition(randX,(this.node.position.y*2)+(newShip.getContentSize().height*2));
        this.node.addChild(newShip);

        this.spawnCount++;
        if(this.spawnCount>= 5){
            this.spawnBigGuy();
        }
    }
    spawnBigGuy(){
        this.spawnCount = 0;
        var newBoss = cc.instantiate(this.bigguy);
        newBoss.setPosition(this.node.position.x,(this.node.position.y*2)+newBoss.getContentSize().height);
        this.node.addChild(newBoss);
    }
    AddScore(){
        this.ActualScore += 10;
        this.score.string = "SCORE: "+this.ActualScore.toString();

       
    }


    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

    }

    start () {

    }

    // update (dt) {}
}
