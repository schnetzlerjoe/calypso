import { toUtf8 } from '@cosmjs/encoding'
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx'

/**
 * Using the ICA Agoric contract, perform a basic swap on Junoswap
 *
 * @param {Connection} connection
 * @param {MsgJunoswapSwap} msg
 * @returns {Promise<String>}
 */
 export const junoSwap = async (connection, msg) => {

    const swap = {
        swap: {
            // either Token1 or Token2
            input_token: msg.swapDirection,
            input_amount: msg.tokenAmount,
            min_output: msg.minTokenOut,
        },
    }

    const message = MsgExecuteContract.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        msg: toUtf8(JSON.stringify(swap)),
    })

    const icaMsg = await E(ica.publicFacet).makeMsg({type: "/cosmwasm.wasm.v1.MsgExecuteContract", value: MsgExecuteContract.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([icaMsg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};

/**
 * Using the ICA Agoric contract, perform a multi-pool swap on Junoswap
 *
 * @param {Connection} connection
 * @param {MsgJunoswapSwapMulti} msg
 * @returns {Promise<String>}
 */
 export const junoSwapMulti = async (connection, msg) => {

    const swapMessagePass = {
        pass_through_swap: {
            // either Token1 or Token2
            input_token: msg.swapDirection,
            input_token_amount: msg.tokenAmount,
            output_min_token: msg.minTokenOut,
            output_amm_address: msg.outputAmmAddress,
        },
    }

    const message = MsgExecuteContract.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        msg: toUtf8(JSON.stringify(swapMessagePass)),
    })

    const icaMsg = await E(ica.publicFacet).makeMsg({type: "/cosmwasm.wasm.v1.MsgExecuteContract", value: MsgExecuteContract.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([icaMsg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};

/**
 * Using the ICA Agoric contract, add liquidity into a Junoswap pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const junoJoinLp = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

    const addLiquidityMessage = {
        add_liquidity: {
            token1_amount: `${tokenAAmount}`,
            max_token2: `${maxTokenBAmount}`,
            min_liquidity: `${0}`,
        },
    }

    const message = MsgExecuteContract.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        msg: toUtf8(JSON.stringify(addLiquidityMessage)),
    })

    const icaMsg = await E(ica.publicFacet).makeMsg({type: "/cosmwasm.wasm.v1.MsgExecuteContract", value: MsgExecuteContract.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([icaMsg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};

/**
 * Using the ICA Agoric contract, remove liquidity from a Junoswap pool
 *
 * @param {string} hostConnectionId
 * @returns {Promise<String>}
 */
 export const junoRemoveLp = async (sender, routes, tokenInAmount, tokeninDenom, slippage) => {

    const removeLiquidityMessage = {
        remove_liquidity: {
            amount: `${tokenAmount}`,
            min_token1: `${0}`,
            min_token2: `${0}`,
        },
    }

    const message = MsgExecuteContract.fromPartial({
        sender: senderAddress,
        contract: contractAddress,
        msg: toUtf8(JSON.stringify(removeLiquidityMessage)),
    })

    const icaMsg = await E(ica.publicFacet).makeMsg({type: "/cosmwasm.wasm.v1.MsgExecuteContract", value: MsgExecuteContract.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([icaMsg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};