import ModeCtrl from "../GamePlay/ModeCtrl";
import GameData from "./GameData";
import QuaSongCtrl from "./QuaSongCtrl";

export default class Singleton {
    public static MODE_CTRL: ModeCtrl = null;
    public static GAME_DATA: GameData = null;
    public static QUA_SONG_CTRL: QuaSongCtrl = null;
}
