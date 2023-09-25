
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
    farmer: cc.Node = null;
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
        this.farmer.on(cc.Node.EventType.TOUCH_START, this.nguoiLenThuyen, this);

    }
    countRaft = 0;
    soiOnRaft = false;
    isMoveOnRaft = false;
    pos1On = false;
    pos2On = false;
    soiP1 = false;
    soiP2 = false;
    soiBoTrai = true;

    SoiLenThuyen() {
        if (this.isMoveOnRaft) return;

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
        if (!this.pos1On) {
            pos = this.pos1;

        }
        else if (!this.pos2On) {
            pos = this.pos2;
        }
        if (this.soiOnRaft) {
            this.isMoveOnRaft = true;
            let posG;
            if (this.soiBoTrai) {
                posG = cc.v3(-380, -460, 0);
            }
            else {
                posG = cc.v3(300, -80, 0);
            }
            t(this.soi)
                .parallel(
                    t().to(0.2, { position: posG }),
                    t().to(0.2, { scaleX: 0.3 }),
                    t().to(0.2, { scaleY: 0.3 }),
                )
                .call(() => {
                    this.soiOnRaft = false;
                    if (this.soiP1) {
                        this.pos1On = false;
                        this.soiP1 = false;
                    }
                    else if (this.soiP2) {
                        this.pos2On = false;
                        this.soiP2 = false;
                    }
                    this.isMoveOnRaft = false;
                })
                .start();
        }
        else {
            if (this.pos1On && this.pos2On) {
                console.log("full raft");
                return;
            }
            this.isMoveOnRaft = true;
            t(this.soi)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.soi) }),
                    t().to(0.2, { scaleX: 0.2 }),
                    t().to(0.2, { scaleY: 0.2 }),
                )
                .call(() => {
                    this.soiOnRaft = true;
                    if (pos == this.pos1) {
                        this.pos1On = true;
                        this.soiP1 = true;
                    }
                    else if (pos == this.pos2) {
                        this.pos2On = true;
                        this.soiP2 = true;
                    }
                    this.isMoveOnRaft = false;
                })

                .start();
        }


    }
    cuuOnRaft = false;
    cuuP1 = false;
    cuuP2 = false;
    cuuBoTrai = true;
    CuuLenThuyen() {
        // console.log(this.countRaft);
        if (this.isMoveOnRaft) return;

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
        if (!this.pos1On) {
            pos = this.pos1;

        }
        else if (!this.pos2On) {
            pos = this.pos2;
        }
        if (this.cuuOnRaft) {
            this.isMoveOnRaft = true;
            let posG;
            if (this.cuuBoTrai) {
                posG = cc.v3(-500, -400, 0);
            }
            else {
                posG = cc.v3(190, -20, 0);

            }
            t(this.cuu)
                .parallel(
                    t().to(0.2, { position: posG }),
                    t().to(0.2, { scaleX: 0.3 }),
                    t().to(0.2, { scaleY: 0.3 }),
                )
                .call(() => {
                    this.cuuOnRaft = false;
                    if (this.cuuP1) {
                        this.pos1On = false;
                        this.cuuP1 = false;
                    }
                    else if (this.cuuP2) {
                        this.pos2On = false;
                        this.cuuP2 = false;
                    }
                    this.isMoveOnRaft = false;

                })
                .start();
        }
        else {
            if (this.pos1On && this.pos2On) {
                console.log("full raft");
                return;
            }
            this.isMoveOnRaft = true;
            t(this.cuu)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.cuu) }),
                    t().to(0.2, { scaleX: 0.2 }),
                    t().to(0.2, { scaleY: 0.2 }),
                )
                .call(() => {
                    this.cuuOnRaft = true;
                    if (pos == this.pos1) {
                        this.pos1On = true;
                        this.cuuP1 = true;
                    }
                    else if (pos == this.pos2) {
                        this.pos2On = true;
                        this.cuuP2 = true;
                    }
                    this.isMoveOnRaft = false;

                })

                .start();
        }

    }
    cuCaiOnRaft = false;
    caiP1 = false;
    caiP2 = false;
    caiBoTrai = true;
    CaiLenThuyen() {
        console.log(this.countRaft);
        if (this.isMoveOnRaft) return;

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
        if (!this.pos1On) {
            pos = this.pos1;

        }
        else if (!this.pos2On) {
            pos = this.pos2;
        }
        if (this.cuCaiOnRaft) {
            this.isMoveOnRaft = true;
            let posG;
            if (this.caiBoTrai) {
                posG = cc.v3(-200, -500, 0);
            }
            else {
                posG = cc.v3(450, -100, 0);

            }
            t(this.cuCai)
                .parallel(
                    t().to(0.2, { position: posG }),
                    t().to(0.2, { scaleX: 0.3 }),
                    t().to(0.2, { scaleY: 0.3 }),
                )
                .call(() => {
                    this.cuCaiOnRaft = false;
                    if (this.caiP1) {
                        this.pos1On = false;
                        this.caiP1 = false;
                    }
                    else if (this.caiP2) {
                        this.pos2On = false;
                        this.caiP2 = false;
                    }
                    this.isMoveOnRaft = false;

                })
                .start();
        }
        else {
            if (this.pos1On && this.pos2On) {
                console.log("full raft");
                return;
            }
            this.isMoveOnRaft = true;
            t(this.cuCai)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.cuCai) }),
                    t().to(0.2, { scaleX: 0.2 }),
                    t().to(0.2, { scaleY: 0.2 }),
                )
                .call(() => {
                    this.cuCaiOnRaft = true;
                    if (pos == this.pos1) {
                        this.pos1On = true;
                        this.caiP1 = true;
                    }
                    else if (pos == this.pos2) {
                        this.pos2On = true;
                        this.caiP2 = true;
                    }
                    this.isMoveOnRaft = false;

                })

                .start();
        }
    }
    farmerOnRaft = false;
    farmerP1 = false;
    farmerP2 = false;
    nguoiBoTrai = true;
    nguoiLenThuyen() {
        if (this.currentState.left.man == 1) {
            this.currentState.left.man = 0;
            this.currentState.right.man = 1;
        }
        else {
            this.currentState.left.man = 1;
            this.currentState.right.man = 0;
        }


        let t = cc.tween;
        let pos: cc.Node = null;
        if (!this.pos1On) {
            pos = this.pos1;
        }
        else if (!this.pos2On) {
            pos = this.pos2;
        }
        if (this.farmerOnRaft) {
            this.isMoveOnRaft = true;
            let posG;
            if (this.nguoiBoTrai) {
                posG = cc.v3(-630, -300, 0);
            }
            else {
                posG = cc.v3(150, -30, 0);

            }
            t(this.farmer)
                .parallel(
                    t().to(0.2, { position: posG}),
                    t().to(0.2, { scaleX: 0.3 }),
                    t().to(0.2, { scaleY: 0.3 }),
                )
                .call(() => {
                    this.farmerOnRaft = false;
                    if (this.farmerP1) {
                        this.pos1On = false;
                        this.farmerP1 = false;
                    }
                    else if (this.farmerP2) {
                        this.pos2On = false;
                        this.farmerP2 = false;
                    }
                    this.isMoveOnRaft = false;

                })
                .start();
        }
        else {
            if (this.pos1On && this.pos2On) {
                console.log("full raft");
                return;
            }
            this.isMoveOnRaft = true;
            t(this.farmer)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.farmer) }),
                    t().to(0.2, { scaleX: 0.2 }),
                    t().to(0.2, { scaleY: 0.2 }),
                )
                .call(() => {
                    this.farmerOnRaft = true;
                    if (pos == this.pos1) {
                        this.pos1On = true;
                        this.farmerP1 = true;
                    }
                    else if (pos == this.pos2) {
                        this.pos2On = true;
                        this.farmerP2 = true;
                    }
                    this.isMoveOnRaft = false;
                })

                .start();
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


