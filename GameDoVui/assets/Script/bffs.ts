

const { ccclass, property } = cc._decorator;

@ccclass
export default class bfs extends cc.Component {

    public farmer: number;
    public wolf: number;
    public sheep: number;
    public cabbage: number;

    start() {

    }
    isEqual(other: State): boolean {
        return (
          this.farmer === other.farmer &&
          this.wolf === other.wolf &&
          this.sheep === other.sheep &&
          this.cabbage === other.cabbage
        );
      }
    // update (dt) {}
}
