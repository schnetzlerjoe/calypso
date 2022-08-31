import { osmosis } from 'osmojs';
import { MsgSwapExactAmountIn } from 'osmojs/types/proto/osmosis/gamm/v1beta1/tx';
const { swapExactAmountIn, joinPool, exitPool } = osmosis.gamm.v1beta1.MessageComposer.withTypeUrl;

/**
 * Using the ICA Agoric contract, perform a swap on Osmosis
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
 export const osmoSwap = async (connection, value) => {

    const msg = swapExactAmountIn(value);

    const ret = await connection.send(JSON.stringify(value));

    return ret;
};

/**
 * Using the ICA Agoric contract, add liquidity into an Osmosis pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const joinLP = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

  const msg = joinPool({
    sender,
    routes,
    tokenIn: coin(amount, denom),
    tokenOutMinAmount
  });

  return connection;
};
