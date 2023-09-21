import AudioManager from "./AudioManger";
import LoadSceneManager from "./LoadSceneManager";
import LopHocCtrl from "./Lophoc/LopHocCtrl";
import SetStar from "./Lophoc/Star";

export default class Singleton {
    public static LOP_HOC_CTRL: LopHocCtrl = null;
    public static LOAD_SCENE_MANAGER: LoadSceneManager = null;
    public static SET_STAR: SetStar = null;
    public static AUDIO_MANAGER: AudioManager = null;

}