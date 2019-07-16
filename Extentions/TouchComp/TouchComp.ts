const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchComp extends cc.Component {
    private touchable: boolean = true;
    public SetTouchable(_touchable: boolean) {
        this.touchable = _touchable;
    }

    private touchStartCallback: (_event: cc.Event.EventTouch) => void;
    private touchEndCallback: (_event: cc.Event.EventTouch) => void;
    private touchMoveCallback: (_event: cc.Event.EventTouch) => void;
    private touchCancelCallback: (_event: cc.Event.EventTouch) => void;


    public SetTouchStartCallback(callback: (_event: cc.Event.EventTouch) => void) {
        this.touchStartCallback = callback;
    }
    public SetTouchCancelCallback(callback: (_event: cc.Event.EventTouch) => void) {
        this.touchCancelCallback = callback;
    }
    public SetTouchEndCallback(callback: (_event: cc.Event.EventTouch) => void) {
        this.touchEndCallback = callback;
    }
    public SetTouchMoveCallback(callback: (_event: cc.Event.EventTouch) => void) {
        this.touchMoveCallback = callback;
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
        // event.target; //触发事件的目标物  (后面Move,Cancel,End的目标物都跟Start的目标物一样)  

        if (!this.touchable) {
            return;
        }
        if (this.touchStartCallback != null) {
            this.touchStartCallback(event);
        }
    }
    private onTouchMove(event: cc.Event.EventTouch): void {
        if (!this.touchable) {
            return;
        }
        if (this.touchMoveCallback != null) {
            this.touchMoveCallback(event);
        }
    }

    private onTouchCancel(event: cc.Event.EventTouch): void {
        if (!this.touchable) {
            return;
        }
        if (this.touchCancelCallback != null) {
            this.touchCancelCallback(event);
        }
    }

    private onTouchEnd(event: cc.Event.EventTouch): void {
        if (this.touchable == false) {
            return;
        }

        if (this.touchEndCallback != null) {
            this.touchEndCallback(event);
        }
    }
}
