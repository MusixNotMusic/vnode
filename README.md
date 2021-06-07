# Snabbdom VNode
## VNode & Node

### 1、VNode 是 Element Node 抽象，ElementNode 主要节点类型。
本质：节点本身带有特性
nodeName | nodeType
:---:|:---:
元素节点 | 1
文本节点 | 3
注释节点 | 8

### 2、VNode中对ElementNode 的属性抽象。
本质：节点本身带有内容
属性| 描述
:---|:---
attribute| 元素标签属性
class|元素标签样式类
dataset|[元素标签数据](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLOrForeignElement/dataset)
eventlisteners| 元素绑定的事件
props | 在Elm Dom上直接绑定的属性
style | 元素标签样式

### 3、VNode 对真实节点操作都需要真实的节点操作dom, 这样VNode中必须有一个Elm，而对真实节点操作被实现为一套[API](https://github.com/MusixNotMusic/vnode/blob/master/htmldomapi.ts)
功能：节点动作和操作
api| 描述
:---|:---
createElement|[创建元素](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement)
createElementNS|[创建SVG元素](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElementNS)
createTextNode|[创建文本节点](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createTextNode)
createComment|[创建注解节点](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createTextNode)
insertBefore|[在某个元素前面插入](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore)
removeChild|[删除子节点](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild)
appendChild|[添加子节点](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)
parentNode|[父元素](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode)
nextSibling|[下一个兄弟节点](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nextSibling)
tagName|[获取元素标签名称](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/tagName)
isElement| 是否是元素
isText| 是否是文本元素
isComment| 是否是注解元素

4、将ElementNode抽象为VNode，VNode有哪些属性
```ts
interface VNode {
    sel: string | undefined; // tagName + id + classes.join('.') ==> div#id.class1.class2...
    data: VNodeData | undefined; // 带有元素属性的Data
    children: Array<VNode | string> | undefined;
    elm: Node | undefined; // 引用real dom
    text: string | undefined; //元素中文本
    key: key | undefined; // 用于遍历识别key, vue ==> v-key="index",  react ==> key={index}
}
```

```ts
// 对应 Real Node 属性
interface VNodeData {
    props?: Props;
    attrs?: Attrs;
    class?: Classes;
    style?: VNodeStyle;
    dataset?: Dataset;
    on?: On;
    attachData?: AttachData;
    hook?: Hooks;
    key?: Key;
    ns?: string; // for SVGs
    fn?: () => VNode; // for thunks
    args?: any[]; // for thunks
    is?: string; // for custom elements v1
    [key: string]: any; // for any other 3rd party module
}
```


