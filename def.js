import  'assign-gingerly/object-extension.js';

/**
 * Registers be-dispatching's config with the enhancement registry, so it can
 * be attached programmatically via `enh.set.beDispatching` or `enh.get(emc)`.
 * @param {Element | undefined} ref
 */
export async function defBeDispatching(ref){
    const {default: emc} = await import('./emc.json', {with: {type: 'json'}});
    return await push(ref, emc);
}

async function push(ref, emc){
    const {BeDispatching} = await import('./be-dispatching.js');
    const {enhConfig} = emc;
    enhConfig.spawn = BeDispatching;
    enhConfig.customData = emc.customData;
    const registry = ref?.customElementRegistry ?? customElements;
    const {enhancementRegistry} = registry;
    enhancementRegistry.push(enhConfig);
    return enhConfig;
}
