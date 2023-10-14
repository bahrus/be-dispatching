import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeDispatching extends BE {
    #abortControllers = [];
    detach() {
        for (const ac of this.#abortControllers) {
            ac.abort();
        }
    }
    static get beConfig() {
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        };
    }
    async onCamelized(self) {
        const { of, Of } = self;
        let dispatchRules = [];
        if ((of || Of) !== undefined) {
            const { prsOf } = await import('./prsOf.js');
            dispatchRules = prsOf(self);
        }
        return {
            dispatchRules
        };
    }
    async hydrate(self) {
        const { enhancedElement, dispatchRules } = self;
        for (const rule of dispatchRules) {
            const abortController = new AbortController();
            this.#abortControllers.push(abortController);
            let { dispatchOn } = rule;
            let eventTar = enhancedElement;
            if (dispatchOn === undefined) {
                const { getDefaultSignalInfo } = await import('be-linked/getDefaultSignalInfo.js');
                const signalInfo = getDefaultSignalInfo(enhancedElement);
                dispatchOn = signalInfo.type;
                eventTar = signalInfo.eventTarget;
            }
            eventTar.addEventListener(dispatchOn, e => {
                const { replace, bubbles, composed, cancelable, dispatch } = rule;
                if (replace) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                }
                enhancedElement.dispatchEvent(new CustomEvent(dispatch, {
                    bubbles, composed, cancelable
                }));
            }, { signal: abortController.signal });
        }
        const { nudge } = await import('trans-render/lib/nudge.js');
        nudge(enhancedElement);
        return {
            resolved: true,
        };
    }
}
const tagName = 'be-dispatching';
const ifWantsToBe = 'dispatching';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            onCamelized: {
                ifAllOf: ['isParsed'],
                ifAtLeastOneOf: ['of', 'Of',],
            },
            hydrate: 'dispatchRules'
        }
    },
    superclass: BeDispatching,
});
register(ifWantsToBe, upgrade, tagName);
