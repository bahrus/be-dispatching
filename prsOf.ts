import {AP, ProPAP, PAP, DispatchRule} from './types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';

const localEvent = String.raw `(?<!\\)On(?<localEvent>[\w]+)`;
const dispatchEvent = String.raw `(?<!\\)Event(?<dispatch>[\w]+)`;
const qualifiers = String.raw `(?<qualifiers>[\w\,]+)`
const reOfDispatchingRule: Array<RegExpOrRegExpExt<Partial<DispatchRule>>> = [
    {
        regExp: new RegExp(String.raw ``),
        defaultVals:{}
    }
];

export function prsOf(self: AP) : Array<DispatchRule>{
    const {Of, of} = self;
    const both = [...(Of || []), ...(of || [])];
    const dispatchRules: Array<DispatchRule> = [];
    for(const ofStatement of both){
        const test = tryParse(ofStatement, reOfDispatchingRule) as DispatchRule;
        console.log({test});
        if(test === null) throw 'PE';
        dispatchRules.push(test);
    }
    return dispatchRules;
}