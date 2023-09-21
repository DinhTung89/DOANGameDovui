import KeyInput from "./KeyInput";
import Singleton from "./Singleton";


const { ccclass, property } = cc._decorator;

@ccclass
export default class KeyOutput extends cc.Component {

    public numberKey = 0;
    protected start(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.setActionTouch, this);
    }
    isChose = false;
    isSuggest = false;
    setActionTouch() {
        if (this.isChose || Singleton.CAU_DO_CTRL.isWin || this.isSuggest) return;
        this.isChose = true;
        Singleton.CAU_DO_CTRL.arrayLabelKey[this.numberKey].parent.opacity = 255;
        this.node.getComponent(cc.Label).string = "";
        Singleton.CAU_DO_CTRL.arrayLabelKey[this.numberKey].parent.getComponent(KeyInput).isChose = false;

    }



}
