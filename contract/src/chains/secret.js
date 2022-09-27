import  { MsgExecuteContract } from 'secretjs';

/**
 * Using the ICA Agoric contract, perform a swap on Secretswap
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
 export const secretSwap = async (connection, value) => {

  const swapMessage = {
      swap: {
          offer_asset: {
            info: {
                native_token: {
                    denom: ""
                }
            },
            amount: 9
        },
        belief_price: decimal,
        max_spread: decimal2,
        to: address,
      },
  }

  const message = MsgExecuteContract.fromPartial({
      sender: senderAddress,
      contract: contractAddress,
      msg: toUtf8(JSON.stringify(swapMessage)),
  })

  const msg = await E(ica.publicFacet).makeMsg({type: "/cosmwasm.wasm.v1.MsgExecuteContract", value: MsgExecuteContract.encode(message).finish()})

  const packet = await E(instance.publicFacet).makeICAPacket([msg]);

  const ret = await connection.send(JSON.stringify(packet));

  return ret;
};

/**
 * Using the ICA Agoric contract, add liquidity into a Secretswap pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const secretJoinLp = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

  const addLiquidityMessage = {
      provide_liquidity: {
        assets: `${tokenAAmount}`,
        slippage_tolerance: `${maxTokenBAmount}`,
      },
  }

  const message = MsgExecuteContract.fromPartial({
      sender: senderAddress,
      contract: contractAddress,
      msg: toUtf8(JSON.stringify(addLiquidityMessage)),
  })

  const msg = await E(ica.publicFacet).makeMsg({type: "/cosmwasm.wasm.v1.MsgExecuteContract", value: MsgExecuteContract.encode(message).finish()})

  const packet = await E(instance.publicFacet).makeICAPacket([msg]);

  const ret = await connection.send(JSON.stringify(packet));

  return ret;
};

/**
 * Using the ICA Agoric contract, remove liquidity from a Secretswap pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const secretRemoveLp = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

  const removeLiquidityMessage = {
      receive: {
        from: `${tokenAmount}`,
        msg: `${0}`,
        amount: `${0}`,
      },
  }

  const message = MsgExecuteContract.fromPartial({
      sender: senderAddress,
      contract: contractAddress,
      msg: toUtf8(JSON.stringify(removeLiquidityMessage)),
  })

  const msg = await E(ica.publicFacet).makeMsg({type: "/cosmwasm.wasm.v1.MsgExecuteContract", value: MsgExecuteContract.encode(message).finish()})

  const packet = await E(instance.publicFacet).makeICAPacket([msg]);

  const ret = await connection.send(JSON.stringify(packet));

  return ret;
};