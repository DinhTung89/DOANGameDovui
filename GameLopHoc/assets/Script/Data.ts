import { TypeAudio } from "./AudioManger";
import Singleton from "./Singleton";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Data extends cc.Component {

    protected onLoad(): void {
        this.setData();

    }
    protected start(): void {
        Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMHome);
    }
    loadScene() {

        Singleton.LOAD_SCENE_MANAGER.loadSceneName("LopHoc");
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
        Singleton.AUDIO_MANAGER.stopMusic();

    }
    clearData() {
        console.log("ClearData");

        cc.sys.localStorage.clear();
    }

    setData() {
        const Star = {
            count: 0,

        };
        var jsonStar = localStorage.getItem("Star");
        if (jsonStar == null) {
            console.log("SET DATA STAR");
            const jsonStar = JSON.stringify(Star);
            cc.sys.localStorage.setItem("Star", jsonStar);
        }
        const NameNV = {
            namenv: "ABC",
            isFirst: false,
            isMale: false
        };
        var jsonNameNv = localStorage.getItem("NameNV");
        if (jsonNameNv == null) {
            console.log("SET DATA Name");
            const jsonNameNv = JSON.stringify(NameNV);
            cc.sys.localStorage.setItem("NameNV", jsonNameNv);
        }

        const ClassMath = {
            currentQues: 1,
            nextQues: 2,
            pass: false,
            dct: 1
        };
        const ClassMusic = {
            currentQues: 1,
            nextQues: 2,
            pass: false
        };
        const ClassHistory = {
            currentQues: 1,
            nextQues: 2,
            pass: false
        };
        var jsonDataMath = localStorage.getItem("Math");
        var jsonDataMusic = localStorage.getItem("Music");
        var jsonDataHistory = localStorage.getItem("History");

        if (jsonDataMath == null) {
            console.log("SET DATA MATH");
            const dataMath = JSON.stringify(ClassMath);
            localStorage.setItem('Math', dataMath);
        }
        if (jsonDataMusic == null) {
            console.log("SET DATA MUSIC");
            const dataMusic = JSON.stringify(ClassMusic);
            localStorage.setItem('Music', dataMusic);
        }
        if (jsonDataHistory == null) {
            console.log("SET DATA HISTORY");
            const dataHistory = JSON.stringify(ClassHistory);
            localStorage.setItem('History', dataHistory);
        }
    }
    resetData() {
        var jsonDataMath = localStorage.getItem("Math");
        var jsonDataMusic = localStorage.getItem("Music");
        var jsonDataHistory = localStorage.getItem("History");
        var DataMath = JSON.parse(jsonDataMath);
        var DataMusic = JSON.parse(jsonDataMusic);
        var DataHistory = JSON.parse(jsonDataHistory);

        if (jsonDataMath != null) {
            console.log("ReSetData");

            DataMath.currentQues = 1;
            DataMath.nextQues = 2;
            DataMath.pass = false;
            localStorage.setItem("Math", JSON.stringify(DataMath));
        }
        if (jsonDataMusic != null) {
            DataMusic.currentQues = 1;
            DataMusic.nextQues = 2;
            DataMusic.pass = false;
            localStorage.setItem("Music", JSON.stringify(DataMusic));
        }
        if (jsonDataHistory != null) {
            DataHistory.currentQues = 1;
            DataHistory.nextQues = 2;
            DataHistory.pass = false;
            localStorage.setItem("History", JSON.stringify(DataHistory));
        }
    }

}
