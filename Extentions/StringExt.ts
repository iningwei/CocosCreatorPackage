export default class StringExt {
    /**
     * a target string like this:my name is {0},age is {1}
     * @param target the target to be formated
     * @param args 
     */
    public static Format(target: string, ...args: any[]): string {
        let result = target;
        if (args.length > 0) {
            let value: any;
            for (const key in args) {
                if (args.hasOwnProperty(key)) {
                    value = args[key];
                    if (value != null && value.length != 0) {
                        var reg = new RegExp(`\\{${key}\\}`, "g");
                        result = result.replace(reg, value);
                    }
                }
            }
        }
        return result;
    }

    /**
     * 
     * @param target 
     * @param totalLen 
     * @param paddingChar 
     */
    public static PadLeft(target: any, totalLen: number, paddingChar: any = "0"):string {
        if (String(paddingChar).length != 1) {
            console.error("error,paddingChar should only have one char");
        }
        let result = String(target);
        let len = result.length;
        if (len < totalLen) {
            for (let i = 0; i < totalLen - len; i++) {
                result = paddingChar + result;
            }
        }

        return result;
    }
}
