import QuaSongCtrl from "../Manager/QuaSongCtrl";
import Singleton from "../Manager/Singleton";
import GameQuaSong from "./GameQuaSong";


const { ccclass, property } = cc._decorator;

@ccclass
export default class WinCtrl extends cc.Component {
    static winCtrl: WinCtrl = null;
    @property(cc.Node)
    sao1: cc.Node = null;
    @property(cc.Node)
    sao2: cc.Node = null;
    @property(cc.Node)
    sao3: cc.Node = null;
    @property(cc.Prefab)
    efSao: cc.Prefab = null;
    @property(cc.Label)
    txtDapAn: cc.Label = null
    @property(cc.Node)
    btnNext: cc.Node = null;

    protected onLoad(): void {
        WinCtrl.winCtrl = this;
    }
    // protected onEnable(): void {
    //     this.sao1.active = false;
    //     this.sao2.active = false;
    //     this.sao3.active = false;
    //     this.btnNext.active = false;
    // }
    show1sao() {


        setTimeout(() => {
            this.sao1.active = true;
            let ef = cc.instantiate(this.efSao);
            ef.setParent(this.sao1.parent);
            ef.setPosition(this.sao1.position);
            this.btnNext.active = true;
        }, 500);
    }

    show2sao() {


        setTimeout(() => {
            this.sao1.active = true;
            let ef = cc.instantiate(this.efSao);
            ef.setParent(this.sao1.parent);
            ef.setPosition(this.sao1.position);
            setTimeout(() => {
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
            this.sao1.active = true;
            let ef = cc.instantiate(this.efSao);
            ef.setParent(this.sao1.parent);
            ef.setPosition(this.sao1.position);
            this.scheduleOnce(() => {
                this.sao2.active = true;
                let ef = cc.instantiate(this.efSao);
                ef.setParent(this.sao2.parent);
                ef.setPosition(this.sao2.position);
                this.scheduleOnce(() => {
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
        this.sao1.active = false;
        this.sao2.active = false;
        this.sao3.active = false;
    }
    nextLevel() {
        Singleton.MODE_CTRL.nextLevel();
        this.btnNext.active = false;
        this.resetSao();
        this.node.active = false;
    }
    nextLevelQSSCC() {
        this.btnNext.active = false;
        this.resetSao();
        GameQuaSong.qs.openLevelSCC();

    }

    nextLevelQSLinh() {
        this.btnNext.active = false;
        this.resetSao();
        GameQuaSong.qs.openLevelLinhQS();
    }

}
