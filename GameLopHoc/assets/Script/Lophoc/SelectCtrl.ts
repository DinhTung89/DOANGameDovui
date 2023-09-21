

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    nam: cc.Node = null;
    @property(cc.Node)
    nu: cc.Node = null;
    @property(cc.EditBox)
    boxName: cc.EditBox = null;
    @property(cc.Node)
    infor: cc.Node = null;
    start() {
        this.nam.on(cc.Node.EventType.TOUCH_START, this.choseMale, this);
        this.nu.on(cc.Node.EventType.TOUCH_START, this.choseFemale, this);
    }
    protected onDisable(): void {
        this.nam.off(cc.Node.EventType.TOUCH_START, this.choseMale, this);
        this.nu.off(cc.Node.EventType.TOUCH_START, this.choseFemale, this);
    }

    choseMale() {
        var dataNameNV = JSON.parse(localStorage.getItem("NameNV"));
        dataNameNV.isMale = true;
        localStorage.setItem("NameNV", JSON.stringify(dataNameNV));
        this.nam.getChildByName("Boy2").active = true;
        this.nu.getChildByName("Girl2").active = false;
    }
    choseFemale() {
        var dataNameNV = JSON.parse(localStorage.getItem("NameNV"));
        dataNameNV.isMale = false;
        localStorage.setItem("NameNV", JSON.stringify(dataNameNV));
        this.nam.getChildByName("Boy2").active = false;
        this.nu.getChildByName("Girl2").active = true;
    }

    accpet() {
        // console.log(this.boxName.string);
        this.node.active = true;
        var dataNameNV = JSON.parse(localStorage.getItem("NameNV"));
        dataNameNV.namenv = this.boxName.string;
        dataNameNV.isFirst = true;
        localStorage.setItem("NameNV", JSON.stringify(dataNameNV));
        // console.log(dataNameNV.namenv);
        this.infor.active = false;
        this.infor.active = true;
        this.node.active = false;
    }
}
