import  { MsgExecuteContract } from 'secretjs';

/**
 * Using the ICA Agoric contract, perform a swap on Secretswap
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
 export const secretSwap = async (connection, value) => {

    const msg = swapExactAmountIn(value);

    const ret = await connection.send(JSON.stringify(value));

    return ret;
};

/**
 * Using the ICA Agoric contract, add liquidity into a Secretswap pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const secretJoinLp = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

  const msg = joinPool({
    sender,
    routes,
    tokenIn: coin(amount, denom),
    tokenOutMinAmount
  });

  return connection;
};

/**
 * Using the ICA Agoric contract, remove liquidity from a Secretswap pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const secretRemoveLp = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

  const msg = removePool({
    sender,
    routes,
    tokenIn: coin(amount, denom),
    tokenOutMinAmount
  });

  return connection;
};