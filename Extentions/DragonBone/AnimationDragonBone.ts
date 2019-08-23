import Debug from "../../TSTools/Debug/Debug";




/**
 * 对DragonBone动画的封装
 */
export default class AnimationDragonBone {
    private armatureDisplay: dragonBones.ArmatureDisplay = null;
    private armature: dragonBones.Armature = null;

    constructor(display: dragonBones.ArmatureDisplay) {
        this.armatureDisplay = display;
        if (this.armatureDisplay != null && this.armatureDisplay != undefined) {
            this.armature = this.armatureDisplay.armature();
            if (this.armature == null || this.armature == undefined) {
                Debug.Error("armature is null or undefined");
            }
        }
        else {
            Debug.Error("display is null or undefined");
        }
    }

    public GetArmature(): dragonBones.Armature {
        return this.armature;
    }

    public GetDisplay(): dragonBones.ArmatureDisplay {
        return this.armatureDisplay;
    }

    /**
     * - 播放指定动画。
     * @param animationName - 动画数据名称。 （如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放之前播放的动画）
     * @param playTimes - 循环播放次数。 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次] （默认: -1）
     * @returns 播放的动画状态。
     */
    public Play(animationName: string, playTimes?: number) {
        if (this.armatureDisplay == null || this.armatureDisplay == undefined) {
            Debug.Warn("no armatureDisplay, can not play animation:" + animationName);
            return;
        }
        if (this.armature.animation.hasAnimation(animationName)) {
            this.armature.animation.play(animationName, playTimes);
        }
        else {
            Debug.Error("no anim with name:" + animationName);
        }
    }


    /**
     * - 暂停指定动画状态的播放。
     * @param animationName - 动画状态名称。 （如果未设置，则暂停所有动画） 
     */
    public Stop(animationName?: string) {
        this.armature.animation.stop(animationName);
    }


    /**
     * 
     * @param animationName - 动画数据名称。
     * @param fadeInTime - 淡入时间。 [-1: 使用动画数据默认值, [0~N]: 淡入时间 (以秒为单位)] （默认: -1）
     * @param playTimes - 播放次数。 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次] （默认: -1）
     * @param layer - 混合图层，图层高的动画状态会优先获取混合权重，当混合权重分配总和超过 1.0 时，剩余的动画状态将不能再获得权重分配。 （默认: 0）
     * @param group - 混合组名称，该属性通常用来指定多个动画状态混合时的相互替换关系。 （默认: null）
     * @param fadeOutMode - 淡出模式，该属性通常用来指定多个动画状态混合时的相互替换模式。 （默认: AnimationFadeOutMode.SameLayerAndGroup）
     * @returns 播放的动画状态。
     */
    public FadeIn(animationName: string, fadeInTime?: number, playTimes?: number, layer?: number, group?: string | null, fadeOutMode?: dragonBones.AnimationFadeOutMode): dragonBones.AnimationState | null {
        if (this.armatureDisplay == null || this.armatureDisplay == undefined) {
            Debug.Warn("no armatureDisplay, can not play animation:" + animationName);
            return null;
        }

        if (this.armature.animation.hasAnimation(animationName)) {
            // Debug.Log("播放：" + animationName);
            let state: dragonBones.AnimationState = this.armature.animation.fadeIn(animationName, fadeInTime, playTimes, layer, group, fadeOutMode);
            state.resetToPose = false;
            return state;
        }
        else {
            Debug.Error("no anim with name:" + animationName);
            return null;
        }
    }

    //所有的事件数据
    private eventDatas: { animationName: string, eventType: string, callBack: () => void, autoRelease: boolean }[] = [];
    //所有的事件类型(要保证唯一性)
    private eventTypes: string[] = [];


    /**
     * 
     * @param animationName 动作名
     * @param eventType 类型，如：dragonBones.EventObject.COMPLETE ；dragonBones.EventObject.FRAME_EVENT
     * @param callBack 
     */
    public AddEventListener(animationName: string, eventType: string, callBack: () => void, autoRelease: boolean = true) {
        if (!this.existEventData(animationName, eventType)) {
            this.eventDatas.push({ animationName, eventType, callBack, autoRelease });
        }

        if (this.eventTypes.indexOf(eventType) == -1) {
            this.eventTypes.push(eventType);
            this.armatureDisplay.addEventListener(eventType, this.animationEventHandler, this);
        }
    }

    private existEventData(animationName: string, eventType: string): boolean {
        for (let i = 0; i < this.eventDatas.length; i++) {
            const element = this.eventDatas[i];
            if (element.animationName === animationName && element.eventType === eventType) {
                return true;
            }
        }

        return false;
    }

    private animationEventHandler(event2) {
        let event: dragonBones.EventObject = event2;

        //处理模型动作
        for (let i = 0; i < this.eventDatas.length; i++) {
            const element = this.eventDatas[i];
            if (element.animationName === event.animationState.name && element.eventType === event.type) {
                // Debug.Warn("触发！！  监听 animationName: " + element.animationName + ", eventType:" + element.eventType + ", nodeName" + this.armatureDisplay.node.name);
                element.callBack();
                if (element.autoRelease) {//移除
                    this.RemoveAnimationAndEventListen(element.animationName, element.eventType);
                }
            }
        }

        //处理帧事件（或者帧声音）
        for (let i = 0; i < this.eventDatas.length; i++) {
            const element = this.eventDatas[i];
            if (element.animationName === event.name && element.eventType === event.type) {
                // Debug.Warn("触发！！ 帧事件 监听 :   " + this.armatureDisplay.node.name);
                element.callBack();

                if (element.autoRelease) {//移除
                    this.RemoveAnimationAndEventListen(element.animationName, element.eventType);
                }
            }
        }
    }

    /**
     * 移除对指定动作和指定类型的监听
     * @param animationName 
     * @param eventType 
     */
    public RemoveAnimationAndEventListen(animationName: string, eventType: string) {
        for (let i = this.eventDatas.length - 1; i >= 0; i--) {
            const element = this.eventDatas[i];
            if (element.eventType === eventType && element.animationName === animationName) {
                // Debug.Warn("移除attack监听 :   " + this.armatureDisplay.node.name);
                this.eventDatas.splice(i, 1);
            }
        }
    }

    /**
     * 移除对指定类型的监听
     * 这种移除会影响到该类型下所有的动作监听
     * 因此我们这边主动调用了removeEventListener方法
     * @param eventType 
     */
    public RemoveEventListen(eventType: string) {
        this.armatureDisplay.removeEventListener(eventType, this.animationEventHandler, this);

        for (let i = this.eventDatas.length - 1; i >= 0; i--) {
            const element = this.eventDatas[i];
            if (element.eventType === eventType) {
                this.eventDatas.splice(i, 1);
            }
        }
        for (let j = this.eventTypes.length - 1; j >= 0; j--) {
            const element = this.eventTypes[j];
            if (element === eventType) {
                this.eventTypes.splice(j, 1);
            }
        }
    }

    public Destroy(): void {
        if (this.armatureDisplay != null && this.armatureDisplay != undefined) {
            for (let i = this.eventTypes.length - 1; i >= 0; i--) {
                const element = this.eventTypes[i];
                this.armatureDisplay.removeEventListener(element, this.animationEventHandler, this);
            }

            this.eventDatas = [];
            this.eventTypes = [];
            this.armatureDisplay = null;
            this.armature = null;
        }
    }
}
