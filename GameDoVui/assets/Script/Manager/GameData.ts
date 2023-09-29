import Singleton from "./Singleton";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GameData extends cc.Component {

    protected onLoad(): void {
        Singleton.GAME_DATA = this;
    }
    start() {
        this.initData();
    }
    initData() {
        // Khởi tạo các lớp dữ liệu
        const KimCuong = {
            soluong: 0
        };
        const ClassCauDo = {
            currentQues: 1,
            pass: false
        };
        const ClassDuoiHinh = {
            currentQues: 1,
            pass: false
        };
        const Coin = {
            coin: 0,
        };
        const ClassNV = {
            nameNV: "TUNG",
            isFirst: false,
            isMale: false
        };
        const QuaSong = {
            currentQues: 1,
            pass: false
        };
        // Kiểm tra xem dữ liệu đã được tạo chưa và khở tạo
        var JSDataQuaSong = localStorage.getItem("QuaSong");
        if (JSDataQuaSong == null) {
            console.log("SET DATA QUA SONG");
            const dataQuaSongJS = JSON.stringify(QuaSong);
            localStorage.setItem('QuaSong', dataQuaSongJS);
        }
        var JSName = localStorage.getItem("NameNV");
        if (JSName == null) {
            console.log("SET DATA Name");
            const dataNameJS = JSON.stringify(ClassNV);
            cc.sys.localStorage.setItem("NameNV", dataNameJS);
        }
        var JSCOIN = localStorage.getItem("Coin");
        if (JSCOIN == null) {
            console.log("SET DATA COIN");
            const dataCoinJS = JSON.stringify(Coin);
            localStorage.setItem('Coin', dataCoinJS);
        }
        var JSDataCauDO = localStorage.getItem("CauDo");
        if (JSDataCauDO == null) {
            console.log("SET DATA CAUDO");
            const dataCauDoJS = JSON.stringify(ClassCauDo);
            localStorage.setItem('CauDo', dataCauDoJS);
        }


        var JSDataDuoiHinh = localStorage.getItem("DuoiHinh");
        if (JSDataDuoiHinh == null) {
            console.log("SET DATA DuoiHinh");
            const dataDuoiHinhJS = JSON.stringify(ClassDuoiHinh);
            localStorage.setItem('DuoiHinh', dataDuoiHinhJS);
        }


        var JSDataKimCuong = localStorage.getItem("KimCuong");
        if (JSDataKimCuong == null) {
            console.log("SET DATA KimCuong");
            const dataKimCuongJS = JSON.stringify(KimCuong);
            localStorage.setItem('KimCuong', dataKimCuongJS);
        }

    }
    clearData() {
        console.log("ClearData");

        cc.sys.localStorage.clear();
    }
    resetData() {
        console.log("ReSetData");

        var JSDataCauDO = localStorage.getItem("CauDo");
        var JSDataDuoiHinh = localStorage.getItem("DuoiHinh");
        var JSDataKimCuong = localStorage.getItem("KimCuong");
        var JSDataQuaSong = localStorage.getItem("QuaSong");
        var JSName = localStorage.getItem("NameNV");
        var JSCOIN = localStorage.getItem("Coin");

        var DataCauDo = JSON.parse(JSDataCauDO);
        var DataDuoiHinh = JSON.parse(JSDataDuoiHinh);
        var DataKimCuong = JSON.parse(JSDataKimCuong);
        var DataQuaSong = JSON.parse(JSDataQuaSong);
        var DataName = JSON.parse(JSName);
        var DataCoin = JSON.parse(JSCOIN);


        if (JSDataCauDO != null) {
            DataCauDo.currentQues = 1;
            DataCauDo.pass = false;
            localStorage.setItem("CauDo", JSON.stringify(DataCauDo));
        }
        if (JSDataDuoiHinh != null) {
            DataDuoiHinh.currentQues = 1;
            DataDuoiHinh.pass = false;
            localStorage.setItem("DuoiHinh", JSON.stringify(DataDuoiHinh));
        }
        if (JSDataKimCuong != null) {
            DataKimCuong.soluong = 0;
            localStorage.setItem("KimCuong", JSON.stringify(DataKimCuong));
        }
        if (JSDataQuaSong != null) {
            DataQuaSong.currentQues = 1;
            localStorage.setItem("QuaSong", JSON.stringify(DataQuaSong));

        }
        if (JSCOIN != null) {
            DataCoin.coin = 0;
            localStorage.setItem("Coin", JSON.stringify(DataCoin));

        }
        if (JSName != null) {
            DataName.nameNV = "Tung";
            DataName.isFirst = false;
            DataName.isMale = false;
            localStorage.setItem("NameNV", JSON.stringify(DataName));
        }

    }

}
