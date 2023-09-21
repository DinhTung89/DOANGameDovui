import { TypeAudio } from "../AudioManger";
import Singleton from "../Singleton";


const { ccclass, property } = cc._decorator;

@ccclass
export default class DecooCtrl extends cc.Component {

    @property(cc.Node)
    popTree: cc.Node = null;
    @property(cc.Node)
    popCo: cc.Node = null;
    @property(cc.Node)
    popDoor: cc.Node = null;

    @property(cc.Node)
    tree: cc.Node = null;
    @property(cc.Node)
    co: cc.Node = null;
    @property(cc.Node)
    door: cc.Node = null;
    @property(cc.Prefab)
    efBuy: cc.Prefab = null;
    @property(cc.Node)
    addDoor: cc.Node = null;
    @property(cc.Node)
    addCo: cc.Node = null;
    @property(cc.Node)
    addTree: cc.Node = null;

    @property(cc.Node)
    btnSet: cc.Node = null;
    @property(cc.Node)
    btnXSet: cc.Node = null;
    @property(cc.Node)
    popSet: cc.Node = null;

    openSet() {
        this.btnSet.active = false;
        this.btnXSet.active = true;
        this.popSet.active = true;
    }
    closeSet() {
        this.btnSet.active = true;
        this.btnXSet.active = false;
        this.popSet.active = false;
    }

    openPopTree() {
        this.popTree.active = true;
    }
    openPopDoor() {
        this.popDoor.active = true;
    }
    openPopCo() {
        this.popCo.active = true;
    }



    closePopTree() {
        this.popTree.active = false;
    }
    closePopDoor() {
        this.popDoor.active = false;
    }
    closePopCo() {
        this.popCo.active = false;
    }

    buyCo() {
        var dataStar = JSON.parse(localStorage.getItem("Star"));
        if (dataStar.count >= 100) {
            dataStar.count -= 100;
            localStorage.setItem("Star", JSON.stringify(dataStar));
            this.popCo.active = false;
            this.addCo.active = false;
            setTimeout(() => {
                this.co.active = true;
                let ef = cc.instantiate(this.efBuy);
                ef.setParent(this.co);
                ef.setPosition(cc.v3(0, 0, 0));
                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Win);

            }, 100);
            Singleton.SET_STAR.updateStar();
        }
    }

    buyDoor() {
        var dataStar = JSON.parse(localStorage.getItem("Star"));
        if (dataStar.count >= 100) {
            dataStar.count -= 100;
            localStorage.setItem("Star", JSON.stringify(dataStar));
            this.popDoor.active = false;
            this.addDoor.active = false;
            setTimeout(() => {
                this.door.active = true;
                let ef = cc.instantiate(this.efBuy);
                ef.setParent(this.door);
                ef.setPosition(cc.v3(0, 0, 0));
                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Win);

            }, 100);
            Singleton.SET_STAR.updateStar();
        }
    }

    buyTree() {
        var dataStar = JSON.parse(localStorage.getItem("Star"));
        if (dataStar.count >= 100) {
            dataStar.count -= 100;
            localStorage.setItem("Star", JSON.stringify(dataStar));
            this.popTree.active = false;
            this.addTree.active = false;
            setTimeout(() => {
                this.tree.active = true;
                let ef = cc.instantiate(this.efBuy);
                ef.setParent(this.tree);
                ef.setPosition(cc.v3(0, 0, 0));
                Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Win);
            }, 100);
            Singleton.SET_STAR.updateStar();
        }
    }

}
