import '@agoric/zoe/exported.js';
import { Far } from '@agoric/marshal';
import '@agoric/vats/exported.js';
import '@agoric/swingset-vat/src/vats/network/types.js';
import '@agoric/zoe/exported.js';
import { startCalypso } from './calypso.js'

/**
 * This is the Calypso contract that allows for the creation of controller accounts
 * on all chains supported (Axelar + IBC Chains) which are controlled by the users Agoric wallet.
 * They can then interact with these wallets via Calypso aggregated messages to manage their defi portfolios
 * and protocols across 70+ chains.
 * @type {ContractStartFn}
 * @param {ContractFacet} zcf
 */
const start = async (zcf) => {

  // Creator facet for instance creator to call
  const creatorFacet = Far('creatorFacet', {
    /**
     * Initializes Calypso and then return the Calypso object to interact with the Calypso protocol with.
     * @returns {Promise<CalypsoResponse>}
     */
    initCalypso: async (/** @type {MsgOpenAccount} */ msg,/** @type {ZoeService} */ zoe, /** @type {NameAdmin} */ nameHub) => await startCalypso(msg, zoe, nameHub)
  });
  
  return harden({ creatorFacet });
};

harden(start);
export { start };
