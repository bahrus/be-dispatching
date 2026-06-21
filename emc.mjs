// @ts-check

/** @import {EMC} from './types/mount-observer/types' */;
/** @import {AllProps, Actions} from './types/be-dispatching/types' */
/** @import {RAConfig} from './types/roundabout/types' */
/** @import {PatternConfig} from './types/nested-regex-groups/types' */

/** @type {PatternConfig[]} */
const parsePatterns = [
    {
        name: 'qualifiersDispatchOn',
        pattern: String.raw`^(?:o|O)f (?<qualifiers>[\s\S]*?) event (?<dispatch>[\S]+) on (?<dispatchOn>[\w]+)`,
        description: 'Of qualifiers event name on eventType: of bubbling, composed event myEvent on change',
        defaultVals: {}
    },
    {
        name: 'qualifiersDispatch',
        pattern: String.raw`^(?:o|O)f (?<qualifiers>[\s\S]*?) event (?<dispatch>[\S]+)`,
        description: 'Of qualifiers event name: of bubbling, composed event myEvent',
        defaultVals: {}
    }
];

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>}
 */
export const emc = {
    enhConfig: {
        enhKey: 'be-dispatching',
        spawn: 'be-dispatching/be-dispatching.js',
        withAttrs: {
            base: 'be-dispatching',
            _base: {
                mapsTo: 'crudeDispatchRules',
                parser: 'parse-pattern-statements',
                instanceOf: 'Array',
                parserConfig: parsePatterns
            }
        }
    },
    customData: {
        weakRef: {
            properties: ['enhancedElement']
        },
        actions: {
            hydrate: {
                ifAllOf: ['dispatchRules', 'enhancedElement']
            }
        },
        compacts: {
            when_crudeDispatchRules_changes_call_finishParsing: 0,
        }
    }
};

export function render() {
    return JSON.stringify(emc, null, 4);
}

console.log(render());
