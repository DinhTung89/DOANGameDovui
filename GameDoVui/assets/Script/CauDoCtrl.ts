import * as diacritics from 'diacritics';
import Singleton from './Singleton';
import KeyInput from './KeyInput';
import KeyOutput from './KeyOutput';
const { ccclass, property } = cc._decorator;

@ccclass
export default class CauDoCtrl extends cc.Component {

    @property(cc.Label)
    cauDo: cc.Label = null;
    @property(cc.TextAsset)
    text: cc.TextAsset = null;
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
    protected onLoad(): void {
        
        Singleton.CAU_DO_CTRL = this;
    }
    protected start(): void {
        this.cauDo.string = this.printCauDo();
        this.printKey();
        this.instanceDapAn();
        for (let i = 0; i < this.arrayInputDapAn.length; i++) {
            this.arrayInputDapAn[i].getComponent(cc.Label).string = "";
        }
        this.dapAn = this.convertToUpperCase(this.printDapAn());
        this.listDapAn = this.dapAn.split("");


    }

    //Đưa ra câu đố từ file Text
    printCauDo() {
        //Dùng split chia text thành mảng phân chia theo str "/*"
        var array: String[] = this.text.toString().split("/*");
        var cauDo = array[1].toString();
        return cauDo;
    }

    //Đưa ra đáp án từ file Text
    printDapAn() {
        var array: String[] = this.text.toString().split("/*");
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
        for (let i = 1; i < this.printDapAn().length; i++) {
            var oDapAn = cc.instantiate(this.oDapAn);
            oDapAn.name = i.toString();
            oDapAn.setParent(this.parentDapAn);
            var keyDapAn = cc.instantiate(this.keyDapAn);
            keyDapAn.setParent(oDapAn);
            keyDapAn.name = "key" + i;
            this.arrayInputDapAn.push(keyDapAn);
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



}
