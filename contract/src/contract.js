import '@agoric/zoe/exported.js';
import { Far } from '@agoric/marshal';
import { osmosis } from './osmosis.js';

const chains = harden({
  osmosis: {
    keyword: 'Osmo',
    denom: 'uosmo',
    decimalPlaces: 6,
    swap: () => osmosis.swap(),
    addLiquidity: () => osmosis.addLiquidity()
  },
});

/**
 * This is a contract that aggregates swaps and liquidity across
 * the Cosmos ecosystem (starting with Osmosis)
 * utilizing interchain accounts - ics-27
 * @type {ContractStartFn}
 * @param {ContractFacet} zcf
 * @param {Object} chains
 */
const start = async (zcf, chains) => {

  /**
   * Swap exact amount in for the minimum amount specified,
   * at the best price from all liquidity providers
   * @param {ContractFacet} zcf
   * @param {Object} chains
   * @returns {string}
  */
  const agSwap = (zcf, chains) => {
    try {
      const res = chains.osmosis.swap()
    } catch (err) {
      throw err;
    }
  }

  /**
   * Provide liquidity in a pool on the dex provided in the pool specified
   * @param {ContractFacet} zcf
   * @returns {string}
  */
   const provideLiquidity = (zcf) => {
    try {
    } catch (err) {
      throw err;
    }
  }

  const publicFacet = Far('publicFacet', {
    // Public faucet for anyone to call
    swap: (/** @type {Msg} */ msg) => agSwap(msg),
  });
  
  return harden({ publicFacet });
};

harden(start);
export { start };
