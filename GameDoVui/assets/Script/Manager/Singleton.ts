import ModeCtrl from "../GamePlay/ModeCtrl";
import GameData from "./GameData";

export default class Singleton {
    public static MODE_CTRL: ModeCtrl = null;
    public static GAME_DATA: GameData = null;
}