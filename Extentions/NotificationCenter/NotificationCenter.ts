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
    public on(name: NotificationName, callback: () => void) {
        this.eventTarget.on(name, callback);
    }

    /**
     * Dispatch a notification
     * @param name 
     */
    public emit(name: NotificationName) {
        this.eventTarget.emit(name);
    }

    /**
     * Cancel listen
     * @param name 
     */
    public off(name: NotificationName) {
        this.eventTarget.off(name);
    }
}
