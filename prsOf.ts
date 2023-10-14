import {AP, ProPAP, PAP, DispatchRule} from './types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {tryParse} from 'be-enhanced/cpu.js';

const dispatchOn = String.raw `(?<!\\)On(?<dispatchOn>[\w]+)`;
const dispatchEvent = String.raw `(?<!\\)Event(?<dispatch>.*)`;
const qualifiers = String.raw `(?<qualifiers>[\w\,]+)`
const reOfDispatchingRule: Array<RegExpOrRegExpExt<Partial<DispatchRule>>> = [
    {
        regExp: new RegExp(String.raw `^${qualifiers}${dispatchEvent}${dispatchOn}`),
        defaultVals:{}
    },
    {
        regExp: new RegExp(String.raw `^${qualifiers}${dispatchEvent}`),
        defaultVals:{}
    }
];

const map = new Map<string, keyof CustomEventInit>([
    ['bubbling', 'bubbles'],
])

export function prsOf(self: AP) : Array<DispatchRule>{
    const {Of, of} = self;
    const both = [...(Of || []), ...(of || [])];
    const dispatchRules: Array<DispatchRule> = [];
    for(const ofStatement of both){
        const test = tryParse(ofStatement, reOfDispatchingRule) as DispatchRule;
        if(test === null) throw 'PE';
        const {qualifiers} = test;
        if(qualifiers){
            const split = qualifiers.split(',');
            for(const token of split){
                const tokenLC = token.toLowerCase();
                const prop = map.has(tokenLC) ? map.get(tokenLC)! : tokenLC;
                (<any>test)[prop] = true;
            }
        }
        console.log({test});
        dispatchRules.push(test);
    }
    return dispatchRules;
}