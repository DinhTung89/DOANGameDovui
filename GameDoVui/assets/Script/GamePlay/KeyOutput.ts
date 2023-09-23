import Singleton from "../Manager/Singleton";
import KeyInput from "./KeyInput";


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
        if (this.isChose || Singleton.MODE_CTRL.isWin || this.isSuggest) return;
        this.isChose = true;
        Singleton.MODE_CTRL.arrayLabelKey[this.numberKey].parent.opacity = 255;
        this.node.getComponent(cc.Label).string = "";
        Singleton.MODE_CTRL.arrayLabelKey[this.numberKey].parent.getComponent(KeyInput).isChose = false;

    }



}
