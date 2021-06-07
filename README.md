# Snabbdom VNode
## VNode & Node

1、VNode 是 Element Node 抽象，ElementNode 主要节点类型
nodeName | nodeType
:---:|:---:
元素节点 | 1
文本节点 | 3
注释节点 | 8

2、VNode 对真实节点操作都需要真实的节点操作dom, 这样VNode中必须有一个elm，而对真实节点操作被实现为一套[API](https://github.com/MusixNotMusic/vnode/blob/master/htmldomapi.ts)
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


