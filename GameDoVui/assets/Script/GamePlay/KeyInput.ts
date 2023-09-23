import Singleton from "../Manager/Singleton";
import KeyOutput from "./KeyOutput";

const { ccclass, property } = cc._decorator;

@ccclass
export default class KeyInput extends cc.Component {

    @property(cc.Label)
    keyString: cc.Label = null;

    protected start(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.setActionTouch, this);

    }
    isChose = false;
    setActionTouch() {
        if (this.isChose || Singleton.MODE_CTRL.isWin) return;
       
        

        for (let i = 0; i < Singleton.MODE_CTRL.convertToUpperCase(Singleton.MODE_CTRL.printDapAn()).length; i++) {
            if (Singleton.MODE_CTRL.arrayInputDapAn[i].getComponent(cc.Label).string == "") {
                Singleton.MODE_CTRL.arrayInputDapAn[i].getComponent(cc.Label).string = this.keyString.string;
                Singleton.MODE_CTRL.arrayInputDapAn[i].getComponent(KeyOutput).numberKey = parseInt(this.node.name) - 1;
                this.isChose = true;
                this.node.opacity = 0;
                Singleton.MODE_CTRL.arrayInputDapAn[i].getComponent(KeyOutput).isChose = false;
                // Check Đáp Án
                var dapAn = "";
                for (let i = 0; i <  Singleton.MODE_CTRL.convertToUpperCase(Singleton.MODE_CTRL.printDapAn()).length; i++) {
                    dapAn = dapAn + Singleton.MODE_CTRL.arrayInputDapAn[i].getComponent(cc.Label).string.replace("  ", "");
                }
                // var x = dapAn.replace("  ", "");
                //loai bo khoang trang loai bo in hoa in thuong
                var regex = new RegExp(" ", "gi");
                var x = dapAn.replace(regex, "");
                console.log(x);
                
                // console.log(x);
                // console.log(Singleton.CAU_DO_CTRL.convertToUpperCase(Singleton.CAU_DO_CTRL.printDapAn()));
                if (x == Singleton.MODE_CTRL.convertToUpperCase(Singleton.MODE_CTRL.printDapAn())) {
                    Singleton.MODE_CTRL.win();
                }

                return;
            }
        }
    }

}
