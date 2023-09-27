

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameDoVui extends cc.Component {

    @property(cc.Node)
    gameCauDo: cc.Node = null;
    @property(cc.Node)
    gameDuoiHinh: cc.Node = null;
    dataNameNV = JSON.parse(localStorage.getItem("NameNV"));
    @property(cc.Node)
    selectNV: cc.Node = null;
    start() {
        if (this.dataNameNV.isFirst == false) {
            this.selectNV.active = true;
        }
    }

}
