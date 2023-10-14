import { tryParse } from 'be-enhanced/cpu.js';
const localEvent = String.raw `(?<!\\)On(?<localEvent>[\w]+)`;
const dispatchEvent = String.raw `(?<!\\)Event(?<dispatch>[\w]+)`;
const qualifiers = String.raw `(?<qualifiers>[\w\,]+)`;
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
        console.log({ test });
        if (test === null)
            throw 'PE';
        dispatchRules.push(test);
    }
    return dispatchRules;
}
