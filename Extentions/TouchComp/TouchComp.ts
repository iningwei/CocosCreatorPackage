const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchComp extends cc.Component {
    private touchFinishedCallback: (_event: cc.Event.EventTouch) => void;

    public Init(_touchCallback: (_event: cc.Event.EventTouch) => void) {
        this.touchFinishedCallback = _touchCallback;
    }


    onLoad() {
        this.registerEventHandler();
    }
    onDestroy() {
        this.removeEventHandler();
    }

    private registerEventHandler() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }
    private removeEventHandler() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }


    private onTouchStart(event: cc.Event.EventTouch): void {
        // event.getLocation();//世界坐标
        // event.target;   
    }
    private onTouchMove(event: cc.Event.EventTouch): void {

    }

    private onTouchCancel(event: cc.Event.EventTouch): void {
    }
    private onTouchEnd(event: cc.Event.EventTouch): void {
        if (this.touchFinishedCallback != null) {
            this.touchFinishedCallback(event);
        }
    }
}
