# CocosCreator工具包
## 通知中心(NotificationCenter)
这是一个全局的事件侦听和派发解决方案。

注意你需要在需要移除的时候移除侦听。

## 本地存储(PlayerPrefs)
咦，如果你对Unity3D熟悉的话，那么你一定使用过这个类。

是的，我使用CocosCreator提供的方法（已经很友好的解决了本地存储中的一些复杂问题，诸如浏览器兼容性）定制了这个叫做PlayerPrefs的类。

## 节点交互事件(TouchComp)
如果你要想对节点进行交互，我推荐你使用这个方案。

只需要把TouchComp这个组件添加到目标节点，并设置一些交互的回调。使用起来非常爽快且支持链式函数。

下面是一个示意的代码段：
```javascript
let touchComp = holeNode.addComponent(TouchComp)
                .SetTouchStartCallback(this.holeTouchStart.bind(this))
                .SetTouchMoveCallback(this.holeTouchMove.bind(this))
                .SetTouchEndCallback(this.holeTouchEnd.bind(this))
                .SetTouchCancelCallback(this.holeTouchEnd.bind(this))
                .SetTouchable(true);
```

## 无限列表(ScrollView)
目前只支持垂直方向上自上而下的无尽列表。所以它只能算得上一个beta版本。

## 提示(Toast)
类似安卓系统中的Toast，具体参见[这里](https://github.com/iningwei/ToastForCocosCreator)。
