/**
 * Using the ICA Agoric contract, stake assets
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
export const cosmosStake = async (connection, value) => {

    const message = MsgSwapExactAmountIn.fromPartial({
        sender,
        routes,
        tokenIn,
        tokenOutMinAmount
    })

    const msg = await E(ica.publicFacet).makeMsg({type: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn", value: MsgSwapExactAmountIn.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([msg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};

/**
 * Using the ICA Agoric contract, unstake assets
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
 export const cosmosUnstake = async (connection, value) => {

    const message = MsgSwapExactAmountIn.fromPartial({
        sender,
        routes,
        tokenIn,
        tokenOutMinAmount
    })

    const msg = await E(ica.publicFacet).makeMsg({type: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn", value: MsgSwapExactAmountIn.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([msg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};

/**
 * Using the ICA Agoric contract, redelegate staked assets
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
 export const cosmosRedelegate = async (connection, value) => {

    const message = MsgSwapExactAmountIn.fromPartial({
        sender,
        routes,
        tokenIn,
        tokenOutMinAmount
    })

    const msg = await E(ica.publicFacet).makeMsg({type: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn", value: MsgSwapExactAmountIn.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([msg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};

/**
 * Using the ICA Agoric contract, claim your staking reward
 *
 * @param {Connection} connection
 * @param {MsgSwapExactAmountIn} value
 * @returns {Promise<String>}
 */
 export const cosmosClaimReward = async (connection, value) => {

    const message = MsgSwapExactAmountIn.fromPartial({
        sender,
        routes,
        tokenIn,
        tokenOutMinAmount
    })

    const msg = await E(ica.publicFacet).makeMsg({type: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn", value: MsgSwapExactAmountIn.encode(message).finish()})

    const packet = await E(instance.publicFacet).makeICAPacket([msg]);

    const ret = await connection.send(JSON.stringify(packet));

    return ret;
};