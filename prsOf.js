import { tryParse } from 'be-enhanced/cpu.js';
const reOfDispatchingRule = [
    {
        regExp: new RegExp(String.raw ``),
        defaultVals: {}
    }
];
export function prsOf(self) {
    const { Of, of } = self;
    const both = [...(Of || []), ...(of || [])];
    const dispatchRules = [];
    for (const ofStatement of both) {
        const test = tryParse(ofStatement, reOfDispatchingRule);
        if (test === null)
            throw 'PE';
        dispatchRules.push(test);
    }
    return dispatchRules;
}
