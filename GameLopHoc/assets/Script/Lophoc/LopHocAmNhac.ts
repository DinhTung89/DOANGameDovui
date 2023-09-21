import { TypeAudio } from "../AudioManger";
import Singleton from "../Singleton";


const { ccclass, property } = cc._decorator;


@ccclass
export default class LopHocAmNhac extends cc.Component {
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
    @property(cc.AudioSource)
    audio: cc.AudioSource = null;
    @property(cc.Node)
    btnPlay: cc.Node = null;
    @property(cc.Node)
    btnPause: cc.Node = null;


    @property(cc.Node)
    bar: cc.Node = null;

    movebart = cc.Tween = null;

    pause() {
        if (this.bar.parent.active && this.isPlay) {
            this.movebart.stop();
            this.btnPause.active = false;
            this.btnPlay.active = true;
            this.ispause = true;
            this.audio.pause();
        }

    }
    isPlay = false;
    ispause = false;
    play() {
        this.movebarr();
        this.btnPlay.active = false;
        this.btnPause.active = true;
        if (!this.ispause && !this.isPlay) {
            this.isPlay = true;
            this.audio.play();
        }
        else {
            this.audio.resume();
        }
        this.btnPlay.active = false;
        this.btnPause.active = true;
        if (!this.ispause && !this.isPlay) {
            this.isPlay = true;
            this.audio.play();
        }
        else {
            this.audio.resume();
        }
    }
    movebarr() {
        if (this.bar.width == 900) {
            return;
        }
        this.movebart = cc.tween(this.bar)
            .to((900 - this.bar.width) / 90, { width: 900 })
            .call(() => {
                if (this.bar.width == 900) {
                    this.btnPlay.active = true;
                    this.btnPause.active = false;
                    this.isPlay = false;
                    this.ispause = false;
                    this.bar.width = 0;
                }
            })
        this.movebart.start();

    }
    dataMusic = JSON.parse(localStorage.getItem("Music"));
    protected onLoad(): void {
        console.log(this.audio);
        this.dapanA.node.parent.on(cc.Node.EventType.TOUCH_START, this.clickA, this);
        this.dapanB.node.parent.on(cc.Node.EventType.TOUCH_START, this.clickB, this);
        this.dapanC.node.parent.on(cc.Node.EventType.TOUCH_START, this.clickC, this);
        this.dapanD.node.parent.on(cc.Node.EventType.TOUCH_START, this.clickD, this);
        this.loadDataNew();
        console.log("loadDataToan");
    }


    loadDataNew() {
        this.btnPlay.active = false;
        this.btnPause.active = false;
        this.isPlay = false;
        this.ispause = false;
        this.bar.width = 0;
        this.bar.parent.active = false;
        if (this.dataMusic.currentQues == 1
            || this.dataMusic.currentQues == 2
            || this.dataMusic.currentQues == 3
            || this.dataMusic.currentQues == 5
            || this.dataMusic.currentQues == 7
            || this.dataMusic.currentQues == 9
            || this.dataMusic.currentQues == 10
        ) {
            Singleton.AUDIO_MANAGER.stopMusic();
            this.bar.parent.active = true;
            this.btnPlay.active = true;
            this.btnPause.active = false;
            cc.loader.loadRes("Music/Cau" + this.dataMusic.currentQues.toString(), cc.TextAsset, (err, txt) => {
                if (err) {
                    cc.error("Het cau hoi:", err);
                    this.node.active = false;
                    return;
                }
                // Sử dụng txt ở đây
                this.sourcetxt = txt;
                this.arrayTxt = this.sourcetxt.toString().split("/*");
                this.printfData();
            });
            cc.loader.loadRes("Music/Cau" + this.dataMusic.currentQues.toString(), cc.AudioClip, (err, au) => {
                if (err) {
                    cc.error("Loi am thanh:", err);
                    return;
                }
                console.log(au);

                this.audio.clip = au;
            });

        }
        else {
            Singleton.AUDIO_MANAGER.playMusic(TypeAudio.BGMAmNhac);
            cc.loader.loadRes("Music/Cau" + this.dataMusic.currentQues.toString(), cc.TextAsset, (err, txt) => {
                if (err) {
                    cc.error("Het cau hoi:", err);
                    this.node.active = false;
                    this.dataMusic.currentQues = 1;
                    localStorage.setItem("Music", JSON.stringify(this.dataMusic));

                    return;
                }
                // Sử dụng txt ở đây
                this.sourcetxt = txt;
                this.arrayTxt = this.sourcetxt.toString().split("/*");
                this.printfData();
            });
        }

    }
    protected start(): void {


    }
    printfData() {
        this.dapanA.node.parent.color = cc.color(255, 255, 255, 255);
        this.dapanB.node.parent.color = cc.color(255, 255, 255, 255);
        this.dapanC.node.parent.color = cc.color(255, 255, 255, 255);
        this.dapanD.node.parent.color = cc.color(255, 255, 255, 255);
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
        console.log(dataStar.count);

    }
    showLose() {
        Singleton.AUDIO_MANAGER.playEffect(TypeAudio.Fail);
        this.txtDapAn.node.active = true;
        this.losePop.active = true;
        this.losePop.opacity = 255;
    }
    isClick = false;
    clickA() {
        console.log(this.dapAn);
        if (this.isClick) return;
        this.pause();
        this.isClick = true;
        this.dataMusic = JSON.parse(localStorage.getItem("Music"));
        this.dataMusic.currentQues += 1;
        localStorage.setItem("Music", JSON.stringify(this.dataMusic));
        console.log("cau" + this.dataMusic.currentQues);
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
        this.pause();
        this.isClick = true;
        this.dataMusic = JSON.parse(localStorage.getItem("Music"));
        this.dataMusic.currentQues += 1;
        localStorage.setItem("Music", JSON.stringify(this.dataMusic));
        console.log("cau" + this.dataMusic.currentQues);
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
        this.pause();
        this.isClick = true;
        this.dataMusic = JSON.parse(localStorage.getItem("Music"));
        this.dataMusic.currentQues += 1;
        localStorage.setItem("Music", JSON.stringify(this.dataMusic));
        console.log("cau" + this.dataMusic.currentQues);
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
        this.pause();
        this.isClick = true;
        this.dataMusic = JSON.parse(localStorage.getItem("Music"));
        this.dataMusic.currentQues += 1;
        localStorage.setItem("Music", JSON.stringify(this.dataMusic));
        console.log("cau" + this.dataMusic.currentQues);
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
