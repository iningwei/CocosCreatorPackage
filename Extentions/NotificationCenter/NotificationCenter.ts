import { NotificationName } from "./NotificationName";

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
     * @param name 
     * @param callback 
     */
    public on(name: NotificationName, callback: Function, target?: any) {
        this.eventTarget.on(name, callback, target);
    }

    /**
     * Dispatch a notification
     * @param name 
     */
    public emit(name: NotificationName, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) {
        this.eventTarget.emit(name, arg1, arg2, arg3, arg4, arg5);
    }

    /**
     * Cancel listen
     * @param name 
     */
    public off(name: NotificationName, callback?: Function, target?: any) {
        this.eventTarget.off(name, callback, target);
    }
}
