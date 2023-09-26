import Singleton from "./Singleton";


const { ccclass, property } = cc._decorator;

@ccclass
export default class PopQuaSong extends cc.Component {

    @property(cc.Node)
    soiAnCuu: cc.Node = null;
    @property(cc.Node)
    cuuAnCuCAi: cc.Node = null;
    @property(cc.Node)
    nguoiLaiDo: cc.Node = null;

    closeSoiAnCuu() {
        this.soiAnCuu.active = false;
        Singleton.QUA_SONG_CTRL.btnMove.active = true;
    }

    closeCuuAnCucai() {
        this.cuuAnCuCAi.active = false;
        Singleton.QUA_SONG_CTRL.btnMove.active = true;

    }

    closeNguoi() {
        this.nguoiLaiDo.active = false;
        Singleton.QUA_SONG_CTRL.btnMove.active = true;

    }


    openSoiAnCuu() {
        this.soiAnCuu.active = true;
        Singleton.QUA_SONG_CTRL.btnMove.active = false;

    }

    openCuuAnCucai() {
        this.cuuAnCuCAi.active = true;
        Singleton.QUA_SONG_CTRL.btnMove.active = false;

    }

    openNguoi() {
        this.nguoiLaiDo.active = true;
        Singleton.QUA_SONG_CTRL.btnMove.active = false;

    }
}
