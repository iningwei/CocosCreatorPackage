import Debug from "../../TSPackage/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchComp extends cc.Component {
    private touchable: boolean = true;
    public SetTouchable(_touchable: boolean): TouchComp {
        this.touchable = _touchable;
        return this;
    }

    private touchStartCallback: (_event: cc.Event.EventTouch) => void = null;
    private touchEndCallback: ((_event: cc.Event.EventTouch) => void)[] = [];//可以为一个按钮添加多个点击事件，且会按照添加的顺序依次执行
    private touchMoveCallback: (_event: cc.Event.EventTouch) => void = null;
    private touchCancelCallback: (_event: cc.Event.EventTouch) => void = null;




    private moveDownThreshold: number = 0;
    private touchMoveDownCallback: (_event: cc.Event.EventTouch) => void;

    public SetTouchStartCallback(callback: (_event: cc.Event.EventTouch) => void): TouchComp {
        this.touchStartCallback = callback;
        return this;
    }
    public SetTouchCancelCallback(callback: (_event: cc.Event.EventTouch) => void): TouchComp {
        this.touchCancelCallback = callback;
        return this;
    }
    public SetTouchEndCallback(callback: (_event: cc.Event.EventTouch) => void): TouchComp {
        this.touchEndCallback.push(callback);
        return this;

    }
    public SetTouchMoveCallback(callback: (_event: cc.Event.EventTouch) => void): TouchComp {
        this.touchMoveCallback = callback;
        return this;
    }
    public SetTouchMoveDownCallback(threshold: number, callback: (_event: cc.Event.EventTouch) => void): TouchComp {
        if (threshold <= 0) {
            Debug.Error("error, moveDown threshold should >0");
        }
        this.moveDownThreshold = threshold;
        this.touchMoveDownCallback = callback;
        return this;
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


    private touchStartPos: cc.Vec2 = new cc.Vec2(0, 0);
    private onTouchStart(event: cc.Event.EventTouch): void {
        // event.getLocation();//世界坐标
        // event.target; //触发事件的目标物  (后面Move,Cancel,End的目标物都跟Start的目标物一样)  

        if (!this.touchable) {
            return;
        }
        this.touchStartPos = event.getLocation();
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

        if (this.touchMoveDownCallback != null) {
            if ((this.touchStartPos.y - event.getLocation().y) > this.moveDownThreshold) {
                this.touchMoveDownCallback(event);
            }
        }
        if (this.touchEndCallback.length != 0) {
            for (let i = 0; i < this.touchEndCallback.length; i++) {
                this.touchEndCallback[i](event);
            }
        }
    }
}
