import { NotificationType } from "./NotificationType";

 

/**
 * CocosCreator's global Event/Message Center.
 */
export class NotificationCenter {
    private eventTarget: cc.EventTarget = new cc.EventTarget();

    private static instance: NotificationCenter = null;
    public static get Instance(): NotificationCenter {
        if (this.instance == null) {
            this.instance = new NotificationCenter();
        }
        return this.instance;
    }

    /**
     * Listen to a notification
     * @param type 
     * @param callback 
     */
    public on(type: NotificationType, callback: Function, target?: any) {
        this.eventTarget.on(type, callback, target);
    }

    /**
     * 
	 *	通过事件名发送自定义事件
	 *	@param type event type
	 *	@param arg1 First argument
	 *	@param arg2 Second argument
	 *	@param arg3 Third argument
	 *	@param arg4 Fourth argument
	 *	@param arg5 Fifth argument
     */
    public emit(type: NotificationType, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) {
        this.eventTarget.emit(type, arg1, arg2, arg3, arg4, arg5);
    }

    /**
     * 
     * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
	 *	@param type A string representing the event type being removed.
	 *	@param callback The callback to remove.
	 *	@param target The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
	 *	
     */
    public off(type: NotificationType, callback?: Function, target?: any) {
        this.eventTarget.off(type, callback, target);
    }
}
