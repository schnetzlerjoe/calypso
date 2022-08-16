// @ts-check

/**
 * @typedef {object} osmosis
 * @property {Type} type The int32 type of the transaction (ICA only supports Type 1)
 * @property {Data} data The byte encoding of a list of messages in {Type: xxx, Value: {}} format
 * @property {Memo} memo Optional memo for the tx. Defaults to blank ""
 */

/**
 * @typedef {Object} calypso
 * @property {Object} swap The int32 type of the transaction (ICA only supports Type 1)
 * @property {Object} liquidityProvide The byte encoding of a list of messages in {Type: xxx, Value: {}} format
 */
