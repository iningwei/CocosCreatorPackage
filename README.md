# CocosCreatorPackage

## NotificationCenter
This is a global event listen and dispatch solution.

Be aware of removing listener when it should be removed.

## PlayerPrefs
Oooops,if you are still familiar with Unity3D,you must have used this static class.

Yes,i just made a local-storage class named PlayerPrefs used Cocos's inner function,which have friendly resolved many complex situations such as browers compatibility.

## TouchComp
If you want add a mouse/touch interation with a node,i recommend you use this solution.

Just add a component named TouchComp to the target node,then set some interation callbacks. It is easy use and support chain-functions.

Here is a script snippet:
```javascript
let touchComp = holeNode.addComponent(TouchComp)
                .SetTouchStartCallback(this.holeTouchStart.bind(this))
                .SetTouchMoveCallback(this.holeTouchMove.bind(this))
                .SetTouchEndCallback(this.holeTouchEnd.bind(this))
                .SetTouchCancelCallback(this.holeTouchEnd.bind(this))
                .SetTouchable(true);
```

## ScrollView
It is a solution of endless scrooview,now only support vertical scrollview from top to bottom.

So it is only an beta version.

## Toast
See [here]("https://github.com/iningwei/ToastForCocosCreator").