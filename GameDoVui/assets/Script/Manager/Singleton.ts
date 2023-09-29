import ModeCtrl from "../GamePlay/ModeCtrl";
import GameData from "./GameData";
import LoadSceneManager from "./LoadSceneManager";
import QuaSongCtrl from "./QuaSongCtrl";
import QuaSongCtrl1 from "./QuaSongCtrl1";

export default class Singleton {
    public static MODE_CTRL: ModeCtrl = null;
    public static GAME_DATA: GameData = null;
    public static QUA_SONG_CTRL: QuaSongCtrl = null;
    public static QUA_SONG_CTRL1: QuaSongCtrl1 = null;
    public static LOADSCENE_MANAGER: LoadSceneManager = null;
}
