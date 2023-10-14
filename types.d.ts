import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    of?: Array<DispatchStatement>
    Of?: Array<DispatchStatement>
}

export interface AllProps extends EndUserProps{
    isParsed?: boolean,
    dispatchRules?: Array<DispatchRule>
}

export type DispatchStatement = string;

export interface DispatchRule{
    dispatchOn?: string,
    dispatchOnPropChange?: string,
    qualifiers?: string,
    eventType?: string,
    bubbles?: boolean,
    composed?: boolean,
    replace?: boolean,
}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export interface Actions{
    onCamelized(self: this): ProPAP;
    hydrate(self: this): ProPAP;
}