import '@agoric/zoe/exported.js';
import { Far } from '@agoric/marshal';

/**
 * This is the Calypso contract that allows for the creation of controller accounts
 * on all chains supported (Axelar + IBC Chains) which are controlled by the users Agoric wallet.
 * They can then interact with these wallets via Calypso aggregated messages to manage their defi
 * and protocols across 60+ chains.
 * @type {ContractStartFn}
 * @param {ContractFacet} zcf
 * @param {Object} chains
 */
const start = async (zcf) => {

  const calypso = {
    // Public faucet for anyone to call
    swap: (/** @type {MsgSwap} */ msg) => agSwap(msg),
    addLP: (/** @type {MsgAddLP} */ msg) => agAddLP(msg),
    removeLP: (/** @type {MsgRemoveLP} */ msg) => agRemoveLP(msg),
    stake: (/** @type {MsgStake} */ msg) => stake(msg),
    unstake: (/** @type {MsgUnstake} */ msg) => unstake(msg),
    restake: (/** @type {MsgRestake} */ msg) => restake(msg),
  }

  const openCalypsoAccount = async () => {
    return calypso
  }

  // Public faucet for anyone to call
  const publicFacet = Far('publicFacet', {
    /**
     * Creates a Calypso account and then returns the Calypso object to interact with all the accounts
     * Calypso created across all chains Calypso supports.
     * @param {MsgOpenAccount} msg
     */
    openCalypsoAccount: (msg) => openCalypsoAccount(msg)
  });
  
  return harden({ publicFacet });
};

harden(start);
export { start };
