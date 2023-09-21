
const { ccclass, property } = cc._decorator;

@ccclass
export default class Infor extends cc.Component {

    @property(cc.Label)
    nameNv: cc.Label = null;
    @property(cc.Node)
    boy: cc.Node = null;
    @property(cc.Node)
    girl: cc.Node = null;
    onEnable() {

        var dataNV = JSON.parse(localStorage.getItem("NameNV"));
        this.nameNv.string = dataNV.namenv;
        if (dataNV.isMale) {
            this.boy.active = true;
            this.girl.active = false;
        }
        else {
            this.boy.active = false;
            this.girl.active = true;

        }

    }
}
