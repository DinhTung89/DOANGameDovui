
const { ccclass, property } = cc._decorator;

@ccclass
export default class QuaSongCtrl extends cc.Component {

    @property(cc.Node)
    soi: cc.Node = null;
    @property(cc.Node)
    cuu: cc.Node = null;
    @property(cc.Node)
    cuCai: cc.Node = null;
    @property(cc.Node)
    fammer: cc.Node = null;
    @property(cc.Node)
    raft: cc.Node = null;
    @property(cc.Node)
    pos1: cc.Node = null;
    @property(cc.Node)
    pos2: cc.Node = null;

    //Cuu an bap
    State1 = {
        left: { wolves: 0, sheep: 1, radish: 1, man: 0 },
        right: { wolves: 1, sheep: 0, radish: 0, man: 1 }
    };
    //Soi An Cuu
    State2 = {
        left: { wolves: 1, sheep: 1, radish: 0, man: 0 },
        right: { wolves: 0, sheep: 0, radish: 1, man: 1 }
    };

    //Cuu an bap
    State3 = {
        left: { wolves: 1, sheep: 0, radish: 0, man: 1 },
        right: { wolves: 0, sheep: 1, radish: 1, man: 0 }
    };
    //Soi An Cuu
    State4 = {
        left: { wolves: 0, sheep: 0, radish: 1, man: 1 },
        right: { wolves: 1, sheep: 1, radish: 0, man: 0 }
    };
    //Soi An Cuu
    State5 = {
        left: { wolves: 1, sheep: 1, radish: 1, man: 0 },
        right: { wolves: 0, sheep: 0, radish: 0, man: 1 }
    };
    //End
    StateEnd = {
        left: { wolves: 0, sheep: 0, radish: 0, man: 0 },
        right: { wolves: 1, sheep: 1, radish: 1, man: 1 }
    };
    currentState = {
        left: { wolves: 1, sheep: 1, radish: 1, man: 1 },
        right: { wolves: 0, sheep: 0, radish: 0, man: 0 }
    }
    arrayState: any[] = [];
    protected start(): void {
        this.arrayState.push(this.State1);
        this.arrayState.push(this.State2);
        this.arrayState.push(this.State3);
        this.arrayState.push(this.State4);
        this.arrayState.push(this.State5);
        this.arrayState.push(this.StateEnd);
        this.checkSate();
        this.soi.on(cc.Node.EventType.TOUCH_START, this.SoiLenThuyen, this);
        this.cuu.on(cc.Node.EventType.TOUCH_START, this.CuuLenThuyen, this);
        this.cuCai.on(cc.Node.EventType.TOUCH_START, this.CaiLenThuyen, this);
        this.fammer.on(cc.Node.EventType.TOUCH_START, this.fammerOnBoat, this);

    }
    countRaft = 0;
    soiOnRaft = false;
    SoiLenThuyen() {
        console.log(this.countRaft);

        if (this.countRaft == 2) {
            console.log("full raft");
            return;

        }
        if (this.currentState.left.wolves == 1) {
            this.currentState.left.wolves = 0;
            this.currentState.right.wolves = 1;
        }
        else {
            this.currentState.left.wolves = 1;
            this.currentState.right.wolves = 0;
        }
        let t = cc.tween;
        let pos: cc.Node = null;
        if (this.countRaft == 0) {
            pos = this.pos1;

        }
        else {
            pos = this.pos2;
        }
        if (this.soiOnRaft) {
            t(this.soi)
                .parallel(
                    t().to(0.5, { position: cc.v3(-380, -460, 0) }),
                    t().to(0.5, { scaleX: 0.3 }),
                    t().to(0.5, { scaleY: 0.3 }),
                )
                .call(() => {
                    this.soiOnRaft = false;
                    this.countRaft -= 1;
                })
                .start();
        }
        else {
            t(this.soi)
                .parallel(
                    t().to(0.5, { position: this.changePosition(pos, this.soi) }),
                    t().to(0.5, { scaleX: 0.2 }),
                    t().to(0.5, { scaleY: 0.2 }),
                )
                .call(() => {
                    this.soiOnRaft = true;
                    this.countRaft += 1;
                })

                .start();
        }


    }
    cuuOnRaft = false;
    CuuLenThuyen() {
        console.log(this.countRaft);

        if (this.currentState.left.sheep == 1) {
            this.currentState.left.sheep = 0;
            this.currentState.right.sheep = 1;
        }
        else {
            this.currentState.left.sheep = 1;
            this.currentState.right.sheep = 0;
        }
        let t = cc.tween;
        let pos: cc.Node = null;
        if (this.countRaft == 0) {
            pos = this.pos1;

        }
        else {
            pos = this.pos2;
        }
        if (this.cuuOnRaft) {
            t(this.cuu)
                .parallel(

                    
                    t().to(0.5, { position: cc.v3(-500, -400, 0) }),
                    t().to(0.5, { scaleX: 0.3 }),
                    t().to(0.5, { scaleY: 0.3 }),
                )
                .call(() => {
                    this.cuuOnRaft = false;
                    this.countRaft -= 1;
                })
                .start();
        }
        else {
            t(this.cuu)
                .parallel(
                    t().to(0.5, { position: this.changePosition(pos, this.cuu) }),
                    t().to(0.5, { scaleX: 0.2 }),
                    t().to(0.5, { scaleY: 0.2 }),
                )
                .call(() => {
                    this.cuuOnRaft = true;
                    this.countRaft += 1;
                })

                .start();
        }

    }
    cuCaiOnBoat = false;

