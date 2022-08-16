import * as gamm from 'osmojs/main/proto/osmosis/gamm/v1beta1/tx.registry';
import { coin } from '@cosmjs/amino';
const { swapExactAmountIn } = gamm.MessageComposer.withTypeUrl;

/**
 * Using the ICA Agoric contract to perform a swap on Osmosis
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const osmoSwap = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

    const msg = swapExactAmountIn({
      sender,
      routes,
      tokenIn: coin(amount, denom),
      tokenOutMinAmount
    });

    return connection;
};

/**
 * Using the ICA Agoric contract to add liquidty into an Osmosis pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const lpLiquidity = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

  const msg = swapExactAmountIn({
    sender,
    routes,
    tokenIn: coin(amount, denom),
    tokenOutMinAmount
  });

  return connection;
};

/** @type {ICAProtocol} */
export const osmosis = Far('Calypso Protocol', {
    swap: osmoSwap,
    addLiquidity: lpLiquidity,
});
