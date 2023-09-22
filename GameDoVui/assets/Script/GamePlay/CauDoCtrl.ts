import * as diacritics from 'diacritics';
import KeyInput from './KeyInput';
import KeyOutput from './KeyOutput';
import Singleton from '../Manager/Singleton';
const { ccclass, property } = cc._decorator;

@ccclass
export default class CauDoCtrl extends cc.Component {

    @property(cc.Label)
    cauDo: cc.Label = null;
    dataText: cc.TextAsset = null;
    @property([cc.Node])
    arrayLabelKey: cc.Node[] = [];
    @property([cc.Node])
    arrayInputDapAn: cc.Node[] = [];
    @property(cc.Node)
    parentDapAn: cc.Node = null;
    bangChuCai = "ABCDEGHIKLMNOPQRSTUVXY";// 22 ky tu tieng viet khong dau
    @property(cc.Prefab)
    oDapAn: cc.Prefab = null;
    @property(cc.Prefab)
    keyDapAn: cc.Prefab = null;
    isWin = false;
    @property(cc.Node)
    popWin: cc.Node = null;
    dapAn: String = "";
    listDapAn: String[] = [];
    poolODapAn: cc.NodePool = null;

    dataCauDo = JSON.parse(localStorage.getItem("CauDo"));




    protected onLoad(): void {
        Singleton.CAU_DO_CTRL = this;
        this.createPoolODA(20);

    }




    protected start(): void {

        this.loadDataNew();


    }



    createPoolODA(size: number) {
        this.poolODapAn = new cc.NodePool();
        for (let i = 0; i < size; i++) {
            let o = cc.instantiate(this.oDapAn);
            // console.log("a");

            this.poolODapAn.put(o);
            // console.log(this.poolODapAn);

        }
    }


    loadDataNew() {
        cc.loader.loadRes("CauDo/Cau" + this.dataCauDo.currentQues.toString(), cc.TextAsset, (err, txt) => {
            if (err) {
                cc.error("Hết Câu Hỏi Trong Kho:", err);
                this.dataCauDo.currentQues = 1;
                localStorage.setItem("CauDo", JSON.stringify(this.dataCauDo));
                return;
            }
            this.dataText = txt;
            this.cauDo.string = this.printCauDo();
            this.printKey();
            this.instanceDapAn();
            console.log(this.arrayInputDapAn.length);

            for (let i = 0; i < this.arrayInputDapAn.length; i++) {
                this.arrayInputDapAn[i].getComponent(cc.Label).string = "";
            }
            this.dapAn = this.convertToUpperCase(this.printDapAn());
            this.listDapAn = this.dapAn.split("");
        });
    }

    //Đưa ra câu đố từ file Text
    printCauDo() {
        //Dùng split chia text thành mảng phân chia theo str "/*"
        var array: String[] = this.dataText.toString().split("/*");
        var cauDo = array[1].toString();
        return cauDo;
    }

    //Đưa ra đáp án từ file Text
    printDapAn() {
        var array: String[] = this.dataText.toString().split("/*");
        var dapAn = array[0].toString();
        return dapAn;
    }
    //Chuyển đổi từ chuỗi Tiếng Việt thành chuỗi không dấu in hoa và loại bỏ khoảng trắng sử dụng thư viện diacritics của nodejs
    convertToUpperCase(text: string) {
        //Loại bỏ khoảng trẳng
        // var x = text.replace(" ", "");
        var regex = new RegExp(" ", "gi");
        var x = text.replace(regex, "");
        //Chuyển đổi từ chuỗi tiếng việt sang chuỗi không dấu
        var convertedText: string = diacritics.remove(x);
        //Chuyển đổi chuỗi sang chuỗi in hoa
        var textUpperCase: string = convertedText.toUpperCase();
        return textUpperCase;

    }
    // Tạo ra các ký tự điền vào đáp án
    instanceKey() {
        //Lấy ra đáp án chuyển đổi thành in hoa không dấu
        var dapAn = this.convertToUpperCase(this.printDapAn());
        var n = 14 - dapAn.length;
        //Thêm các ký tự ngẫu nhiên cho đáp án
        for (var i = 0; i < n; i++) {
            var randomKytu = Math.floor(Math.random() * 10);
            dapAn = dapAn.concat(this.bangChuCai.charAt(randomKytu));
        }
        return dapAn;
    }
    //Hiện các ký tự trả lời câu đố ra màn hình
    printKey() {
        var cacKyTuDapAn = this.instanceKey();
        var mangCaKytu = cacKyTuDapAn.split("");
        this.fisherYates(mangCaKytu);
        for (var i = 0; i < this.arrayLabelKey.length; i++) {
            this.arrayLabelKey[i].getComponent(cc.Label).string = " " + mangCaKytu[i] + " ";
        }
    }

