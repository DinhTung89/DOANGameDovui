import GameQuaSong from "../GamePlay/GameQuaSong";
import WinCtrl from "../GamePlay/WinCtrl";
import { TypeAudio } from "./AudioManager";
import Singleton from "./Singleton";

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
    @property(cc.Node)
    btnMove: cc.Node = null;

    @property(cc.Node)
    soiAnCuu: cc.Node = null;
    @property(cc.Node)
    cuuAnCuCAi: cc.Node = null;
    @property(cc.Node)
    nguoiLaiDo: cc.Node = null;


    countFail = 0;


    @property(cc.Node)
    popWin: cc.Node = null;
    @property(cc.Node)
    sao1: cc.Node = null;
    @property(cc.Node)
    sao2: cc.Node = null;
    @property(cc.Node)
    sao3: cc.Node = null;
    @property(cc.Prefab)
    efSao: cc.Prefab = null;
    @property(cc.Node)
    btnNext: cc.Node = null;
    //Cuu an bap
    State1 = {
        left: { wolves: 0, sheep: 1, radish: 1, farmer: 0 },
        right: { wolves: 1, sheep: 0, radish: 0, farmer: 1 }
    };
    //Soi An Cuu
    State2 = {
        left: { wolves: 1, sheep: 1, radish: 0, farmer: 0 },
        right: { wolves: 0, sheep: 0, radish: 1, farmer: 1 }
    };

    //Cuu an bap
    State3 = {
        left: { wolves: 1, sheep: 0, radish: 0, farmer: 1 },
        right: { wolves: 0, sheep: 1, radish: 1, farmer: 0 }
    };
    //Soi An Cuu
    State4 = {
        left: { wolves: 0, sheep: 0, radish: 1, farmer: 1 },
        right: { wolves: 1, sheep: 1, radish: 0, farmer: 0 }
    };
    //Soi An Cuu
    State5 = {
        left: { wolves: 1, sheep: 1, radish: 1, farmer: 0 },
        right: { wolves: 0, sheep: 0, radish: 0, farmer: 1 }
    };
    //End
    StateEnd = {
        left: { wolves: 0, sheep: 0, radish: 0, farmer: 0 },
        right: { wolves: 1, sheep: 1, radish: 1, farmer: 1 }
    };
    currentState = {
        left: { wolves: 1, sheep: 1, radish: 1, farmer: 1 },
        right: { wolves: 0, sheep: 0, radish: 0, farmer: 0 }
    }

    arrayState: any[] = [];

    dataQuaSong = JSON.parse(localStorage.getItem("QuaSong"));

    protected onLoad(): void {
        Singleton.QUA_SONG_CTRL = this;
    }
    protected onEnable(): void {
        this.huongdan.active = true;
    }
    reSet() {
        this.countFail = 5;

        this.closeNguoi();
        this.closeSoiAnCuu();
        this.closeCuuAnCucai();


        this.popWin.active = false;
        this.currentState = {
            left: { wolves: 1, sheep: 1, radish: 1, farmer: 1 },
            right: { wolves: 0, sheep: 0, radish: 0, farmer: 0 }
        }
        this.ChangeParent(this.soi, this.node);
        this.ChangeParent(this.cuu, this.node);
        this.ChangeParent(this.cuCai, this.node);
        this.ChangeParent(this.farmer, this.node);

        this.soi.setPosition(cc.v3(-350, -460, 0));
        this.cuu.setPosition(cc.v3(-500, -400, 0));
        this.cuCai.setPosition(cc.v3(-200, -500, 0));
        this.farmer.setPosition(cc.v3(-630, -300, 0));
        this.raft.setPosition(cc.v3(-230, -260, 0));

        this.soiBoTrai = true;
        this.cuuBoTrai = true;
        this.caiBoTrai = true;
        this.nguoiBoTrai = true;
        this.raftBoTrai = true;

        this.btnMove.getChildByName("muiten").angle = 0;
    }

    protected start(): void {
        this.countFail = 5;
        this.btnNext.active = false;
        this.arrayState.push(this.State1);
        this.arrayState.push(this.State2);
        this.arrayState.push(this.State3);
        this.arrayState.push(this.State4);
        this.arrayState.push(this.State5);
        this.arrayState.push(this.StateEnd);
        this.soi.on(cc.Node.EventType.TOUCH_START, this.SoiLenThuyen, this);
        this.cuu.on(cc.Node.EventType.TOUCH_START, this.CuuLenThuyen, this);
        this.cuCai.on(cc.Node.EventType.TOUCH_START, this.CaiLenThuyen, this);
        this.farmer.on(cc.Node.EventType.TOUCH_START, this.nguoiLenThuyen, this);

    }

    show1sao() {
        setTimeout(() => {
            Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ShowSao);
            this.sao1.active = true;
            let ef = cc.instantiate(this.efSao);
            ef.setParent(this.sao1.parent);
            ef.setPosition(this.sao1.position);
            this.btnNext.active = true;
        }, 500);
    }

    show2sao() {


        setTimeout(() => {
            Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ShowSao);

            this.sao1.active = true;
            let ef = cc.instantiate(this.efSao);
            ef.setParent(this.sao1.parent);
            ef.setPosition(this.sao1.position);
            setTimeout(() => {
                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ShowSao);

                this.sao2.active = true;
                let ef = cc.instantiate(this.efSao);
                ef.setParent(this.sao2.parent);
                ef.setPosition(this.sao2.position);
                this.btnNext.active = true;
            }, 500);
        }, 500);
    }

    show3sao() {
        this.scheduleOnce(() => {
            Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ShowSao);

            this.sao1.active = true;
            let ef = cc.instantiate(this.efSao);
            ef.setParent(this.sao1.parent);
            ef.setPosition(this.sao1.position);
            this.scheduleOnce(() => {
                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ShowSao);

                this.sao2.active = true;
                let ef = cc.instantiate(this.efSao);
                ef.setParent(this.sao2.parent);
                ef.setPosition(this.sao2.position);
                this.scheduleOnce(() => {
                    Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ShowSao);

                    this.sao3.active = true;
                    let ef = cc.instantiate(this.efSao);
                    ef.setParent(this.sao3.parent);
                    ef.setPosition(this.sao3.position);
                    this.btnNext.active = true;
                }, 0.5);

            }, 0.5);

        }, 0.5);
    }


    resetSao() {
        this.btnNext.active = false;
        this.sao1.active = false;
        this.sao2.active = false;
        this.sao3.active = false;
    }

    nextLevelQSSCC() {
        this.reSet();
        this.resetSao();
        GameQuaSong.qs.openLevelSCC();
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
    }

    nextLevelQSLinh() {
        this.reSet();
        this.resetSao();
        GameQuaSong.qs.openLevelLinhQS();
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);

    }



    countRaft = 0;
    pos1On = false;
    pos2On = false;
    isMoveOnRaft = false;

    closeSoiAnCuu() {
        this.soiAnCuu.active = false;
        this.btnMove.active = true;
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);

    }

    closeCuuAnCucai() {
        this.cuuAnCuCAi.active = false;
        this.btnMove.active = true;
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);

    }

    closeNguoi() {
        this.nguoiLaiDo.active = false;
        this.btnMove.active = true;
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);

    }


    openSoiAnCuu() {
        this.soiAnCuu.active = true;
        this.btnMove.active = false;
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.PopQuaSongFalse);

    }

    openCuuAnCucai() {
        this.cuuAnCuCAi.active = true;
        this.btnMove.active = false;
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.PopQuaSongFalse);


    }

    openNguoi() {
        this.nguoiLaiDo.active = true;
        this.btnMove.active = false;
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.PopQuaSongFalse);
    }



    // Soi an thittttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
    soiOnRaft = false;
    soiP1 = false;
    soiP2 = false;
    soiBoTrai = true;
    SoiLenThuyen() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.SelectModeUI);

        if (this.soiBoTrai && !this.raftBoTrai || !this.soiBoTrai && this.raftBoTrai) return;
        if (this.isMoveOnRaft) return;

        // if (this.currentState.left.wolves == 1) {
        //     this.currentState.left.wolves = 0;
        //     this.currentState.right.wolves = 1;
        // }
        // else {
        //     this.currentState.left.wolves = 1;
        //     this.currentState.right.wolves = 0;
        // }
        console.log(this.currentState);

        let t = cc.tween;
        let pos: cc.Node = null;
        if (!this.pos1On) {
            pos = this.pos1;

        }
        else if (!this.pos2On) {
            pos = this.pos2;
        }
        // console.log(pos);

        if (this.soiOnRaft) {
            this.isMoveOnRaft = true;
            this.ChangeParent(this.soi, this.node);
            let posG;
            if (this.soiBoTrai) {
                posG = cc.v3(-350, -460, 0);
                this.currentState.left.wolves = 1;
                this.currentState.right.wolves = 0;
            }
            else {
                posG = cc.v3(300, -60, 0);
                this.currentState.left.wolves = 0;
                this.currentState.right.wolves = 1;
            }
            // console.log(this.currentState);

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
            if (this.raftBoTrai) {
                this.currentState.left.wolves = 0;
                this.currentState.right.wolves = 1;
            }
            else {
                this.currentState.left.wolves = 1;
                this.currentState.right.wolves = 0;
            }
            // console.log(this.currentState);

            t(this.soi)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.soi) }),
                    t().to(0.2, { scaleX: 0.25 }),
                    t().to(0.2, { scaleY: 0.25 }),
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
                    this.ChangeParent(this.soi, this.raft);
                })

                .start();
        }


    }




    //Cuu Connnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
    cuuOnRaft = false;
    cuuP1 = false;
    cuuP2 = false;
    cuuBoTrai = true;
    CuuLenThuyen() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.SelectModeUI);

        // console.log(this.countRaft);
        if (this.cuuBoTrai && !this.raftBoTrai || !this.cuuBoTrai && this.raftBoTrai) return;
        if (this.isMoveOnRaft) return;

        // if (this.currentState.left.sheep == 1) {
        //     this.currentState.left.sheep = 0;
        //     this.currentState.right.sheep = 1;
        // }
        // else {
        //     this.currentState.left.sheep = 1;
        //     this.currentState.right.sheep = 0;
        // }
        // console.log(this.currentState);

        let t = cc.tween;
        let pos: cc.Node = null;
        if (!this.pos1On) {
            pos = this.pos1;

        }
        else if (!this.pos2On) {
            pos = this.pos2;
        }
        if (this.cuuOnRaft) {
            this.ChangeParent(this.cuu, this.node);

            this.isMoveOnRaft = true;
            let posG;
            if (this.cuuBoTrai) {
                posG = cc.v3(-500, -400, 0);
                this.currentState.left.sheep = 1;
                this.currentState.right.sheep = 0;
            }
            else {
                posG = cc.v3(150, -25, 0);
                this.currentState.left.sheep = 0;
                this.currentState.right.sheep = 1;

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
            if (this.raftBoTrai) {
                this.currentState.left.sheep = 0;
                this.currentState.right.sheep = 1;
            }
            else {
                this.currentState.left.sheep = 1;
                this.currentState.right.sheep = 0;
            }
            // console.log(this.currentState);

            t(this.cuu)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.cuu) }),
                    t().to(0.2, { scaleX: 0.25 }),
                    t().to(0.2, { scaleY: 0.25 }),
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
                    this.ChangeParent(this.cuu, this.raft);


                })

                .start();
        }

    }



    //Cu CAiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    cuCaiOnRaft = false;
    caiP1 = false;
    caiP2 = false;
    caiBoTrai = true;
    CaiLenThuyen() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.SelectModeUI);

        // console.log(this.countRaft);
        if (this.caiBoTrai && !this.raftBoTrai || !this.caiBoTrai && this.raftBoTrai) return;
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
        if (this.cuCaiOnRaft) {
            this.ChangeParent(this.cuCai, this.node);
            this.isMoveOnRaft = true;
            let posG;
            if (this.caiBoTrai) {
                posG = cc.v3(-200, -500, 0);
                this.currentState.left.radish = 1;
                this.currentState.right.radish = 0;
            }
            else {
                posG = cc.v3(444, -100, 0);
                this.currentState.left.radish = 0;
                this.currentState.right.radish = 1;
            }
            // console.log(this.currentState);

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
            if (this.raftBoTrai) {
                this.currentState.left.radish = 0;
                this.currentState.right.radish = 1;
            }
            else {
                this.currentState.left.radish = 1;
                this.currentState.right.radish = 0;
            }
            // console.log(this.currentState);

            t(this.cuCai)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.cuCai) }),
                    t().to(0.2, { scaleX: 0.25 }),
                    t().to(0.2, { scaleY: 0.25 }),
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
                    this.ChangeParent(this.cuCai, this.raft);

                })

                .start();
        }
    }




    //NguoiNongDanmnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
    farmerOnRaft = false;
    farmerP1 = false;
    farmerP2 = false;
    nguoiBoTrai = true;
    nguoiLenThuyen() {

        if (this.nguoiBoTrai && !this.raftBoTrai || !this.nguoiBoTrai && this.raftBoTrai) return;
        // if (this.currentState.left.farmer == 1) {
        //     this.currentState.left.farmer = 0;
        //     this.currentState.right.farmer = 1;
        // }
        // else {
        //     this.currentState.left.farmer = 1;
        //     this.currentState.right.farmer = 0;
        // }
        let t = cc.tween;
        let pos: cc.Node = null;
        if (!this.pos1On) {
            pos = this.pos1;
        }
        else if (!this.pos2On) {
            pos = this.pos2;
        }
        if (this.farmerOnRaft) {
            this.ChangeParent(this.farmer, this.node);
            this.isMoveOnRaft = true;
            let posG;
            if (this.nguoiBoTrai) {
                posG = cc.v3(-630, -300, 0);
                this.currentState.left.farmer = 1;
                this.currentState.right.farmer = 0;
            }
            else {
                posG = cc.v3(20, 30, 0);
                this.currentState.left.farmer = 0;
                this.currentState.right.farmer = 1;
            }
            // console.log(this.currentState);

            t(this.farmer)
                .parallel(
                    t().to(0.2, { position: posG }),
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
            Singleton.AUDIO_MANAGER.playEffect(TypeAudio.SelectModeUI);

            if (this.pos1On && this.pos2On) {
                console.log("full raft");
                return;
            }

            this.isMoveOnRaft = true;
            if (this.raftBoTrai) {
                this.currentState.left.farmer = 0;
                this.currentState.right.farmer = 1;
            }
            else {
                this.currentState.left.farmer = 1;
                this.currentState.right.farmer = 0;
            }
            // console.log(this.currentState);

            t(this.farmer)
                .parallel(
                    t().to(0.2, { position: this.changePosition(pos, this.farmer) }),
                    t().to(0.2, { scaleX: 0.25 }),
                    t().to(0.2, { scaleY: 0.25 }),
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
                    this.ChangeParent(this.farmer, this.raft);

                })

                .start();
        }
    }
    raftBoTrai = true;
    moveRaft() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
        if (!this.farmerOnRaft) {
            this.openNguoi();
            this.countFail -= 1;
            return;
        }
        this.checkSate();
        if (this.isFail) return;
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
                this.nguoiBoTrai = !this.nguoiBoTrai;
                if (this.raftBoTrai) {
                    this.btnMove.getChildByName("muiten").angle = 0;
                }
                else {
                    this.btnMove.getChildByName("muiten").angle = 180;

                }
                this.nguoiLenThuyen();
                if (this.cuCaiOnRaft) {
                    this.caiBoTrai = !this.caiBoTrai;
                    let t = cc.tween;
                    this.ChangeParent(this.cuCai, this.node);
                    let posG;
                    if (this.caiBoTrai) {
                        posG = cc.v3(-200, -500, 0);
                    }
                    else {
                        posG = cc.v3(444, -100, 0);
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
                if (this.soiOnRaft) {
                    this.soiBoTrai = !this.soiBoTrai;
                    let t = cc.tween;
                    this.ChangeParent(this.soi, this.node);
                    let posG;
                    if (this.soiBoTrai) {
                        posG = cc.v3(-350, -460, 0);
                    }
                    else {
                        posG = cc.v3(300, -60, 0);
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
                if (this.cuuOnRaft) {
                    this.cuuBoTrai = !this.cuuBoTrai;
                    let t = cc.tween;
                    this.ChangeParent(this.cuu, this.node);
                    let posG;
                    if (this.cuuBoTrai) {
                        posG = cc.v3(-500, -400, 0);
                    }
                    else {
                        posG = cc.v3(150, -25, 0);

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
                this.btnMove.active = true;
            })
            .start();

    }
    isFail = false;
    checkSate() {
        if (this.currentState.left.wolves == this.arrayState[0].left.wolves
            && this.currentState.left.sheep == this.arrayState[0].left.sheep
            && this.currentState.left.radish == this.arrayState[0].left.radish
            && this.currentState.left.farmer == this.arrayState[0].left.farmer
            || this.currentState.left.wolves == this.arrayState[2].left.wolves
            && this.currentState.left.sheep == this.arrayState[2].left.sheep
            && this.currentState.left.radish == this.arrayState[2].left.radish
            && this.currentState.left.farmer == this.arrayState[2].left.farmer) {
            console.log("Cừu ăn củ cải");
            this.openCuuAnCucai();
            this.countFail -= 1;
            this.isFail = true;
        }
        else if (this.currentState.left.wolves == this.arrayState[1].left.wolves
            && this.currentState.left.sheep == this.arrayState[1].left.sheep
            && this.currentState.left.radish == this.arrayState[1].left.radish
            && this.currentState.left.farmer == this.arrayState[1].left.farmer

            || this.currentState.left.wolves == this.arrayState[3].left.wolves
            && this.currentState.left.sheep == this.arrayState[3].left.sheep
            && this.currentState.left.radish == this.arrayState[3].left.radish
            && this.currentState.left.farmer == this.arrayState[3].left.farmer

            || this.currentState.left.wolves == this.arrayState[4].left.wolves
            && this.currentState.left.sheep == this.arrayState[4].left.sheep
            && this.currentState.left.radish == this.arrayState[4].left.radish
            && this.currentState.left.farmer == this.arrayState[4].left.farmer) {
            this.openSoiAnCuu();
            this.countFail -= 1;
            console.log("Sói ăn cừu");
            this.isFail = true;
        }
        else if (this.currentState.left.wolves == this.arrayState[5].left.wolves
            && this.currentState.left.sheep == this.arrayState[5].left.sheep
            && this.currentState.left.radish == this.arrayState[5].left.radish
            && this.currentState.left.farmer == this.arrayState[5].left.farmer) {
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
        this.dataQuaSong.currentQues = 2;
        localStorage.setItem("QuaSong", JSON.stringify(this.dataQuaSong));
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.WinQS);
        this.popWin.active = true;
        setTimeout(() => {
            if (this.countFail > 3) {
                this.show3sao();
            }
            else if (this.countFail < 4 && this.countFail > 1) {
                this.show2sao();
            }
            else {
                this.show1sao();
            }
        }, 100);


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

    @property(cc.Node)
    ads: cc.Node = null;
    @property(cc.Node)
    goiY: cc.Node = null;
    @property(cc.Node)
    huongdan: cc.Node = null;
    openAds() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
        this.ads.active = true;

    }
    closeAds() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
        this.ads.active = false;
        this.goiY.active = true;

    }
    openLink() {
        let link = ""
        link = "https://www.haui.edu.vn/vn";
        window.open(link);
    }
    closegoiY() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
        this.goiY.active = false;
        this.huongdan.active = false;
    }
    openHD() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
        this.huongdan.active = true;

    }
}


