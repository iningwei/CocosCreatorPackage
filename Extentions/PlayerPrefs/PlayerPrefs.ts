import { KeyName } from "./KeyName";

/**
 * 本地存储类
 * 仿Unity3D api
 */
export class PlayerPrefs {
    public static Set(key: KeyName, value: any) {
        cc.sys.localStorage.setItem(key, value);
    }
    public static Get(key: KeyName): any {
        return cc.sys.localStorage.getItem(key);
    }

    public static HasKey(key: KeyName): boolean {
        if (this.Get(key)) {
            return true;
        }
        return false;
    }
    public static DeleteKey(key: KeyName) {
        cc.sys.localStorage.removeItem(key);
    }

    public static DeleteAll() {
        cc.sys.localStorage.clear();
    }
}