    //Thuật toán Fisher-Yates shufffle random thứ tự các phần tử trong mảng
    fisherYates(array) {
        var currentIndex: number = array.length;
        while (currentIndex !== 0) {
            var randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            var temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }
    instanceDapAn() {
        console.log(this.printDapAn().length);

        for (let i = 1; i <= this.convertToUpperCase(this.printDapAn()).length; i++) {

            var oDapAn = cc.instantiate(this.oDapAn);
            oDapAn.name = i.toString();
            oDapAn.setParent(this.parentDapAn);
            var keyDapAn = cc.instantiate(this.keyDapAn);
            keyDapAn.setParent(oDapAn);
            keyDapAn.name = "key" + i;
            this.arrayInputDapAn.push(keyDapAn);
        }
    }
    disableODapAn() {
        console.log(this.arrayInputDapAn.length);

        for (let i = 0; i < this.arrayInputDapAn.length; i++) {
            console.log("i" + i);

            // this.arrayInputDapAn[i].parent.destroy();
            // this.arrayInputDapAn[i] = null;
        }
    }

    // Sử dụng gợi ý
    suggest() {
        console.log("suggest");
        for (let i = 0; i < this.arrayInputDapAn.length; i++) {
            if (this.arrayInputDapAn[i].getComponent(cc.Label).string == "") {
                var x = this.listDapAn[i];
                // console.log(x);
                var id = i;
                for (let j = 0; j < this.arrayLabelKey.length; j++) {
                    if (" " + x + " " == this.arrayLabelKey[j].getComponent(cc.Label).string && this.arrayLabelKey[j].parent.getComponent(KeyInput).isChose == false) {
                        this.arrayLabelKey[j].parent.getComponent(KeyInput).setActionTouch();
                        this.arrayInputDapAn[id].getComponent(KeyOutput).isSuggest = true;
                        this.arrayInputDapAn[id].parent.color = cc.color(100, 200, 30, 255);
                        return;
                    }
                }
                return;
            }
        }
    }


    win() {
        this.isWin = true;
        this.popWin.active = true;
        this.dataCauDo = JSON.parse(localStorage.getItem("CauDo"));
        this.dataCauDo.currentQues += 1;
        this.disableODapAn();
        setTimeout(() => {
            // this.disableODapAn();
            this.loadDataNew();
            this.setNewData();
            this.isWin = false;
        }, 3000);
    }
    setNewData() {
        for (let i = 0; i < this.arrayLabelKey.length; i++) {
            this.arrayLabelKey[i].parent.getComponent(KeyInput).isChose = false;
            this.arrayLabelKey[i].parent.opacity = 255;
        }
        // for (let i = 0; i < this.arrayInputDapAn.length; i++) {
        //     this.arrayInputDapAn[i].getComponent(KeyOutput).isChose = false;
        //     this.arrayInputDapAn[i].parent.color = cc.color(180, 190, 250, 255);
        //     this.arrayInputDapAn[i].getComponent(KeyOutput).isSuggest = false;
        // }
    }

}
