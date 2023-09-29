import AudioManager, { TypeAudio } from "./AudioManager";
import Singleton from "./Singleton";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadSceneManager extends cc.Component {

    protected onLoad(): void {
        if (Singleton.LOADSCENE_MANAGER == null) {
            Singleton.LOADSCENE_MANAGER = this;
        }
    }

    @property(cc.Node)
    bgLoad: cc.Node = null;
    @property(cc.Node)
    bar: cc.Node = null;
    loadSceneName(name: string) {

        this.bgLoad.active = true;
        cc.tween(this.bar)
            .to(1, { width: 1700 })
            .call(() => {
                cc.director.loadScene(name);
                cc.tween(this.bgLoad)
                    .to(1, { opacity: 255 })
                    .call(() => {
                        this.bgLoad.active = false;
                        this.bgLoad.opacity = 255;
                        this.bar.width = 0;
                    })
                    .start();
            })
            .start();
    }
    dataSelect = JSON.parse(localStorage.getItem("Select"));

    loadSceneDovui() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.SelectModeUI);
        Singleton.AUDIO_MANAGER.stopMusic();
        this.dataSelect.mode = 1;
        localStorage.setItem("Select", JSON.stringify(this.dataSelect));
        this.loadSceneName("DoVui");
    }
    loadSceneDuoiHinh() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.SelectModeUI);
        Singleton.AUDIO_MANAGER.stopMusic();
        this.dataSelect.mode = 2;
        this.dataSelect.openDV = true;
        localStorage.setItem("Select", JSON.stringify(this.dataSelect));
        this.loadSceneName("DoVui");
    }
    loadSceneQuaSong() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.SelectModeUI);
        Singleton.AUDIO_MANAGER.stopMusic();
        this.dataSelect.mode = 2;
        this.dataSelect.openQS = true;
        localStorage.setItem("Select", JSON.stringify(this.dataSelect));
        this.loadSceneName("QuaSong");
    }
    loadSceneHome() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
        Singleton.AUDIO_MANAGER.stopMusic();
        this.loadSceneName("Home");
    }

}
