import { TypeAudio } from "../Manager/AudioManager";
import QuaSongCtrl from "../Manager/QuaSongCtrl";
import QuaSongCtrl1 from "../Manager/QuaSongCtrl1";
import Singleton from "../Manager/Singleton";
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
    @property(cc.Node)
    lockLevel2: cc.Node = null;
    dataQuaSong = JSON.parse(localStorage.getItem("QuaSong"));
    protected onLoad(): void {
        GameQuaSong.qs = this;
    }


    start() {
        if (this.dataQuaSong.currentQues == 2) {
            this.lockLevel2.active = false;
        }
        Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMUIQuaSong);
        this.popSelect.active = true;

    }
    openLevelLinhQS() {
        Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMQuaSong);
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.SelectModeUI);

        this.lockLevel2.active = false;
        console.log("ac");

        if (this.popSelect.active) {
            this.popSelect.active = false;
        }
        this.soiCuuCai.active = false;
        setTimeout(() => {
            this.linhQuaSong.active = true;
        }, 100);
    }
    openLevelSCC() {
        Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMQuaSong);
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.SelectModeUI);
        if (this.popSelect.active) {
            this.popSelect.active = false;
        }
        this.linhQuaSong.active = false;
        setTimeout(() => {
            this.soiCuuCai.active = true;
        }, 100);

    }
    openSelect() {
        this.popSelect.active = true;
        this.soiCuuCai.active = false;
        this.linhQuaSong.active = false;
        Singleton.AUDIO_MANAGER.stopMusic();
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
        cc.director.loadScene("QuaSong");        

    }



}
