import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    of?: Array<DispatchStatement>
    Of?: Array<DispatchStatement>
}

export type DispatchStatement = string;

export interface DispatchRule{
    dispatchOn?: string,
    dispatchOnPropChange?: string,
    eventType?: string,
    bubbles?: boolean,
    composed?: boolean,
    replace?: boolean,
}