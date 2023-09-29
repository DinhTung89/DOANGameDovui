import { TypeAudio } from "../Manager/AudioManager";
import Singleton from "../Manager/Singleton";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GameDoVui extends cc.Component {

    @property(cc.Node)
    gameCauDo: cc.Node = null;
    @property(cc.Node)
    gameDuoiHinh: cc.Node = null;
    dataNameNV = JSON.parse(localStorage.getItem("NameNV"));
    dataSelect = JSON.parse(localStorage.getItem("Select"));

    start() {
        if (this.dataSelect.mode == 1) {
            this.gameDuoiHinh.active = false;
            this.gameCauDo.active = true;
            Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMCauDo);
        }
        if (this.dataSelect.mode == 2) {
            this.gameCauDo.active = false;
            this.gameDuoiHinh.active = true;
            Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMDuoiHinh);

        }

    }

}
