import { TypeAudio } from "./AudioManager";
import Singleton from "./Singleton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    @property(cc.Label)
    cointxt: cc.Label = null;
    dataCoin = JSON.parse(localStorage.getItem("Coin"));
    dataSelect = JSON.parse(localStorage.getItem("Select"));
    @property(cc.Node)
    lockDovui: cc.Node = null;
    @property(cc.Node)
    lockQuaSong: cc.Node = null;
    @property(cc.Node)
    popSetting: cc.Node = null;

    @property(cc.Node)
    btnSetting: cc.Node = null;
    @property(cc.Node)
    btnXSetting: cc.Node = null;
    openPopSetting() {
        this.popSetting.active = true;
        this.btnXSetting.active = true;
        this.btnSetting.active = false;
    }
    closePopSetting() {
        this.popSetting.active = false;
        this.btnXSetting.active = false;
        this.btnSetting.active = true;
    }
    protected start(): void {
        Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMHome);
        if (this.dataCoin != null && this.dataSelect != null) {

            this.cointxt.string = this.dataCoin.coin.toString();

            if (this.dataSelect.openDV == false) {
                this.lockDovui.active = true;
            }
            else {
                this.lockDovui.active = false;

            }
            if (this.dataSelect.openQS == false) {
                this.lockQuaSong.active = true;
            }
            else {
                this.lockQuaSong.active = false;

            }
        }

    }
    openQuaSong() {
        if (this.dataCoin.coin >= 200) {
            Singleton.AUDIO_MANAGER.playEffect(TypeAudio.UnLockUI);
            this.dataCoin.coin -= 200;
            localStorage.setItem("Coin", JSON.stringify(this.dataCoin));

            this.dataSelect.openQS = true;
            localStorage.setItem("Select", JSON.stringify(this.dataSelect));

            this.lockQuaSong.active = false;
            this.cointxt.string = this.dataCoin.coin.toString();
        }
        else {
            console.log("not money");
        }
    }
    openCauDo() {
        if (this.dataCoin.coin >= 200) {
            Singleton.AUDIO_MANAGER.playEffect(TypeAudio.UnLockUI);

            this.dataCoin.coin -= 200;
            localStorage.setItem("Coin", JSON.stringify(this.dataCoin)); 0

            this.dataSelect.openDV = true;
            localStorage.setItem("Select", JSON.stringify(this.dataSelect));

            this.lockDovui.active = false;
            this.cointxt.string = this.dataCoin.coin.toString();

        }
        else {
            console.log("not money");

        }
    }

    quitGame() {
        window.close();
    }


}
