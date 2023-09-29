

const { ccclass, property } = cc._decorator;

@ccclass
export default class DontDestrroyOnload extends cc.Component {

    protected onLoad(): void {
        cc.game.addPersistRootNode(this.node);
    }
}
