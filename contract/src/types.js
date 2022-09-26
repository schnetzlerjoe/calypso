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
 * @property {string} tokenInDenom The token denom of the token being swapped.
 * @property {Number} tokenInAmount The token amount of the token being swapped.
 * @property {Number} minAmountOut The minimum amount of the token being swapped out.
 */

/**
 * @typedef {object} MsgAddLP
 * @property {string} protocol The protocol ID to run the add liquidity msg on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {string} tokenInDenom The token denom of the token being swapped.
 * @property {Number} tokenInAmount The token amount of the token being swapped.
 * @property {string} poolId The pool id of the pool to add liquidity to.
 */

/**
 * @typedef {object} MsgRemoveLP
 * @property {string} protocol The protocol ID to run the add liquidity msg on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {string} tokenInDenom The token denom of the token being swapped.
 * @property {Number} tokenInAmount The token amount of the token being swapped.
 * @property {string} poolId The pool id of the pool to remove liquidity from.
 */

/**
 * @typedef {object} MsgStake
 * @property {string} protocol The protocol ID to run the add liquidity msg on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {string} tokenInDenom The token denom of the token being swapped.
 * @property {Number} tokenInAmount The token amount of the token being swapped.
 * @property {string} poolId The pool id of the pool to remove liquidity from.
 */

/**
 * @typedef {object} MsgUnstake
 * @property {string} protocol The protocol ID to run the add liquidity msg on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {string} tokenInDenom The token denom of the token being swapped.
 * @property {Number} tokenInAmount The token amount of the token being swapped.
 * @property {string} poolId The pool id of the pool to remove liquidity from.
 */

/**
 * @typedef {object} MsgRestake
 * @property {string} protocol The protocol ID to run the add liquidity msg on.
 * @property {object} account The accounts store object for the Calypso account to perform swap for.
 * @property {string} tokenInDenom The token denom of the token being swapped.
 * @property {Number} tokenInAmount The token amount of the token being swapped.
 * @property {string} poolId The pool id of the pool to remove liquidity from.
 */
