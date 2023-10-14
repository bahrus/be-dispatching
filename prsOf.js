import { tryParse } from 'be-enhanced/cpu.js';
const dispatchOn = String.raw `(?<!\\)On(?<dispatchOn>[\w]+)`;
const dispatchEvent = String.raw `(?<!\\)Event(?<dispatch>.*)`;
const qualifiers = String.raw `(?<qualifiers>[\w\,]+)`;
const reOfDispatchingRule = [
    {
        regExp: new RegExp(String.raw `^${qualifiers}${dispatchEvent}${dispatchOn}`),
        defaultVals: {}
    },
    {
        regExp: new RegExp(String.raw `^${qualifiers}${dispatchEvent}`),
        defaultVals: {}
    }
];
const map = new Map([
    ['bubbling', 'bubbles'],
]);
export function prsOf(self) {
    const { Of, of } = self;
    const both = [...(Of || []), ...(of || [])];
    const dispatchRules = [];
    for (const ofStatement of both) {
        const test = tryParse(ofStatement, reOfDispatchingRule);
        if (test === null)
            throw 'PE';
        const { qualifiers } = test;
        if (qualifiers) {
            const split = qualifiers.split(',');
            for (const token of split) {
                const tokenLC = token.toLowerCase();
                const prop = map.has(tokenLC) ? map.get(tokenLC) : tokenLC;
                test[prop] = true;
            }
        }
        //console.log({test});
        dispatchRules.push(test);
    }
    return dispatchRules;
}
