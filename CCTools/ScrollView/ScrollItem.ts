const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollItem extends cc.Component {
    /**
     * DataIndex 从0开始，对应EndlessScrollView中Init函数传入的data[]数组的索引
     */
    public DataIndex: number = 0;
    public Refresh(data: any) {         
    }
}
