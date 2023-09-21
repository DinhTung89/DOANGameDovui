import Singleton from "../Singleton";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SetStar extends cc.Component {
    @property(cc.Label)
    txtCountStar: cc.Label = null;
    protected onLoad(): void {
        Singleton.SET_STAR = this;
    }
    onEnable() {

        var dataStar = JSON.parse(localStorage.getItem("Star"));
        console.log(dataStar.count);
        this.txtCountStar.string = dataStar.count;

    }
    updateStar() {
        var dataStar = JSON.parse(localStorage.getItem("Star"));
        this.txtCountStar.string = dataStar.count;
    }


}
