import { MsgDelegate, MsgUndelegate, MsgBeginRedelegate } from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { MsgWithdrawDelegatorReward } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'

/**
 * Using the ICA Agoric contract, stake assets. This is a generic Cosmos message usable
 * across all Cosmos chains that implement it.
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
export const cosmosStake = async (connection, value) => {

    const message = MsgDelegate.fromPartial({
    })

    const msg = await E(ica.publicFacet).makeMsg({type: "/cosmos.staking.v1beta1.MsgDelegate", value: MsgDelegate.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([msg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};

/**
 * Using the ICA Agoric contract, unstake assets. This is a generic Cosmos message usable
 * across all Cosmos chains that implement it.
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
 export const cosmosUnstake = async (connection, value) => {

    const message = MsgUndelegate.fromPartial({
    })

    const msg = await E(ica.publicFacet).makeMsg({type: "/cosmos.staking.v1beta1.MsgUndelegate", value: MsgUndelegate.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([msg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};

/**
 * Using the ICA Agoric contract, redelegate staked assets. This is a generic Cosmos message usable
 * across all Cosmos chains that implement it.
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
 export const cosmosRedelegate = async (connection, value) => {

    const message = MsgBeginRedelegate.fromPartial({
    })

    const msg = await E(ica.publicFacet).makeMsg({type: "/cosmos.staking.v1beta1.MsgBeginRedelegate", value: MsgBeginRedelegate.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([msg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};

/**
 * Using the ICA Agoric contract, claim your staking reward. This is a generic Cosmos message usable
 * across all Cosmos chains that implement it.
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
 export const cosmosClaimReward = async (connection, value) => {

    const message = MsgWithdrawDelegatorReward.fromPartial({
    })

    const msg = await E(ica.publicFacet).makeMsg({type: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", value: MsgWithdrawDelegatorReward.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([msg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};