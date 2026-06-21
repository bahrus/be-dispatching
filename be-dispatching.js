// @ts-check
/** @import {Actions, PAP, AllProps, AP, DispatchRule} from './types/be-dispatching/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway, SpawnContext} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig} from './types/roundabout/types' */;

/**
 * @implements {Actions}
 */
class BeDispatching {

    /**
     * @this {AllProps & Actions}
     * @param {Element & ElementEnhancementGateway} enhancedElement
     * @param {SpawnContext} ctx
     * @param {PAP} initVals
     */
    constructor(enhancedElement, ctx, initVals) {
        this.init(this, enhancedElement, ctx, initVals);
    }

    /**
     * @param {AllProps} self
     * @param {Element & ElementEnhancementGateway} enhancedElement
     * @param {SpawnContext} ctx
     * @param {PAP} initVals
     */
    async init(self, enhancedElement, ctx, initVals) {
        const {customData} = /** @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>} */ (ctx.emc);
        /** @type {RoundaboutOptions} */
        const raOptions = {
            ...customData,
            vm: self,
            initialPropVals: {
                enhancedElement,
                ...customData?.defaultPropVals,
                ...initVals
            }
        };
        (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
    }

    /**
     * Parse crude dispatch rules into structured DispatchRule objects.
     * @param {AP} self
     * @returns {PAP}
     */
    finishParsing(self) {
        const {crudeDispatchRules} = self;
        if (!crudeDispatchRules) return {};
        const {statements, success} = crudeDispatchRules;
        if (!success || !statements) return {};

        /** @type {DispatchRule[]} */
        const dispatchRules = [];
        for (const statement of statements) {
            const {value} = statement;
            if (!value) continue;
            const dispatchRule = /** @type {DispatchRule} */ ({...value});
            const {qualifiers} = dispatchRule;
            if (qualifiers) {
                const quals = qualifiers.split(',').map(q => q.trim()).filter(q => q.length > 0);
                for (const q of quals) {
                    if (q === 'bubbling') {
                        dispatchRule.bubbles = true;
                        continue;
                    }
                    /** @type {any} */ (dispatchRule)[q] = true;
                }
            }
            dispatchRules.push(dispatchRule);
        }

        return /** @type {PAP} */ ({
            dispatchRules
        });
    }

    /** @type {AbortController | undefined} */
    #ac;

    /**
     * Set up event listeners for each dispatch rule.
     * @param {AP} self
     * @returns {Promise<PAP>}
     */
    async hydrate(self) {
        const {dispatchRules, enhancedElement} = self;
        if (!dispatchRules) return {};

        if (this.#ac) this.#ac.abort();
        this.#ac = new AbortController();
        const signal = this.#ac.signal;

        for (const rule of dispatchRules) {
            const {dispatchOn, dispatch, bubbles, cancelable, composed, replace} = rule;
            const eventToListenFor = dispatchOn || 'input';

            enhancedElement.addEventListener(eventToListenFor, (evt) => {
                if (replace) {
                    evt.stopPropagation();
                }
                enhancedElement.dispatchEvent(new Event(dispatch, {
                    bubbles: !!bubbles,
                    cancelable: !!cancelable,
                    composed: !!composed
                }));
            }, {signal});
        }

        return /** @type {PAP} */ ({
            resolved: true,
        });
    }
}

export {BeDispatching};
