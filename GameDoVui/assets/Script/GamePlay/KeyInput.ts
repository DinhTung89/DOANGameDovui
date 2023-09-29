import { TypeAudio } from "../Manager/AudioManager";
import Singleton from "../Manager/Singleton";
import KeyOutput from "./KeyOutput";
import { ModeType } from "./ModeCtrl";

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
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ClickIN);

        for (let i = 0; i < Singleton.MODE_CTRL.convertToUpperCase(Singleton.MODE_CTRL.printDapAn()).length; i++) {
            if (Singleton.MODE_CTRL.arrayInputDapAn[i].getComponent(cc.Label).string == "") {
                Singleton.MODE_CTRL.arrayInputDapAn[i].getComponent(cc.Label).string = this.keyString.string;
                Singleton.MODE_CTRL.arrayInputDapAn[i].getComponent(KeyOutput).numberKey = parseInt(this.node.name) - 1;
                this.isChose = true;
                this.node.opacity = 0;
                Singleton.MODE_CTRL.arrayInputDapAn[i].getComponent(KeyOutput).isChose = false;

                // Check Đáp Án
                var dapAn = "";
                for (let i = 0; i < Singleton.MODE_CTRL.convertToUpperCase(Singleton.MODE_CTRL.printDapAn()).length; i++) {

                    dapAn = dapAn + Singleton.MODE_CTRL.arrayInputDapAn[i].getComponent(cc.Label).string.replace("  ", "");

                }
                // var x = dapAn.replace("  ", "");
                //loai bo khoang trang loai bo in hoa in thuong
                var regex = new RegExp(" ", "gi");
                var x = dapAn.replace(regex, "");
                // console.log(x);
                Singleton.MODE_CTRL.countKeyDA += 1;
                // console.log(x);
                // console.log(Singleton.CAU_DO_CTRL.convertToUpperCase(Singleton.CAU_DO_CTRL.printDapAn()));

                if (Singleton.MODE_CTRL.countKeyDA == Singleton.MODE_CTRL.convertToUpperCase(Singleton.MODE_CTRL.printDapAn()).length) {
                    Singleton.MODE_CTRL.animCheck.play();
                    Singleton.MODE_CTRL.isAnim = true;
                    if (x == Singleton.MODE_CTRL.convertToUpperCase(Singleton.MODE_CTRL.printDapAn())) {
                        setTimeout(() => {
                            Singleton.MODE_CTRL.AnimWin();
                            if (Singleton.MODE_CTRL.typeMode == ModeType.CauDo) {
                                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.TrueCauDo);
                                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Yeah);

                            }
                            else {
                                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.TrueDuoiHinh);
                                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Yeah);

                            }
                            Singleton.MODE_CTRL.greenCheck.width = 100 * Singleton.MODE_CTRL.convertToUpperCase(Singleton.MODE_CTRL.printDapAn()).length + 100;
                            Singleton.MODE_CTRL.greenCheck.active = true;
                            for (let j = 0; j < Singleton.MODE_CTRL.arrayLabelKey.length; j++) {
                                Singleton.MODE_CTRL.arrayInputDapAn[j].parent.color = cc.color(100, 200, 30, 255);
                            }

                            setTimeout(() => {
                                Singleton.MODE_CTRL.win();
                                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.FireWork);
                                Singleton.MODE_CTRL.isAnim = false;
                            }, 800);
                        }, 1000);
                    }
                    else {
                      
                        setTimeout(() => {
                            Singleton.MODE_CTRL.AnimLose();
                            if (Singleton.MODE_CTRL.typeMode == ModeType.CauDo) {
                                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.FalseCauDo);
                                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Sad);
                                
                            }
                            else {
                                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.FalseDuoiHinh);
                                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Sad);

                            }
                            Singleton.MODE_CTRL.redCheck.width = 100 * Singleton.MODE_CTRL.convertToUpperCase(Singleton.MODE_CTRL.printDapAn()).length + 100;
                            Singleton.MODE_CTRL.redCheck.active = true;
                            setTimeout(() => {
                                Singleton.MODE_CTRL.redCheck.active = false;
                                Singleton.MODE_CTRL.checkSao -= 1;
                                Singleton.MODE_CTRL.isAnim = false;
                            }, 1000);
                        }, 1000);
                    }
                }
                return;
            }
        }
    }

}
