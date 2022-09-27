import { MsgSwapExactAmountIn, MsgExitPool, MsgJoinPool } from 'osmojs/types/proto/osmosis/gamm/v1beta1/tx';
import { parseICAAddress } from '../utils';

/**
 * Using the ICA Agoric contract, perform a swap on Osmosis
 *
 * @param {Connection} connection
 * @param {MsgOsmosisSwap} msg
 * @returns {Promise<String>}
 */
 export const osmoSwap = async (connection, msg) => {

  const sender = parseICAAddress(connection)

  const message = MsgSwapExactAmountIn.fromPartial({
    sender,
    routes: msg.routes,
    tokenIn: msg.tokenIn,
    tokenOutMinAmount: msg.tokenMinOut
  })

  const icaMsg = await E(ica.publicFacet).makeMsg({type: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn", value: MsgSwapExactAmountIn.encode(message).finish()})

  const packet = await E(instance.publicFacet).makeICAPacket([icaMsg]);

  const ret = await connection.send(JSON.stringify(packet));

  return ret;
};

/**
 * Using the ICA Agoric contract, add liquidity into an Osmosis pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const osmoJoinLp = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

  const message = MsgJoinPool.fromPartial({
    sender,
    poolId,
    shareOutAmount,
    tokenInMaxs
  })

  const icaMsg = await E(ica.publicFacet).makeMsg({type: "/osmosis.gamm.v1beta1.MsgJoinPool", value: MsgJoinPool.encode(message).finish()})

  const packet = await E(instance.publicFacet).makeICAPacket([icaMsg]);

  const ret = await connection.send(JSON.stringify(packet));

  return ret;
};

/**
 * Using the ICA Agoric contract, remove liquidity from an Osmosis pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const osmoRemoveLp = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

  const message = MsgExitPool.fromPartial({
    sender,
    poolId,
    shareInAmount,
    tokenOutMins
  })

  const icaMsg = await E(ica.publicFacet).makeMsg({type: "/osmosis.gamm.v1beta1.MsgExitPool", value: MsgExitPool.encode(message).finish()})

  const packet = await E(instance.publicFacet).makeICAPacket([icaMsg]);

  const ret = await connection.send(JSON.stringify(packet));

  return ret;
};
