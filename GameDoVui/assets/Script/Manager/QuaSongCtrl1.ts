import WinCtrl from "../GamePlay/WinCtrl";
import Singleton from "./Singleton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class QuaSongCtrl1 extends cc.Component {
    //Comming soon
    @property(cc.Node)
    nhutnhat: cc.Node = null;
    @property(cc.Node)
    kieungao: cc.Node = null;
    @property(cc.Node)
    candam1: cc.Node = null;
    @property(cc.Node)
    candam2: cc.Node = null;
    @property(cc.Node)
    raft: cc.Node = null;
    @property(cc.Node)
    pos1: cc.Node = null;
    @property(cc.Node)
    pos2: cc.Node = null;
    @property(cc.Node)
    btnMove: cc.Node = null;


    @property(cc.Node)
    nhunhatSo1m: cc.Node = null;
    @property(cc.Node)
    kieuNgao1m: cc.Node = null;
    @property(cc.Node)
    nguoilaido: cc.Node = null;
    countFail = 0;
    @property(cc.Node)
    popWin: cc.Node = null;

    //Close Pop
    closeNNSo1m() {
        this.nhunhatSo1m.active = false;
        this.btnMove.active = true;
    }
    closeKN1M() {
        this.kieuNgao1m.active = false;
        this.btnMove.active = true;
    }
    closeNguoi() {
        this.nguoilaido.active = false;
        this.btnMove.active = true;
    }

    //Open Pop
    openNNSo1m() {
        this.countFail -= 1;
        this.nhunhatSo1m.active = true;
        this.btnMove.active = false;
    }

    openKN1M() {
        this.countFail -= 1;
        this.kieuNgao1m.active = true;
        this.btnMove.active = false;
    }

    openNguoi() {
        this.countFail -= 1;
        this.nguoilaido.active = true;
        this.btnMove.active = false;
    }
    // Nguoi nhut nhat khong the o mot minh
    State1 = {
        left: { nn: 0, kn: 1, cd1: 1, cd2: 1 },
        right: { nn: 1, kn: 0, cd1: 0, cd2: 0 }
    };
    State2 = {
        left: { nn: 1, kn: 0, cd1: 0, cd2: 0 },
        right: { nn: 0, kn: 1, cd1: 1, cd2: 1 }
    };

    //End
    StateEnd = {
        left: { nn: 0, kn: 0, cd1: 0, cd2: 0 },
        right: { nn: 1, kn: 1, cd1: 1, cd2: 1 }
    };
    currentState = {
        left: { nn: 1, kn: 1, cd1: 1, cd2: 1 },
        right: { nn: 0, kn: 0, cd1: 0, cd2: 0 }
    }

    arrayState: any[] = [];
    protected onLoad(): void {
        Singleton.QUA_SONG_CTRL1 = this;
    }
    reSet() {
        this.countFail = 5;

        this.closeNguoi();
        this.closeKN1M();
        this.closeNNSo1m();
        this.popWin.active = false;
        this.currentState = {
            left: { nn: 1, kn: 1, cd1: 1, cd2: 1 },
            right: { nn: 0, kn: 0, cd1: 0, cd2: 0 }
        }

        this.ChangeParent(this.nhutnhat, this.node);
        this.ChangeParent(this.kieungao, this.node);
        this.ChangeParent(this.candam1, this.node);
        this.ChangeParent(this.candam2, this.node);

        this.nhutnhat.setPosition(cc.v3(-520, -380, 0));
        this.kieungao.setPosition(cc.v3(-630, -300, 0));
        this.candam1.setPosition(cc.v3(-380, -460, 0));
        this.candam2.setPosition(cc.v3(-200, -500, 0));
        this.raft.setPosition(cc.v3(-230, -260, 0));

        this.knBoTrai = true;
        this.nnBoTrai = true;
        this.cd1BoTrai = true;
        this.cd2BoTrai = true;
        this.raftBoTrai = true;

        this.btnMove.getChildByName("muiten").angle = 0;
    }

    protected start(): void {
        this.arrayState.push(this.State1);
        this.arrayState.push(this.State2);
        this.arrayState.push(this.StateEnd);
        this.nhutnhat.on(cc.Node.EventType.TOUCH_START, this.NNLenThuyen, this);
        this.kieungao.on(cc.Node.EventType.TOUCH_START, this.KNLenThuyen, this);
        this.candam1.on(cc.Node.EventType.TOUCH_START, this.CD1LenThuyen, this);
        this.candam2.on(cc.Node.EventType.TOUCH_START, this.CD2LenThuyen, this);

    }
    countRaft = 0;
    pos1On = false;
    pos2On = false;
    isMoveOnRaft = false;


    // Soi an thittttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
    nnOnRaft = false;
    nnP1 = false;
    nnP2 = false;
    nnBoTrai = true;
    NNLenThuyen() {
        if (this.nnBoTrai && !this.raftBoTrai || !this.nnBoTrai && this.raftBoTrai) return;

        if (this.isMoveOnRaft) return;
        // console.log(this.currentState);

        let t = cc.tween;
        let pos: cc.Node = null;
        if (!this.pos1On) {
            pos = this.pos1;

        }
        else if (!this.pos2On) {
            pos = this.pos2;
        }
        // console.log(pos);

        if (this.nnOnRaft) {
            this.isMoveOnRaft = true;
            this.ChangeParent(this.nhutnhat, this.node);
            let posG;
            if (this.nnBoTrai) {
                posG = cc.v3(-520, -380, 0);
                this.currentState.left.nn = 1;
                this.currentState.right.nn = 0;
            }
            else {
                posG = cc.v3(100, 10, 0);
                this.currentState.left.nn = 0;
                this.currentState.right.nn = 1;
            }
            // console.log(this.currentState);

            t(this.nhutnhat)
                .parallel(
                    t().to(0.2, { position: posG }),
                    t().to(0.2, { scaleX: 0.3 }),
                    t().to(0.2, { scaleY: 0.3 }),
                )
                .call(() => {
                    this.nnOnRaft = false;
                    if (this.nnP1) {
                        this.pos1On = false;
                        this.nnP1 = false;
                    }
                    else if (this.nnP2) {
                        this.pos2On = false;
                        this.nnP2 = false;
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
            if (this.raftBoTrai) {
                this.currentState.left.nn = 0;
                this.currentState.right.nn = 1;
            }
            else {
                this.currentState.left.nn = 1;
                this.currentState.right.nn = 0;
            }
            // console.log(this.currentState);

            t(this.nhutnhat)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.nhutnhat) }),
                    t().to(0.2, { scaleX: 0.25 }),
                    t().to(0.2, { scaleY: 0.25 }),
                )
                .call(() => {
                    this.nnOnRaft = true;
                    if (pos == this.pos1) {
                        this.pos1On = true;
                        this.nnP1 = true;
                    }
                    else if (pos == this.pos2) {
                        this.pos2On = true;
                        this.nnP2 = true;
                    }
                    this.isMoveOnRaft = false;
                    this.ChangeParent(this.nhutnhat, this.raft);
                })

                .start();
        }


    }




    //kieu ngaoonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
    knOnRaft = false;
    knP1 = false;
    knP2 = false;
    knBoTrai = true;
    KNLenThuyen() {
        if (this.knBoTrai && !this.raftBoTrai || !this.knBoTrai && this.raftBoTrai) return;

        if (this.isMoveOnRaft) return;

        let t = cc.tween;
        let pos: cc.Node = null;

        if (!this.pos1On) {
            pos = this.pos1;
        }

        else if (!this.pos2On) {
            pos = this.pos2;
        }

        if (this.knOnRaft) {
            this.ChangeParent(this.kieungao, this.node);
            this.isMoveOnRaft = true;
            let posG;
            if (this.knBoTrai) {
                posG = cc.v3(-630, -300, 0);
                this.currentState.left.kn = 1;
                this.currentState.right.kn = 0;
            }
            else {
                posG = cc.v3(10, 50, 0);
                this.currentState.left.kn = 0;
                this.currentState.right.kn = 1;

            }
            t(this.kieungao)
                .parallel(
                    t().to(0.2, { position: posG }),
                    t().to(0.2, { scaleX: 0.3 }),
                    t().to(0.2, { scaleY: 0.3 }),
                )
                .call(() => {
                    this.knOnRaft = false;
                    if (this.knP1) {
                        this.pos1On = false;
                        this.knP1 = false;
                    }
                    else if (this.knP2) {
                        this.pos2On = false;
                        this.knP2 = false;
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
            if (this.raftBoTrai) {
                this.currentState.left.kn = 0;
                this.currentState.right.kn = 1;
            }
            else {
                this.currentState.left.kn = 1;
                this.currentState.right.kn = 0;
            }
            // console.log(this.currentState);

            t(this.kieungao)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.kieungao) }),
                    t().to(0.2, { scaleX: 0.25 }),
                    t().to(0.2, { scaleY: 0.25 }),
                )
                .call(() => {
                    this.knOnRaft = true;
                    if (pos == this.pos1) {
                        this.pos1On = true;
                        this.knP1 = true;
                    }
                    else if (pos == this.pos2) {
                        this.pos2On = true;
                        this.knP2 = true;
                    }
                    this.isMoveOnRaft = false;
                    this.ChangeParent(this.kieungao, this.raft);


                })

                .start();
        }

    }



    //candam1iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    cd1OnRaft = false;
    cd1P1 = false;
    cd1P2 = false;
    cd1BoTrai = true;
    CD1LenThuyen() {
        if (this.cd1BoTrai && !this.raftBoTrai || !this.cd1BoTrai && this.raftBoTrai) return;

        // console.log(this.countRaft);
        if (this.isMoveOnRaft) return;

        // if (this.currentState.left.radish == 1) {
        //     this.currentState.left.radish = 0;
        //     this.currentState.right.radish = 1;
        // }
        // else {
        //     this.currentState.left.radish = 1;
        //     this.currentState.right.radish = 0;

        // }
        let t = cc.tween;
        let pos: cc.Node = null;
        if (!this.pos1On) {
            pos = this.pos1;

        }
        else if (!this.pos2On) {
            pos = this.pos2;
        }
        if (this.cd1OnRaft) {
            this.ChangeParent(this.candam1, this.node);
            this.isMoveOnRaft = true;
            let posG;
            if (this.cd1BoTrai) {
                posG = cc.v3(-380, -460, 0);
                this.currentState.left.cd1 = 1;
                this.currentState.right.cd1 = 0;
            }
            else {
                posG = cc.v3(200, -40, 0);
                this.currentState.left.cd1 = 0;
                this.currentState.right.cd1 = 1;
            }
            // console.log(this.currentState);

            t(this.candam1)
                .parallel(
                    t().to(0.2, { position: posG }),
                    t().to(0.2, { scaleX: 0.3 }),
                    t().to(0.2, { scaleY: 0.3 }),
                )
                .call(() => {
                    this.cd1OnRaft = false;
                    if (this.cd1P1) {
                        this.pos1On = false;
                        this.cd1P1 = false;
                    }
                    else if (this.cd1P2) {
                        this.pos2On = false;
                        this.cd1P2 = false;
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
            if (this.raftBoTrai) {
                this.currentState.left.cd1 = 0;
                this.currentState.right.cd1 = 1;
            }
            else {
                this.currentState.left.cd1 = 1;
                this.currentState.right.cd1 = 0;
            }
            // console.log(this.currentState);

            t(this.candam1)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.candam1) }),
                    t().to(0.2, { scaleX: 0.25 }),
                    t().to(0.2, { scaleY: 0.25 }),
                )
                .call(() => {
                    this.cd1OnRaft = true;
                    if (pos == this.pos1) {
                        this.pos1On = true;
                        this.cd1P1 = true;
                    }
                    else if (pos == this.pos2) {
                        this.pos2On = true;
                        this.cd1P2 = true;
                    }
                    this.isMoveOnRaft = false;
                    this.ChangeParent(this.candam1, this.raft);

                })

                .start();
        }
    }




    //CanDam2mnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
    cd2OnRaft = false;
    cd2P1 = false;
    cd2P2 = false;
    cd2BoTrai = true;
    CD2LenThuyen() {
        if (this.cd2BoTrai && !this.raftBoTrai || !this.cd2BoTrai && this.raftBoTrai) return;

        let t = cc.tween;
        let pos: cc.Node = null;

        if (!this.pos1On) {
            pos = this.pos1;
        }

        else if (!this.pos2On) {
            pos = this.pos2;
        }

        if (this.cd2OnRaft) {
            this.ChangeParent(this.candam2, this.node);
            this.isMoveOnRaft = true;
            let posG;
            if (this.cd2BoTrai) {
                posG = cc.v3(-200, -500, 0);
                this.currentState.left.cd2 = 1;
                this.currentState.right.cd2 = 0;
            }
            else {
                posG = cc.v3(300, -70, 0);
                this.currentState.left.cd2 = 0;
                this.currentState.right.cd2 = 1;
            }

            t(this.candam2)
                .parallel(
                    t().to(0.2, { position: posG }),
                    t().to(0.2, { scaleX: 0.3 }),
                    t().to(0.2, { scaleY: 0.3 }),
                )
                .call(() => {
                    this.cd2OnRaft = false;
                    if (this.cd2P1) {
                        this.pos1On = false;
                        this.cd2P1 = false;
                    }
                    else if (this.cd2P2) {
                        this.pos2On = false;
                        this.cd2P2 = false;
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
            if (this.raftBoTrai) {
                this.currentState.left.cd2 = 0;
                this.currentState.right.cd2 = 1;
            }
            else {
                this.currentState.left.cd2 = 1;
                this.currentState.right.cd2 = 0;
            }
            // console.log(this.currentState);

            t(this.candam2)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.candam2) }),
                    t().to(0.2, { scaleX: 0.25 }),
                    t().to(0.2, { scaleY: 0.25 }),
                )
                .call(() => {
                    this.cd2OnRaft = true;
                    if (pos == this.pos1) {
                        this.pos1On = true;
                        this.cd2P1 = true;
                    }
                    else if (pos == this.pos2) {
                        this.pos2On = true;
                        this.cd2P2 = true;
                    }
                    this.isMoveOnRaft = false;
                    this.ChangeParent(this.candam2, this.raft);

                })

                .start();
        }
    }
    raftBoTrai = true;
    moveRaft() {
        this.checkSate();
        if (this.isFail) return;
        if (!this.cd2OnRaft && !this.cd1OnRaft && !this.nnOnRaft && !this.knOnRaft) {
            this.openNguoi();
            return;
        }

        if (this.knOnRaft && this.nnOnRaft
            || this.knOnRaft && this.cd1OnRaft
            || this.knOnRaft && this.cd2OnRaft
        ) {
            this.openKN1M();
            return;
        }
        if (this.nnOnRaft && !this.cd1OnRaft && !this.cd2OnRaft) {
            this.openNNSo1m();
            return;
        }

        let pos = null;
        if (!this.raftBoTrai) {
            pos = cc.v3(-230, -260, 0);
        }
        else {
            pos = cc.v3(-100, -130, 0);
        }
        this.btnMove.active = false;
        cc.tween(this.raft)
            .to(0.5, { position: pos })
            .call(() => {
                this.raftBoTrai = !this.raftBoTrai;
                if (this.raftBoTrai) {
                    this.btnMove.getChildByName("muiten").angle = 0;
                }
                else {
                    this.btnMove.getChildByName("muiten").angle = 180;

                }
                if (this.cd1OnRaft) {
                    this.cd1BoTrai = !this.cd1BoTrai;
                    let t = cc.tween;
                    this.ChangeParent(this.candam1, this.node);
                    let posG;
                    if (this.cd1BoTrai) {
                        posG = cc.v3(-380, -460, 0);
                    }
                    else {
                        posG = cc.v3(200, -40, 0);
                    }
                    t(this.candam1)
                        .parallel(
                            t().to(0.2, { position: posG }),
                            t().to(0.2, { scaleX: 0.3 }),
                            t().to(0.2, { scaleY: 0.3 }),
                        )
                        .call(() => {
                            this.cd1OnRaft = false;
                            if (this.cd1P1) {
                                this.pos1On = false;
                                this.cd1P1 = false;
                            }
                            else if (this.cd1P2) {
                                this.pos2On = false;
                                this.cd1P2 = false;
                            }
                            this.isMoveOnRaft = false;

                        })
                        .start();

                }
                if (this.cd2OnRaft) {
                    this.cd2BoTrai = !this.cd2BoTrai;
                    let t = cc.tween;
                    this.ChangeParent(this.candam2, this.node);
                    let posG;
                    if (this.cd2BoTrai) {
                        posG = cc.v3(-200, -500, 0);
                    }
                    else {
                        posG = cc.v3(300, -70, 0);
                    }
                    t(this.candam2)
                        .parallel(
                            t().to(0.2, { position: posG }),
                            t().to(0.2, { scaleX: 0.3 }),
                            t().to(0.2, { scaleY: 0.3 }),
                        )
                        .call(() => {
                            this.cd2OnRaft = false;
                            if (this.cd2P1) {
                                this.pos1On = false;
                                this.cd2P1 = false;
                            }
                            else if (this.cd2P2) {
                                this.pos2On = false;
                                this.cd2P2 = false;
                            }
                            this.isMoveOnRaft = false;

                        })
                        .start();

                }
                if (this.nnOnRaft) {
                    this.nnBoTrai = !this.nnBoTrai;
                    let t = cc.tween;
                    this.ChangeParent(this.nhutnhat, this.node);
                    let posG;
                    if (this.nnBoTrai) {
                        posG = cc.v3(-520, -380, 0);
                    }
                    else {
                        posG = cc.v3(100, 10, 0);
                    }
                    t(this.nhutnhat)
                        .parallel(
                            t().to(0.2, { position: posG }),
                            t().to(0.2, { scaleX: 0.3 }),
                            t().to(0.2, { scaleY: 0.3 }),
                        )
                        .call(() => {
                            this.nnOnRaft = false;
                            if (this.nnP1) {
                                this.pos1On = false;
                                this.nnP1 = false;
                            }
                            else if (this.nnP2) {
                                this.pos2On = false;
                                this.nnP2 = false;
                            }
                            this.isMoveOnRaft = false;
                        })
                        .start();
                }
                if (this.knOnRaft) {
                    this.knBoTrai = !this.knBoTrai;
                    let t = cc.tween;
                    this.ChangeParent(this.kieungao, this.node);
                    let posG;
                    if (this.knBoTrai) {
                        posG = cc.v3(-630, -300, 0);
                    }
                    else {
                        posG = cc.v3(10, 50, 0);

                    }
                    t(this.kieungao)
                        .parallel(
                            t().to(0.2, { position: posG }),
                            t().to(0.2, { scaleX: 0.3 }),
                            t().to(0.2, { scaleY: 0.3 }),
                        )
                        .call(() => {
                            this.knOnRaft = false;
                            if (this.knP1) {
                                this.pos1On = false;
                                this.knP1 = false;
                            }
                            else if (this.knP2) {
                                this.pos2On = false;
                                this.knP2 = false;
                            }
                            this.isMoveOnRaft = false;

                        })
                        .start();
                }
                this.btnMove.active = true;
            })
            .start();

    }
    isFail = false;
    checkSate() {
        if (this.currentState.left.nn == this.arrayState[0].left.nn
            && this.currentState.left.kn == this.arrayState[0].left.kn
            && this.currentState.left.cd1 == this.arrayState[0].left.cd1
            && this.currentState.left.cd2 == this.arrayState[0].left.cd2

            || this.currentState.left.nn == this.arrayState[1].left.nn
            && this.currentState.left.kn == this.arrayState[1].left.kn
            && this.currentState.left.cd1 == this.arrayState[1].left.cd1
            && this.currentState.left.cd2 == this.arrayState[1].left.cd2
        ) {
            console.log("Nhút nhát không thể ở một mình");
            this.openNNSo1m();
            this.isFail = true;
        }

        else if (this.currentState.left.nn == this.arrayState[2].left.nn
            && this.currentState.left.kn == this.arrayState[2].left.kn
            && this.currentState.left.cd1 == this.arrayState[2].left.cd1
            && this.currentState.left.cd2 == this.arrayState[2].left.cd2) {
            console.log("Win");
            setTimeout(() => {
                this.Win();
            }, 1000);
            this.isFail = false;
        }
        else {
            this.isFail = false;
        }

    }

    Win() {
        this.popWin.active = true;
        setTimeout(() => {
            if (this.countFail > 3) {
                WinCtrl.winCtrl.show3sao();
            }
            else if (this.countFail < 4 && this.countFail > 1) {
                WinCtrl.winCtrl.show2sao();
            }
            else {
                WinCtrl.winCtrl.show1sao();
            }
        }, 300);

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


