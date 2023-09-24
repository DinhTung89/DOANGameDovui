

// const { ccclass, property } = cc._decorator;

// @ccclass
// export default class SoiCuuBap extends cc.Component {

//     maxDepth = 10; // Điều kiện dừng đệ quy (thay đổi tùy theo trò chơi)

//     // Định nghĩa trạng thái ban đầu (sói, cừu, bắp ở bờ trái, thuyền ở bờ trái)
//     private initialState = {
//         left: { wolves: 1, sheep: 1, cabbages: 1 },
//         right: { wolves: 0, sheep: 0, cabbages: 0 },
//         boatPosition: 'left',
//     };

//     protected start(): void {
//         this.dfs(this.initialState, 0);
//     }
//     isGoalState(state: any): boolean {
//         // console.log("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//         return state.right.wolves == 1 && state.right.sheep == 1 && state.right.cabbages == 1;

//     }
//     isValidState(state: any): boolean {

//         // Kiểm tra logic hợp lệ ở đây
//         console.log("statevalid");

//         const left = state.left;
//         const right = state.right;
//         const boat = state.boatPosition;
//         console.log("botrai");
//         console.log(left);
//         console.log("bophai");
//         console.log(right);

//         console.log("pos boat: " + boat);




//         // Kiểm tra xem số lượng sói, cừu và bắp trên cả hai bờ có là số âm không (không hợp lệ)
//         if (
//             left.wolves < 0 ||
//             left.sheep < 0 ||
//             left.cabbages < 0 ||
//             right.wolves < 0 ||
//             right.sheep < 0 ||
//             right.cabbages < 0
//         ) {
//             return false;
//         }
//         // Kiểm tra xem có tình huống sói ăn cừu không
//         if (
//             (left.wolves > 0 && left.sheep > 0 && right.cabbages > 0 && boat == "right") ||
//             (right.wolves > 0 && right.sheep > 0 && left.cabbages > 0 && boat == "left")
//         ) {
//             console.log("soi an cuu");


//             return false; // Sói ăn cừu không hợp lệ
//         }
//         // Kiểm tra xem có tình huống cừu ăn bắp không
//         if (
//             (left.cabbages > 0 && left.sheep > 0 && right.wolves > 0 && boat == "right") ||
//             (right.cabbages > 0 && right.sheep > 0 && left.wolves > 0 && boat == "left")
//         ) {
//             console.log("cuu an bap");

//             return false; // Cừu ăn bắp không hợp lệ

//         }
//         console.log("ghop leeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

//         return true;
//     }
//     // Hàm tạo các trạng thái con có thể từ trạng thái hiện tại
//     generateNextStates(state: any): any[] {
//         const nextStates: any[] = [];

// console.log("moi lan goi ham gernbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");

//         const objectsToMove = ['wolves', 'sheep', 'cabbages'];
//         const oppositeShore = state.boatPosition === 'left' ? 'right' : 'left';

//         console.log(state);
//         console.log("dem");

//         for (const object of objectsToMove) {
//             // if (state[state.boatPosition][object] > 0) {
//             // if (state.left[object] > 0 && state.boatPosition === 'left') {
//             const newState = {
//                 left: { ...state.left },
//                 right: { ...state.right },
//                 boatPosition: oppositeShore,
//             };
//             newState.left[object]--;
//             newState.right[object]++;
//             console.log("newstate: " + JSON.stringify(newState));

//             if (this.isValidState(newState)) {
              
//                 nextStates.push(newState);
//                 console.log("pusss");
//             }
//             // }
//         }

//         return nextStates;
//     }
//     dfs(state: any, depth: number) {
//         if (depth > this.maxDepth) {
//             return;
//         }
//         // console.log(state);

//         if (this.isGoalState(state)) {
//             console.log('Tìm thấy giải pháp:', state);
//             return;
//         }

//         const nextStates = this.generateNextStates(state);
//         // console.log("aaaa");

//         // console.log(nextStates);


//         for (const nextState of nextStates) {
//             if (this.isValidState(nextState)) {
//                 console.log("trang thai tiep theoooooooooooooooooooo");
                
//                 this.dfs(nextState, depth + 1);
//             }
//         }
//     }
// }
