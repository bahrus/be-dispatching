
// @ts-check
/** @import {BAP, DispatchRule} from './ts-refs/be-dispatching/types.js' */;
/**
 * @implements {EventListenerObject}
 */
export class Dispatcher{
    /**
     * @type {WeakRef<BAP>}
     */
    #bapRef;

    /**
     * @type {DispatchRule}
     */
    #rule;
    /**
     * 
     * @param {BAP} bap 
     * @param {DispatchRule} rule 
     */
    constructor(bap, rule){
        this.#bapRef = new WeakRef(bap);
        this.#rule = rule;
        this.#do();
    }

    async #do(){
        const {dispatchOn,  dispatchOnPropChange} = this.#rule;
        const bap = this.#bapRef.deref();
        if(!bap) return;
        const {enhancedElement} = bap;
        if(dispatchOn !== undefined){
            enhancedElement.addEventListener(dispatchOn, this);
        }
        
    }

    /**
     * 
     * @param {Event} evt 
     */
    handleEvent(evt) {
        const self = this.#bapRef.deref();
        if(!self) return;
        const {bubbles, cancelable, composed, dispatch, replace} = this.#rule;
        if(replace){
            //evt.stopImmediatePropagation();
            evt.stopPropagation();
            //evt.preventDefault();
        }
        const {enhancedElement} = self;
        enhancedElement.dispatchEvent(new Event(dispatch, {
            bubbles: !!bubbles, 
            cancelable: !!cancelable,
            composed: !!composed
        }));
    }
}