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
		//需要注意：
		//在pc浏览器或者手机浏览器上，没有key对应的item的时候，会返回undefined
		//但是在微信小游戏中会返回空字符串
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
