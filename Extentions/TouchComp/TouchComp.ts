import Debug from "../../TSPackage/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchComp extends cc.Component {
    private touchable: boolean = true;
    public SetTouchable(_touchable: boolean): TouchComp {
        this.touchable = _touchable;
        return this;
    }

    private touchStartCallback: (_event: cc.Event.EventTouch, ...params: any[]) => void = null;
    private touchEndCallback: (_event: cc.Event.EventTouch, ...params: any[]) => void = null;
    private touchMoveCallback: (_event: cc.Event.EventTouch, ...params: any[]) => void = null;
    private touchCancelCallback: (_event: cc.Event.EventTouch, ...params: any[]) => void = null;
    private touchStartParams: any[] = null;
    private touchEndParams: any[] = null;
    private touchMoveParams: any[] = null;
    private touchCancelParams: any[] = null;


    private moveDownThreshold: number = 0;
    private touchMoveDownCallback: (_event: cc.Event.EventTouch, ...params: any[]) => void;
    private touchMoveDownParams: any[] = null;

    public Clear() {
        this.touchStartCallback = null;
        this.touchEndCallback = null;
        this.touchMoveCallback = null;
        this.touchCancelCallback = null;
        this.touchStartParams = null;
        this.touchEndParams = null;
        this.touchMoveParams = null;
        this.touchCancelParams = null;

        this.moveDownThreshold = 0;
        this.touchMoveDownCallback = null;
        this.touchMoveDownParams = null;
        return this;
    }
    public SetTouchStartCallback(callback: (_event: cc.Event.EventTouch, ...p: any[]) => void,
        ...params: any[]): TouchComp {
        this.touchStartCallback = callback;
        this.touchStartParams = params;
        return this;
    }
    public SetTouchCancelCallback(callback: (_event: cc.Event.EventTouch, ...p: any[]) => void,
        ...params: any[]): TouchComp {
        this.touchCancelCallback = callback;
        this.touchCancelParams = params;
        return this;
    }
    public SetTouchEndCallback(callback: (_event: cc.Event.EventTouch, ...p: any[]) => void,
        ...params: any[]): TouchComp {
        this.touchEndCallback = callback;
        this.touchEndParams = params;
        return this;
    }
    public SetTouchMoveCallback(callback: (_event: cc.Event.EventTouch, ...p: any[]) => void,
        ...params: any[]): TouchComp {
        this.touchMoveCallback = callback;
        this.touchMoveParams = params;
        return this;
    }
    public SetTouchMoveDownCallback(threshold: number,
        callback: (_event: cc.Event.EventTouch, ...p: any) => void,
        ...params: any[]): TouchComp {
        if (threshold <= 0) {
            Debug.Error("error, moveDown threshold should >0");
        }
        this.moveDownThreshold = threshold;
        this.touchMoveDownCallback = callback;
        this.touchMoveDownParams = params;
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
            this.touchStartCallback(event, ...this.touchStartParams);
        }
    }
    private onTouchMove(event: cc.Event.EventTouch): void {
        if (!this.touchable) {
            return;
        }
        if (this.touchMoveCallback != null) {
            this.touchMoveCallback(event, ...this.touchMoveParams);
        }
    }

    private onTouchCancel(event: cc.Event.EventTouch): void {
        if (!this.touchable) {
            return;
        }
        if (this.touchCancelCallback != null) {
            this.touchCancelCallback(event, ...this.touchCancelParams);
        }
    }

    private onTouchEnd(event: cc.Event.EventTouch): void {
        if (this.touchable == false) {
            return;
        }

        if (this.touchMoveDownCallback != null) {
            if ((this.touchStartPos.y - event.getLocation().y) > this.moveDownThreshold) {
                this.touchMoveDownCallback(event, ...this.touchMoveDownParams);
            }
        }
        if (this.touchEndCallback != null) {
            //this.touchEndCallback(event, this.touchEndParams);//未按照省略参数的形式传参， 运行可能达不到效果
            this.touchEndCallback(event, ...this.touchEndParams);//定义的是 省略参数的形式。 故这里传参，也要用省略参数的形式。 
        }
    }
}
