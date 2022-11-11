// @ts-check

/**
 * @typedef {object} CalypsoResponse
 * @property {() => Promise<Number>} getCalypsoAccountCount
 * @property {(agoricAccount: String) => Promise<Object>} getCalypsoAccount
 * @property {(msg: MsgOpenAccount) => Promise<String>} openCalypsoAccount
 * @property {(msg: MsgAddAccount) => Promise<String>} addConnectionToCalypsoAccount
 * @property {(msg: MsgSwap) => Promise<String>} aggregatedSwap
 * @property {(msg: MsgAddLP) => Promise<String>} aggregatedAddLP
 * @property {(msg: MsgRemoveLP) => Promise<String>} aggregatedRemoveLP
 * @property {(msg: MsgStake) => Promise<String>} aggregatedStake
 * @property {(msg: MsgUnstake) => Promise<String>} aggregatedUnstake
 * @property {(msg: MsgRestake) => Promise<String>} aggregatedRestake
 */

/**
 * @typedef {object} ConnectionPair
 * @property {String} agoric The connection ID for Agoric.
 * @property {String} counterparty The connection ID for the counterparty.
 */

/**
 * @typedef {object} CalypsoProtocol
 * @property {String} protocol The protocol ID.
 * @property {ConnectionPair} pair The connection IDs for the protocol.
 * @property {Connection} connection The connection object for the protocol.
 */

/**
 * @typedef {object} MsgOpenAccount
 * @property {String} account The agoric account in bech32 format.
 * @property {Port} port The port to create the ICA channels on.
 * @property {ConnectionPair} osmosis The Osmosis protocol connection ID.
 * @property {ConnectionPair} cosmos The Cosmos protocol connection ID.
 * @property {ConnectionPair} juno The Juno protocol connection ID.
 * @property {ConnectionPair} secret The Secret protocol connection ID.
 */

/**
 * @typedef {object} MsgAddAccount
 * @property {String} account The agoric account in bech32 format.
 * @property {String} chainName The name of the chain ICA account is opening for.
 * @property {Port} port The port to create the ICA channels on.
 * @property {ConnectionPair} chain The chain connection pair to create connection for.
 */

/**
 * @typedef {object} MsgSwap
 * @property {string} chain The protocol ID to run the swap on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {object} msg The protocol msg to run.
 */

/**
 * @typedef {object} MsgAddLP
 * @property {string} chain The protocol ID to run the swap on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {object} msg The protocol msg to run.
 */

/**
 * @typedef {object} MsgRemoveLP
 * @property {string} chain The protocol ID to run the swap on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {object} msg The protocol msg to run.
 */

/**
 * @typedef {object} MsgStake
 * @property {string} chain The protocol ID to run the swap on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {object} msg The protocol msg to run.
 */

/**
 * @typedef {object} MsgUnstake
 * @property {string} chain The protocol ID to run the swap on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {object} msg The protocol msg to run.
 */

/**
 * @typedef {object} MsgRestake
 * @property {string} chain The protocol ID to run the swap on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {object} msg The protocol msg to run.
 */

/**
 * @typedef {object} MsgOsmosisSwap
 * @property {[Routes]} routes The pool routes to execute the swap under.
 * @property {Coin} tokenIn The token/coin being swapped in.
 * @property {string} tokenMinOut The minimum amount out of the token being swapped into.
 */

/**
 * @typedef {object} MsgOsmosisAddLP
 * @property {string} sender The sender of the message. The ICA account.
 * @property {Number} poolId The pool to liquidity provide into.
 * @property {string} shareOutAmount The minimum amount out of the LP token to receive.
 * @property {Coin} tokenInMaxs The tokens in to turn into LP shares.
 */

/**
 * @typedef {object} MsgOsmosisExitLP
 * @property {string} sender The sender of the message. The ICA account.
 * @property {Number} poolId The pool to liquidity provide into.
 * @property {string} shareInAmount The LP shares in to exit from.
 * @property {Coin} tokenOutMins The max tokens out from the LP shares.
 */

/**
 * @typedef {object} Routes
 * @property {Long} poolId The pool id.
 * @property {string} tokenOutDenom The token denom to trade out into.
 */

/**
 * @typedef {object} Coin
 * @property {string} denom The coin denom.
 * @property {string} amount The amount of the denom.
 */

/**
 * @typedef {object} MsgJunoswapSwap
 * @property {string} swapDirection The swap direction of the swap (either Token1 or Token2).
 * @property {number} tokenAmount The amount of the token in.
 * @property {number} minTokenOut The minimum amount of the token out.
 */

/**
 * @typedef {object} MsgJunoswapSwapMulti
 * @property {string} swapDirection The swap direction of the swap (either Token1 or Token2).
 * @property {number} tokenAmount The amount of the token in.
 * @property {number} minTokenOut The minimum amount of the token out.
 * @property {string} outputAmmAddress The address of the output AMM to use
 */

/**
 * @typedef {object} MsgSecretswapSwap
 * @property {string} chain The protocol ID to run the swap on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {object} msg The protocol msg to run.
 */