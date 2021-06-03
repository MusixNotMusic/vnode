import { VNode, VNodeData } from '../vnode'
import { Module } from './module'

type Listener<T> = (this: VNode, ev: T, vnode: VNode) => void;

export type On = {
    [N in keyof HTMLElementEventMap]?:
        | Listener<HTMLElementEventMap[N]>
        | Array<Listener<HTMLElementEventMap[N]>>;
} & {
    [event: string]: Listener<any> | Array<Listener<any>>;
}

type SomeListener<N extends keyof HTMLElementEventMap> = 
    | Listener<HTMLElementEventMap[N]>
    | Listener<any>

function invokeHandler<N extends keyof HTMLElementEventMap>(
    handler: SomeListener<N> | Array<SomeListener<N>>,
    vnode: VNode,
    event?: Event
): void {
    if (typeof handler === 'function') {
        handler.call(vnode, event, vnode)
    } else if (typeof handler === 'object') {
        for (let i = 0; i < handler.length; i++) {
            invokeHandler(handler[i], vnode, event)
        }
    }
}

function handleEvent (event: Event, vnode: VNode) {
    const name = event.type;
    const on = (vnode.data as VNodeData).on

    if (on && on[name]) {
        invokeHandler(on[name], vnode, event)
    }
}

function createListener() {
    return function handler(event: Event) {
        handleEvent(event, (handler as any).vnode)
    }
}

function updateEventListeners(oldVnode: VNode, vnode?: VNode): void {
    const oldOn = (oldVnode.data as VNodeData).on
    const oldListener = (oldVnode as any).listener
    const oldElm: Element = oldVnode.elm as Element
    const on = (vnode.data as VNodeData).on
    // const listener = (vnode as any).listener
    const elm: Element = (vnode && vnode.elm) as Element
    let name: string;

    if (oldOn === on) {
        return
    }

    if (oldOn && oldListener) {
        if (!on) {
            for (name in oldOn) {
                oldElm.removeEventListener(name, oldListener, false)
            }
        } else {
            for (name in oldOn) {
                if (!on[name]) {
                    oldElm.removeEventListener(name, oldListener, false)
                }
            }
        }
    }

    if (on) {
        const listener = ((vnode as any).listener = (oldVnode as any).listener || createListener())
        listener.vnode = vnode

        if (!oldOn) {
            for (name in on) {
                // add listener if element was changed or new listeners added
                elm.addEventListener(name, listener, false)
            }
        } else {
            for (name in on) {
                // add listener if new listener added
                if (!oldOn[name]) {
                    elm.addEventListener(name, listener, false)
                }
            }
        }
    }
}

export const eventListenersModule: Module = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners,
}