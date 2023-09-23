import * as diacritics from 'diacritics';
import KeyInput from './KeyInput';
import KeyOutput from './KeyOutput';
import Singleton from '../Manager/Singleton';
export enum ModeType {
    CauDo,
    DuoiHinh,
}
const { ccclass, property } = cc._decorator;

@ccclass
export default class ModeCtrl extends cc.Component {
    @property({
        type: cc.Enum(ModeType)
    })
    typeMode: ModeType = ModeType.CauDo;
    @property(cc.Label)
    cauHoi: cc.Label = null;

    dataText: cc.TextAsset = null;
    @property(cc.Sprite)
    iMG: cc.Sprite = null;

    @property([cc.Node])
    arrayLabelKey: cc.Node[] = [];

    @property([cc.Node])
    arrayInputDapAn: cc.Node[] = [];

    @property(cc.Node)
    parentDapAn: cc.Node = null;

    bangChuCai = "ABCDEGHIKLMNOPQRSTUVXY";// 22 ky tu tieng viet khong dau

    isWin = false;

    @property(cc.Node)
    popWin: cc.Node = null;

    dapAn: String = "";

    listDapAn: String[] = [];

    dataCauDo = JSON.parse(localStorage.getItem("CauDo"));
    dataDuoiHinh = JSON.parse(localStorage.getItem("DuoiHinh"));


    protected onLoad(): void {
        Singleton.MODE_CTRL = this;

    }

    protected start(): void {
        Singleton.GAME_DATA.resetData();
        this.loadDataNew();
    }


    loadDataNew() {
        if (this.typeMode == ModeType.CauDo) {
            cc.loader.loadRes("CauDo/C" + this.dataCauDo.currentQues.toString(), cc.TextAsset, (err, txt) => {
                if (err) {
                    cc.error("Hết Câu Hỏi Trong Kho:", err);
                    this.dataCauDo.currentQues = 1;
                    localStorage.setItem("CauDo", JSON.stringify(this.dataCauDo));
                    return;
                }
                this.dataText = txt;
                this.cauHoi.string = this.printCauHoi();
                this.printKey();
                this.instanceDapAn();

                this.dapAn = this.convertToUpperCase(this.printDapAn());
                this.listDapAn = this.dapAn.split("");
            });
        }
        else {
            //Load Câu hỏi
            cc.loader.loadRes("DuoiHinh/DapAn/DA" + this.dataDuoiHinh.currentQues.toString(), cc.TextAsset, (err, txt) => {
                if (err) {
                    cc.error("Hết Câu Hỏi Trong Kho:", err);
                    this.dataDuoiHinh.currentQues = 1;
                    localStorage.setItem("DuoiHinh", JSON.stringify(this.dataDuoiHinh));
                    return;
                }
                this.dataText = txt;
                this.cauHoi.string = this.printCauHoi();
                this.printKey();
                this.instanceDapAn();

                this.dapAn = this.convertToUpperCase(this.printDapAn());
                this.listDapAn = this.dapAn.split("");
            });
            cc.loader.loadRes("DuoiHinh/IMG/img" + this.dataDuoiHinh.currentQues.toString(), cc.SpriteFrame, (err, img) => {
                if (err) {
                    cc.error("Lỗi hình ảnh:", err);
                    this.dataDuoiHinh.currentQues = 1;
                    localStorage.setItem("DuoiHinh", JSON.stringify(this.dataDuoiHinh));
                    return;
                }
                this.iMG.spriteFrame = img;
            });
        }

    }

    //Đưa ra câu đố từ file Text
    printCauHoi() {
        //Dùng split chia text thành mảng phân chia theo str "/*"
        var array: String[] = this.dataText.toString().split("[]");
        var cauDo = array[1].toString();
        return cauDo;
    }

    //Đưa ra đáp án từ file Text
    printDapAn() {
        var array: String[] = this.dataText.toString().split("[]");
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

    // Khởi tạo các ô hiển thị đáp án được nhập và và các ký tự
    instanceDapAn() {
        for (let i = 0; i < this.arrayLabelKey.length; i++) {
            this.arrayInputDapAn[i].parent.color = cc.color(180, 190, 250, 255);
            this.arrayInputDapAn[i].parent.active = false;

        }
        for (let i = 0; i < this.convertToUpperCase(this.printDapAn()).length; i++) {
            this.arrayInputDapAn[i].getComponent(cc.Label).string = "";
            this.arrayInputDapAn[i].parent.active = true;
        }
    }


    // Sử dụng gợi ý
    isSuggest = false;
    suggest() {
        if(this.isSuggest)return;
        this.isSuggest=true;
        setTimeout(() => {
            this.isSuggest=false;
        }, 100);
        for (let i = 0; i < this.convertToUpperCase(this.printDapAn()).length; i++) {
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

    // Khi trả lời đúng câu hỏi
    win() {
        this.isWin = true;
        this.popWin.active = true;
        if (this.typeMode == ModeType.CauDo) {
            this.dataCauDo = JSON.parse(localStorage.getItem("CauDo"));
            this.dataCauDo.currentQues += 1;
            localStorage.setItem("CauDo", JSON.stringify(this.dataCauDo));
        }
        else {
            this.dataDuoiHinh = JSON.parse(localStorage.getItem("DuoiHinh"));
            this.dataDuoiHinh.currentQues += 1;
            localStorage.setItem("DuoiHinh", JSON.stringify(this.dataDuoiHinh));
        }


        setTimeout(() => {
            this.loadDataNew();
            this.setNewData();
            this.isWin = false;
            this.popWin.active = false;
        }, 1000);
    }

    // Set các ô nhập đáp án về trạng thái chưa chọn và làm sáng trở lại
    setNewData() {

        for (let i = 0; i < this.arrayLabelKey.length; i++) {
            this.arrayLabelKey[i].parent.getComponent(KeyInput).isChose = false;
            this.arrayLabelKey[i].parent.opacity = 255;
        }

    }

}
