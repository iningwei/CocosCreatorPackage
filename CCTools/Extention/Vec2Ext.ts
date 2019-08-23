
export class Vec2Ext {
    public static Center(fromPos: cc.Vec2, toPos: cc.Vec2): cc.Vec2 {
        let h = toPos.sub(fromPos);
        return new cc.Vec2(fromPos.x + h.x * 0.5, fromPos.y + h.y * 0.5);
    }
    public static Distance(fromPos: cc.Vec2, toPos: cc.Vec2): number {
        return toPos.sub(fromPos).mag();
    }
}