    CaiLenThuyen() {
        console.log(this.countRaft);

        if (this.currentState.left.radish == 1) {
            this.currentState.left.radish = 0;
            this.currentState.right.radish = 1;
        }
        else {
            this.currentState.left.radish = 1;
            this.currentState.right.radish = 0;

        }
        let t = cc.tween;
        let pos: cc.Node = null;
        if (this.countRaft == 0) {
            pos = this.pos1;

        }
        else {
            pos = this.pos2;
        }
        if (this.cuCaiOnBoat) {
            t(this.cuCai)
                .parallel(
                    t().to(0.5, { position: cc.v3(-630, -320, 0) }),
                    t().to(0.5, { scaleX: 0.3 }),
                    t().to(0.5, { scaleY: 0.3 }),
                )
                .call(() => {
                    this.cuCaiOnBoat = false;
                    this.countRaft -= 1;
                })
                .start();
        }
        else {
            t(this.cuCai)
                .parallel(
                    t().to(0.5, { position: this.changePosition(pos, this.cuCai) }),
                    t().to(0.5, { scaleX: 0.2 }),
                    t().to(0.5, { scaleY: 0.2 }),
                )
                .call(() => {
                    this.cuCaiOnBoat = true;
                    this.countRaft += 1;
                })

                .start();
        }
    }
    isFammerOnBoat = false;
    fammerOnBoat() {
        if (this.isFammerOnBoat) {
            this.isFammerOnBoat = false;
        }
        else {
            this.isFammerOnBoat = true;
        }
        if (this.currentState.left.man == 1) {
            this.currentState.left.man = 0;
            this.currentState.right.man = 1;
        }
        else {
            this.currentState.left.man = 1;
            this.currentState.right.man = 0;
        }

    }
    checkSate() {
        for (let i = 0; i < this.arrayState.length; i++) {

            if (this.currentState == this.arrayState[0] || this.currentState == this.arrayState[2]) {
                console.log("Cừu ăn củ cải");

            }
            if (this.currentState == this.arrayState[1]
                || this.currentState == this.arrayState[3]
                || this.currentState == this.arrayState[4]) {
                console.log("Sói ăn cừu");

            }
            if (this.currentState == this.StateEnd) {
                console.log("Win");

            }
        }
    }

    changePosition(currentNode: cc.Node, toNode?: cc.Node): cc.Vec3 {
        if (currentNode.parent) {
            var currentPostWorld = currentNode.parent.convertToWorldSpaceAR(currentNode.position);
        }
        else {
            // console.log('Change Pos: '+currentNode.position);

            return currentNode.position;
        }
        if (toNode) {
            var newPosInToNode = toNode.parent.convertToNodeSpaceAR(currentPostWorld);
            // console.log('Change Pos: '+newPosInToNode);
            return newPosInToNode;
        } else {
            // console.log('Change Pos: '+currentPostWorld);
            return currentPostWorld;
        }
    }

    ChangeParent(node: cc.Node, parentNode: cc.Node) {
        var currentPostWorld = node.parent.convertToWorldSpaceAR(node.position);
        var newPosInToNode = parentNode.convertToNodeSpaceAR(currentPostWorld);
        node.setParent(parentNode);
        node.setPosition(newPosInToNode);
    }

}


