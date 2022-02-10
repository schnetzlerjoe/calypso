// @ts-nocheck
import '@agoric/zoe/exported.js';
import { AmountMath } from '@agoric/ertp';
import { Far } from '@agoric/marshal';
import { cosmos } from './cosmos';
import { osmosis } from './osmosis';

const chains = harden({
  osmosis: {
    keyword: 'Osmo',
    denom: 'uosmo',
    decimalPlaces: 6,
  },
  agoric: {
    channel: 'channel-10',
  },
});

const DEFAULT_AMOUNT_MATH_KIND = 'nat';
const DEFAULT_PROTOCOL = 'ics27-1';

/**
 * Get the denomination combined with the network address.
 *
 * @param {ERef<Endpoint | undefined>} endpointP network connection address
 * @param {Denom} denom denomination
 * @param {TransferProtocol} [protocol=DEFAULT_PROTOCOL] the protocol to use
 * @returns {Promise<string>} denomination URI scoped to endpoint
 */
 async function makeDenomUri(endpointP, denom, protocol = DEFAULT_PROTOCOL) {
  switch (protocol) {
    case 'ics20-1': {
      return E.when(endpointP, endpoint => {
        if (!endpoint) {
          // Unqualified remote denomination.
          return `${protocol}:${denom}`;
        }

        // Deconstruct IBC endpoints to use ICS-20 conventions.
        // IBC endpoint: `/ibc-hop/gaia/ibc-port/transfer/ordered/ics20-1/ibc-channel/chtedite`
        const pairs = parseMultiaddr(endpoint);

        const protoPort = pairs.find(([proto]) => proto === 'ibc-port');
        assert(protoPort, details`Cannot find IBC port in ${endpoint}`);

        const protoChannel = pairs.find(([proto]) => proto === 'ibc-channel');
        assert(protoChannel, details`Cannot find IBC channel in ${endpoint}`);

        const port = protoPort[1];
        const channel = protoChannel[1];
        return `${protocol}:${port}/${channel}/${denom}`;
      });
    }
    case 'ics27-1': {
      return E.when(endpointP, endpoint => {
        if (!endpoint) {
          // Unqualified remote denomination.
          return `${protocol}:${denom}`;
        }

        // Deconstruct IBC endpoints to use ICS-20 conventions.
        // IBC endpoint: `/ibc-hop/gaia/ibc-port/transfer/ordered/ics20-1/ibc-channel/chtedite`
        const pairs = parseMultiaddr(endpoint);

        const protoPort = pairs.find(([proto]) => proto === 'ibc-port');
        assert(protoPort, details`Cannot find IBC port in ${endpoint}`);

        const protoChannel = pairs.find(([proto]) => proto === 'ibc-channel');
        assert(protoChannel, details`Cannot find IBC channel in ${endpoint}`);

        const port = protoPort[1];
        const channel = protoChannel[1];
        return `${protocol}:${port}/${channel}/${denom}`;
      });
    }
    default:
      throw assert.fail(details`Invalid denomination protocol ${protocol}`);
  }
}

/**
 * This is a contract that aggregates swaps and liquidity across
 * the Cosmos ecosystem (starting with Gravity DEX & Osmosis)
 * utilizing interchain accounts - ics-27
 * @type {ContractStartFn}
 */
const start = async (zcf) => {

  /**
   * Get the best price for the token pair from all
   * decentralized exchanges/liquidity providers
   * @param {ContractFacet} zcf
   * @returns {map}
  */
   export const getAggregatePrice =(zcf) => {
    try {
    } catch (err) {
      throw err;
    }
  }

  /**
   * Swap exact amount in for the minimum amount specified,
   * at the best price from all liquidity providers
   * @param {ContractFacet} zcf
   * @returns {string}
  */
  export const aggregateSwap =(zcf) => {
    try {
    } catch (err) {
      throw err;
    }
  }
  
  return harden({ publicFacet });
};

harden(start);
export { start };
