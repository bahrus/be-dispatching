// @ts-check
import { BeHive, MountObserver, seed } from 'be-hive/be-hive.js';
/** @import {AP} from './ts-refs/be-dispatching/types'; */
/** @import {EMC} from './ts-refs/trans-render/be/types' */

const dispatchOn = String.raw ` on (?<dispatchOn>[\w]+)`;
const dispatchEvent = String.raw ` event (?<dispatch>.*)`;
const qualifiers = String.raw `(o|O)f (?<qualifiers>.*)`;
const qualifiersDispatch = String.raw `^${qualifiers}${dispatchEvent}`;
const qualifiersDispatchOn = String.raw `^${qualifiers}${dispatchEvent}${dispatchOn}`;
/**
 * @type {EMC<any, AP>}
 */
export const emc = {
    base: 'be-dispatching',
    map: {
        '0.0': {
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
            regExpExts: {
                crudeDispatchRules:[
                    {
                        regExp: qualifiersDispatchOn,
                        defaultVals:{},
                    },
                    {
                        regExp: qualifiersDispatch,
                        defaultVals:{}
                    }
                    
                ],
                
            }
        }
    },
    enhPropKey: 'beDispatching',
    importEnh: async () => {
        const {BeDispatching} = await import('./be-dispatching.js');
        return BeDispatching;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);