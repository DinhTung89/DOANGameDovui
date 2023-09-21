

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameData extends cc.Component {



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
        // Kiểm tra xem dữ liệu đã được tạo chưa và khở tạo
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

        var DataCauDo = JSON.parse(JSDataCauDO);
        var DataDuoiHinh = JSON.parse(JSDataDuoiHinh);
        var DataKimCuong = JSON.parse(JSDataKimCuong);

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
    }

}
