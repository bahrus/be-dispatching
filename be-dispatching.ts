import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, DispatchRule} from './types';
import {register} from 'be-hive/register.js';

export class BeDispatching extends BE<AP, Actions> implements Actions{
    #abortControllers: Array<AbortController>  = [];
    detach(): void {
        for(const ac of this.#abortControllers){
            ac.abort();
        }
    }
    static override get beConfig(){
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        } as BEConfig;
    }

    async onCamelized(self: this) {
        const {of, Of} = self;
        let dispatchRules: Array<DispatchRule> = [];
        if((of || Of) !== undefined){
            const {prsOf} = await import('./prsOf.js');
            dispatchRules = prsOf(self);
        }
        return {
            dispatchRules
        };
    }

    async hydrate(self: this){
        const {enhancedElement, dispatchRules} = self;
        for(const rule of dispatchRules!){
        }
        const {nudge} = await import('trans-render/lib/nudge.js');
        nudge(enhancedElement);
        return {
            resolved: true,
        }
    }
}

export interface BeDispatching extends AllProps{}

const tagName = 'be-dispatching';
const ifWantsToBe = 'dispatching';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config:{
        tagName,
        isEnh: true,
        propDefaults:{
            ...propDefaults,
        },
        propInfo:{
            ...propInfo
        },
        actions:{
            onCamelized:{
                ifAllOf: ['isParsed'],
                ifAtLeastOneOf: ['of', 'Of',],
            },
            hydrate: 'dispatchRules'
        }
    }
});

register(ifWantsToBe, upgrade, tagName);