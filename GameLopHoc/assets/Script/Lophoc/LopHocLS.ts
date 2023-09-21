import { TypeAudio } from "../AudioManger";
import Singleton from "../Singleton";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LopHocLS extends cc.Component {
    // @property(cc.TextAsset)
    sourcetxt: cc.TextAsset = null;
    @property(cc.Label)
    Cauhoi: cc.Label = null;

    @property(cc.Label)
    dapanA: cc.Label = null;
    @property(cc.Label)
    dapanB: cc.Label = null;
    @property(cc.Label)
    dapanC: cc.Label = null;
    @property(cc.Label)
    dapanD: cc.Label = null;
    @property(cc.Node)
    winPop: cc.Node = null;
    @property(cc.Node)
    losePop: cc.Node = null;
    arrayTxt: string[] = [];
    dapAn: string = "A";
    @property(cc.Label)
    txtDapAn: cc.Label = null;

    dataHistory = JSON.parse(localStorage.getItem("History"));
    protected onLoad(): void {
        this.dapanA.node.parent.on(cc.Node.EventType.TOUCH_START, this.clickA, this);
        this.dapanB.node.parent.on(cc.Node.EventType.TOUCH_START, this.clickB, this);
        this.dapanC.node.parent.on(cc.Node.EventType.TOUCH_START, this.clickC, this);
        this.dapanD.node.parent.on(cc.Node.EventType.TOUCH_START, this.clickD, this);
        this.loadDataNew();

    }
    loadDataNew() {
        cc.loader.loadRes("LichSu/Cau" + this.dataHistory.currentQues.toString(), cc.TextAsset, (err, txt) => {
            if (err) {
                cc.error("Het cau hoi:", err);
                this.node.active = false;
                this.dataHistory.currentQues = 1;
                localStorage.setItem("History", JSON.stringify(this.dataHistory));
                return;
            }
            // Sử dụng txt ở đây            
            this.sourcetxt = txt;
            this.arrayTxt = this.sourcetxt.toString().split("/*");
            this.printfData();
        });
    }
    protected start(): void {


    }
    printfData() {
        this.dapanA.node.parent.color = cc.color(175, 202, 250, 255);
        this.dapanB.node.parent.color = cc.color(175, 202, 250, 255);
        this.dapanC.node.parent.color = cc.color(175, 202, 250, 255);
        this.dapanD.node.parent.color = cc.color(175, 202, 250, 255);
        this.txtDapAn.node.active = false;
        if (this.winPop.active) {
            cc.tween(this.winPop)
                .to(0.5, { opacity: 0 })
                .call(() => {
                    this.winPop.active = false;
                    this.isClick = false;
                })
                .start();
        }
        else if (this.losePop.active) {
            cc.tween(this.losePop)
                .to(0.5, { opacity: 0 })
                .call(() => {
                    this.losePop.active = false;
                    this.isClick = false;
                })
                .start();
        }


        this.Cauhoi.string = this.arrayTxt[0];
        this.dapanA.string = this.arrayTxt[1];
        this.dapanB.string = this.arrayTxt[2];
        this.dapanC.string = this.arrayTxt[3];
        this.dapanD.string = this.arrayTxt[4];
        this.dapAn = this.arrayTxt[5].toString();
        if (this.dapAn == "A") {
            this.txtDapAn.string = "Đáp Án : " + this.arrayTxt[1];
        }
        else if (this.dapAn == "B") {
            this.txtDapAn.string = "Đáp Án : " + this.arrayTxt[2];
        }
        else if (this.dapAn == "C") {
            this.txtDapAn.string = "Đáp Án : " + this.arrayTxt[3];
        }
        else if (this.dapAn == "D") {
            this.txtDapAn.string = "Đáp Án : " + this.arrayTxt[4];
        }
    }
    showWin() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Win);
        this.txtDapAn.node.active = true;
        this.winPop.active = true;
        this.winPop.opacity = 255;
        var dataStar = JSON.parse(localStorage.getItem("Star"));
        dataStar.count += 10;
        localStorage.setItem("Star", JSON.stringify(dataStar));
    }
    showLose() {
        this.txtDapAn.node.active = true;
        this.losePop.active = true;
        this.losePop.opacity = 255;
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Fail);
    }
    isClick = false;
    clickA() {
        console.log(this.dapAn);
        if (this.isClick) return;
        this.isClick = true;
        this.dataHistory = JSON.parse(localStorage.getItem("History"));
        this.dataHistory.currentQues += 1;
        localStorage.setItem("History", JSON.stringify(this.dataHistory));
        console.log("cau" + this.dataHistory.currentQues);
        if (this.dapAn == "A") {
            this.changColor("green", this.dapanA.node.parent);
            console.log("dung dung dung");

        }
        else {
            this.changColor("red", this.dapanA.node.parent);
            console.log("sai");
        }
        cc.tween(this.dapanA.node.parent)
            .to(0.3, { scale: 1.1 })
            .to(0.3, { scale: 1 })
            .call(() => {
                if (this.dapAn == "A") {
                    this.showWin();
                }
                else {
                    this.showLose();
                }
            })
            .start()
    }
    clickB() {
        console.log(this.dapAn);
        if (this.isClick) return;
        this.isClick = true;
        this.dataHistory = JSON.parse(localStorage.getItem("History"));
        this.dataHistory.currentQues += 1;
        localStorage.setItem("History", JSON.stringify(this.dataHistory));
        console.log("cau" + this.dataHistory.currentQues);
        if (this.dapAn == "B") {
            this.changColor("green", this.dapanB.node.parent);
            console.log("dung dung dung");

        }
        else {
            console.log("sai");
            this.changColor("red", this.dapanB.node.parent);
        }
        cc.tween(this.dapanB.node.parent)
            .to(0.3, { scale: 1.1 })
            .to(0.3, { scale: 1 })
            .call(() => {
                if (this.dapAn == "B") {
                    this.showWin();
                }
                else {
                    this.showLose();
                }

            })
            .start()
    }
    clickC() {
        console.log(this.dapAn);
        if (this.isClick) return;
        this.isClick = true;
        this.dataHistory = JSON.parse(localStorage.getItem("History"));
        this.dataHistory.currentQues += 1;
        localStorage.setItem("History", JSON.stringify(this.dataHistory));
        console.log("cau" + this.dataHistory.currentQues);
        if (this.dapAn == "C") {
            console.log("dung dung dung");
            this.changColor("green", this.dapanC.node.parent);

        }
        else {
            console.log("sai");
            this.changColor("red", this.dapanC.node.parent);
        }
        cc.tween(this.dapanC.node.parent)
            .to(0.3, { scale: 1.1 })
            .to(0.3, { scale: 1 })
            .call(() => {
                if (this.dapAn == "C") {
                    this.showWin();
                }
                else {
                    this.showLose();
                }

            })
            .start()
    }
    clickD() {
        console.log(this.dapAn);
        if (this.isClick) return;
        this.isClick = true;
        this.dataHistory = JSON.parse(localStorage.getItem("History"));
        this.dataHistory.currentQues += 1;
        localStorage.setItem("History", JSON.stringify(this.dataHistory));
        console.log("cau" + this.dataHistory.currentQues);
        if (this.dapAn == "D") {
            this.changColor("green", this.dapanD.node.parent);
            console.log("dung dung dung");

        }
        else {
            this.changColor("red", this.dapanD.node.parent);
            console.log("sai");
        }
        cc.tween(this.dapanD.node.parent)
            .to(0.3, { scale: 1.1 })
            .to(0.3, { scale: 1 })
            .call(() => {
                if (this.dapAn == "D") {
                    this.showWin();
                }
                else {
                    this.showLose();
                }

            })
            .start()
    }
    changColor(name: string, node: cc.Node) {
        if (name == "red") {
            cc.tween(node)
                .to(0.1, { color: cc.color(230, 60, 60, 255) })
                .start();
        }
        if (name == "green") {
            cc.tween(node)
                .to(0.1, { color: cc.color(120, 230, 60, 255) })
                .start();
        }
    }
    win() {
        this.winPop.active = true;
    }
    nextLevel() {
        this.loadDataNew();
        Singleton.SET_STAR.updateStar();
    }
    btnBack() {
        this.node.active = false;
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.ButtonClick);
        Singleton.AUDIO_MANAGER.stopMusic();
        Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMHome);

    }
}
