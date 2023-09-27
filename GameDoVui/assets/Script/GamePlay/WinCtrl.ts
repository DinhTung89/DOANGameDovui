import Singleton from "../Manager/Singleton";


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

    show1sao() {
        setTimeout(() => {
            this.sao1.active = true;
            let ef = cc.instantiate(this.efSao);
            ef.setParent(this.sao1.parent);
            ef.setPosition(this.sao1.position);
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
            }, 500);
        }, 500);
    }

    show3sao() {
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
                setTimeout(() => {
                    this.sao3.active = true;
                    let ef = cc.instantiate(this.efSao);
                    ef.setParent(this.sao3.parent);
                    ef.setPosition(this.sao3.position);
                }, 500);
            }, 500);

        }, 500);
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


}
