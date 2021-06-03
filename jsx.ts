import { vnode, VNode, VNodeData } from './vnode'
import { h, ArrayOrElement } from './h'

namespace JSXInternal {
    export type Element = VNode;
    export interface InterinsicElements {
        [elemName: string]: VNodeData;
    }
}

export type JsxVNodeChild = 
    | VNode
    | string
    | number
    | boolean
    | undefined
    | null;

export type JsxVNodeChildren = ArrayOrElement<JsxVNodeChild>;

export type FunctionComponent = (
    props: {[props: string]: any} | null,
    children?: VNode[]
) => VNode;

function flattenAndFilter(
    children: JsxVNodeChildren[],
    flattened: VNode[]
): VNode[] {
    for (const child of children) {
        if (
            child !== undefined &&
            child !== null &&
            child !== false &&
            child !== ''
        ) {
            if (Array.isArray(child)) {
                flattenAndFilter(child, flattened)
            } else if (
                typeof child === 'string' || 
                typeof child === 'number' || 
                typeof child === 'boolean') {
                flattened.push(
                    vnode(undefined, undefined, undefined, String(child), undefined)
                );
            } else {
                flattened.push(child);
            }
        }
    }
    return flattened;
}

export function jsx(
    tag: string | FunctionComponent,
    data: VNodeData | null,
    ...children: JsxVNodeChildren[]
): VNode {
    const flatChildren = flattenAndFilter(children, []);
    if (typeof tag === "function") {
        return tag(data, flatChildren);
    } else {
        if (flatChildren.length === 1 &&
            !flatChildren[0].sel &&
            flatChildren[0].text
        ) {
            return h(tag, data, flatChildren[0].text);
        } else {
            return h(tag, data, flatChildren);
        }
    }
}

export namespace jsx {
    export import JSX = JSXInternal;
}