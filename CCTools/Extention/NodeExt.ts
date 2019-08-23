import Queue from "../../TSTools/Generic/Queue";



export class NodeExt {

    /**
     * 从目标节点及其子孙节点中找到满足`name`的节点.
     * 未找到满足条件的，返回null
     * @param targetNode 
     * @param name 
     */
    public static Search(targetNode: cc.Node, name: string): cc.Node {
        if (targetNode.name == name) {
            return targetNode;
        }

        for (let i = 0; i < targetNode.children.length; i++) {
            const child = targetNode.children[i];
            let result = this.Search(child, name);
            if (result != null) {
                return result;
            }
        }

        return null;
    }


    /**
     * 从子孙节点中找到第一个名字符合的节点，不包括目标节点本身。
     * 使用 深度优先的方式。
     * 若没有找到，则返回null
     * @param targetNode 
     * @param name 
     */
    public static FindChildByName(targetNode: cc.Node, name: string): cc.Node {
        for (let i = 0; i < targetNode.children.length; i++) {
            const child = targetNode.children[i];
            if (child.name == name) {
                return child;
            }

            let result = this.FindChildByName(child, name);
            if (result != null)
                return result;
        }
        return null;
    }


    /**
     * 从子孙节点中找到第一个名字符合的节点，不包括targetNode节点本身。
     * 使用 广度优先的方式。
     * 若没有找到，则返回null
     * @param targetNode 
     * @param name 
     */
    public static FindChildByName2(targetNode: cc.Node, name: string): cc.Node {
        let queue: Queue<cc.Node> = new Queue();
        queue.Enqueue(targetNode);

        while (queue.Count() > 0) {
            let t = queue.Dequeue();
            if (t.name == name) {
                if (t != targetNode) {
                    return t;
                }
            }
            for (let i = 0; i < t.children.length; i++) {
                const element = t.children[i];
                queue.Enqueue(element);
            }
        }

        return null;
    }




    /**
     * 根据具体路径获得子物体，路径用/分割。
     * 路径不包含targetNode     
     * @param targetNode 
     * @param path 
     */
    public static GetChildByPath(targetNode: cc.Node, path: string) {
        let queue: Queue<cc.Node> = new Queue();
        for (let i = 0; i < targetNode.children.length; i++) {
            const element = targetNode.children[i];
            queue.Enqueue(element);
        }

        let queue2: Queue<cc.Node> = null;
        let paths: string[] = path.split("/");
        for (let j = 0; j < paths.length; j++) {
            if (queue2 == null) {
                queue2 = new Queue();
            }
            const name = paths[j];
            while (queue.Count() > 0) {
                let t = queue.Dequeue();
                if (t.name == name) {
                    if (j == paths.length - 1) {//找到满足条件的
                        return t;
                    }
                    else {
                        for (let k = 0; k < t.children.length; k++) {
                            const element = t.children[k];
                            queue2.Enqueue(element);
                        }
                    }
                }
            }
            queue = queue2;
            queue2 = null;
        }


        return null;
    }


    /**
     * 获得或添加组件
     * @param targetNode 
     * @param type 组件类型
     */
    public static GetOrAddComponent<T extends cc.Component>(targetNode: cc.Node, type: new () => T) {
        let comp = targetNode.getComponent<T>(type);
        if (comp == null) {
            comp = targetNode.addComponent<T>(type)
        }
        return comp;
    }

    public static Distance(node1: cc.Node, node2: cc.Node): number {
        return node1.position.sub(node2.position).mag();
    }
    public static DirNormal2(from: cc.Node, to: cc.Node): cc.Vec2 {
        return to.position.sub(from.position).normalize();
    }
    public static Center(from: cc.Node, to: cc.Node): cc.Vec2 {
        let h = to.position.sub(from.position);
        return new cc.Vec2(from.position.x + h.x * 0.5, from.position.y + h.y * 0.5);
    }
    
}
