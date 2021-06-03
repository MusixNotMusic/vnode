import { VNode, VNodeData } from './vnode'
import { h } from './h'

export interface ThunkData extends VNodeData {
    fn: () => VNode;
    args: any[];
}

export interface Thunk extends VNode {
    data: ThunkData;
}

export interface ThunkFn {
    (sel: string, fn: (...args: any[]) => any, args: any[]): Thunk;
    (sel: string, key: any, fn: (...args: any[]) => any, args: any[]): Thunk;
}

function copyToThunk(vnode: VNode, thunk: VNode): void {
}

function init(thunk: VNode): void {   
}

function prepatch(oldVnode: VNode, thunk: VNode): void {

}

export const thunk = function thunk(
    sel: string,
    key?: any,
    fn?: any,
    args?: any
): VNode {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined
    }
    return h(sel, {
        key: key,
        hook: { init, prepatch },
        fn: fn,
        args: args
    });
} as ThunkFn;