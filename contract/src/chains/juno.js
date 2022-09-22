import { makeExecuteMessage } from '../../util/wasm';

/**
 * Using the ICA Agoric contract, perform a swap on Junoswap
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
 export const junoSwap = async (connection, value) => {

    const msg = swapExactAmountIn(value);

    const ret = await connection.send(JSON.stringify(value));

    return ret;
};

/**
 * Using the ICA Agoric contract, add liquidity into a Junoswap pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const junoJoinLp = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

  const msg = joinPool({
    sender,
    routes,
    tokenIn: coin(amount, denom),
    tokenOutMinAmount
  });

  return connection;
};

/**
 * Using the ICA Agoric contract, remove liquidity from a Junoswap pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const junoRemoveLp = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

  const msg = removePool({
    sender,
    routes,
    tokenIn: coin(amount, denom),
    tokenOutMinAmount
  });

  return connection;
};