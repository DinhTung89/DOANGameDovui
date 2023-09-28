import QuaSongCtrl from "../Manager/QuaSongCtrl";
import QuaSongCtrl1 from "../Manager/QuaSongCtrl1";
import WinCtrl from "./WinCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameQuaSong extends cc.Component {
    static qs: GameQuaSong = null;
    @property(cc.Node)
    popSelect: cc.Node = null;
    @property(cc.Node)
    soiCuuCai: cc.Node = null;
    @property(cc.Node)
    linhQuaSong: cc.Node = null;
    protected onLoad(): void {
        GameQuaSong.qs = this;
    }


    start() {

    }
    openLevelLinhQS() {
        this.linhQuaSong.active = true;
        WinCtrl.winCtrl.resetSao();
        this.linhQuaSong.getChildByName("GamPlay").getComponent(QuaSongCtrl1).reSet();
        setTimeout(() => {
            this.soiCuuCai.active = false;
        }, 100);
    }
    openLevelSCC() {
        this.soiCuuCai.active = true;
        WinCtrl.winCtrl.resetSao();
        this.soiCuuCai.getChildByName("GamPlay").getComponent(QuaSongCtrl).reSet();
        setTimeout(() => {
            this.linhQuaSong.active = false;
        }, 100);

    }


}
