import { VNode, VNodeData } from '../vnode';
import { Module } from './module';

export type VNodeStyle = Record<string, string> & {
    delayed?: Record<string, string>;
    remove?: Record<string, string>;
}

const raf = (typeof window !== 'undefined' && window.requestAnimationFrame.bind(window)) || setTimeout
const nextFrame = function (fn: any) {
    raf(function () {
        raf(fn);
    });
};
let reflowForced = false;

function setNextFrame(obj: any, prop: string, val: string): void {
    nextFrame(function() {
        obj[prop] = val;
    })
}

function updateStyle(oldVnode: VNode, vnode: VNode): void {
    
}

function applyDestroyStyle(vnode: VNode): void {

}

function applyRemoveStyle(vnode: VNode, rm: () => void): void {

}

function forceReflow() {

}

export const styleModule: Module = {
    pre: forceReflow,
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
}