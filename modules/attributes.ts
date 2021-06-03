import { VNode, VNodeData } from '../vnode';
import { Module } from './module';

export type Attrs = Record<string, string | number | boolean>

const xlinkNS = 'http://www.w3.org/1999/xlink'
const xmlNS = 'http://www.w3.org/XML/1998/namespace'
const colonChar = 58
const xChar = 120

function updateAttrs(oldVnode: VNode, vnode: VNode): void {
    let key: string
    const elm: Element = vnode.elm as Element
    let oldAttrs = (oldVnode.data as VNodeData).attrs
    let attrs = (vnode.data as VNodeData).attrs

    if (!oldAttrs && !attrs) return
    if (oldAttrs === attrs) return
    oldAttrs = oldAttrs || {}
    attrs = attrs || {}
    // update modified attributes, add new attributes
    for (key in attrs) {
        const cur = attrs[key]
        const old = oldAttrs[key]
        if (old !== cur) {
            if (cur === true) {
                elm.setAttribute(key, '')
            } else if (cur === false) {
                elm.removeAttribute(key)
            } else {
                if (key.charCodeAt(0) !== xChar) {
                    elm.setAttribute(key, cur as any)
                } else if (key.charCodeAt(3) === colonChar) {
                    // xml
                    elm.setAttributeNS(xmlNS, key, cur as any);
                } else if (key.charCodeAt(5) === colonChar) {
                    // xlink
                    elm.setAttributeNS(xlinkNS, key, cur as any);
                } else {
                    elm.setAttribute(key, cur as any);
                }
            }
        }
    }

    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key)
        }
    }
}

export const attributesModule: Module = {
    create: updateAttrs,
    update: updateAttrs
}