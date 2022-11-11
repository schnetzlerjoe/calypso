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

  const ret = await E(ica.publicFacet).sendICATxPacket(
    [
      {
        typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn", 
        data: MsgSwapExactAmountIn.encode(message).finish()
      }
    ],
    connection
  )

  return ret;
};

/**
 * Using the ICA Agoric contract, add liquidity into an Osmosis pool
 *
 * @param {Connection} connection
 * @param {MsgOsmosisAddLP} msg
 * @returns {Promise<String>}
 */
 export const osmoJoinLp = async (connection, msg) => {

  const message = MsgJoinPool.fromPartial({
    sender: msg.sender,
    poolId: msg.poolId,
    shareOutAmount: msg.shareOutAmount,
    tokenInMaxs: msg.tokenInMaxs
  })

  const ret = await E(ica.publicFacet).sendICATxPacket(
    [
      {
        typeUrl: "/osmosis.gamm.v1beta1.MsgJoinPool", 
        data: MsgJoinPool.encode(message).finish()
      }
    ],
    connection
  )

  return ret;
};

/**
 * Using the ICA Agoric contract, remove liquidity from an Osmosis pool
 *
 * @param {Connection} connection
 * @param {MsgOsmosisExitLP} msg
 * @returns {Promise<String>}
 */
 export const osmoRemoveLp = async (connection, msg) => {

  const message = MsgExitPool.fromPartial({
    sender: msg.sender,
    poolId: msg.poolId,
    shareInAmount: msg.shareInAmount,
    tokenOutMins: msg.tokenOutMins
  })

  const ret = await E(ica.publicFacet).sendICATxPacket(
    [
      {
        typeUrl: "/osmosis.gamm.v1beta1.MsgExitPool", 
        data: MsgExitPool.encode(message).finish()
      }
    ],
    connection
  )

  return ret;
};
