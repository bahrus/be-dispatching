// @ts-check
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';
/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP, BAP, DispatchRule} from './ts-refs/be-dispatching/types' */;

/**
 * @implements {Actions}

 */
class BeDispatching extends BE {

    /**
     * @type {BEConfig<AP & BEAllProps, Actions & IEnhancement>}
     */
    static config = {
        propInfo: {
            ...propInfo,
            crudeDispatchRules:{},
            dispatchRules:{},
        },
        positractions: [resolved, rejected],
        compacts:{
            when_crudeDispatchRules_changes_call_finishParsing: 0,
            when_dispatchRules_changes_call_hydrate: 0,
        }
    }

    de = de;

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    finishParsing(self){
        const {crudeDispatchRules} = self;
        /** @type {DispatchRule[]} */
        const dispatchRules = [];
        for(const cdr of crudeDispatchRules) {
            const {qualifiers} = cdr;
            const dispatchRule = /** @type {DispatchRule} */ ({...cdr});
            dispatchRules.push(dispatchRule);
            const quals = qualifiers.split(',').map(q=>q.trim()).filter(q=>q.length > 0);
            for(const q of quals) {
                if(q === 'bubbling') {
                    dispatchRule.bubbles = true;
                    continue;
                }
                /** @type {any} */(dispatchRule)[q] = true;
            }
        }
        
        return /** @type {PAP} */ ({
            dispatchRules
        });
    }

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async hydrate(self) {
        const {dispatchRules, enhancedElement} = self;
        const {Dispatcher} = await import('./Dispatcher.js');
        for(const rule of dispatchRules) {
            new Dispatcher(self, rule);
        }
        return /** @type {PAP} */ ({
            resolved: true,
        });
    }


}

await BeDispatching.bootUp();
export { BeDispatching };