export default class StringExt {
    public static Format(inputStr: string, ...args: any[]): string {
        let result = inputStr;
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
}
