import '@agoric/zoe/exported.js';
import { Far } from '@agoric/marshal';
import { agSwap } from './swap';
import { E } from '@endo/eventual-send';

/**
 * Add a new chain connection to a Calypso account.
 * 
 * @param {MsgAddAccount} msg
 * @param {Object} accounts
 * @param {Object} handler
 * @param {Instance} instanceIca
 * @returns {Promise<Object>}
 */
const addProtocol = async (msg, accounts, handler, instanceIca) => {
    // check if this account is the instance account
    if (accounts.address != msg.account) { throw Error(`Unauthorized access`) }
    // Create a connection object for new chain
    accounts[msg.chainName] = await E(instanceIca.publicFacet).createICAAccount(msg.port, handler, msg.chain.agoric, msg.chain.counterparty)
    return accounts
}

/**
 * Initializes Calypso and then returns the Calypso object to interact with Calypso for the account.
 * 
 * @param {MsgOpenAccount} msg
 * @param {ZoeService} zoe
 * @param {NameAdmin} nameAdmin
 * @returns {Promise<CalypsoResponse>}
 */
export const startCalypso = async (msg, zoe, nameAdmin) => {

    const nameHub = E(nameAdmin).readonly()

    // start the ica instance
    const interaccounts = await E(nameHub).lookup("interaccounts");
    const instanceIca = await E(zoe).startInstance(interaccounts);

    // setup the ica connection handler
    /** @type {ConnectionHandler} */
    const connectionHandlerICA = Far('handler', {
        onOpen: async (c) => { 
          //console.log("Connection opened: ", c) 
        },
        onReceive: async (c, p) => {
          console.log('Received packet: ', p);
          const ret = "packets are not handled on this port"
          return ret
        },
        onClose: async (c) => { 
          console.log(`Connection closed: `, c) 
        }
    });

    // Create a connection object for osmosis
    let osmosis = await E(instanceIca.publicFacet).createICAAccount(msg.port, connectionHandlerICA, msg.osmosis.agoric, msg.osmosis.counterparty)
    // Create a connection object for juno
    let juno = await E(instanceIca.publicFacet).createICAAccount(msg.port, connectionHandlerICA, msg.juno.agoric, msg.juno.counterparty)
    // Create a connection object for secret
    let secret = await E(instanceIca.publicFacet).createICAAccount(msg.port, connectionHandlerICA, msg.secret.agoric, msg.secret.counterparty)
    // Create a connection object for cosmos
    let cosmos = await E(instanceIca.publicFacet).createICAAccount(msg.port, connectionHandlerICA, msg.cosmos.agoric, msg.cosmos.counterparty)

    const address = await E(nameAdmin).getMyAddress()

    var accounts = { address: address, "osmosis": harden(osmosis), "juno": harden(juno), "secret": harden(secret), "cosmos": harden(cosmos) }

    return Far('calypso', {
        /**
         * Get the Calypso account and the connection objects for the instance.
         *
         * @returns {Promise<Object>}
         */
         async getCalypsoAccount () {
            return accounts
        },
        /**
         * Add a new connection to the Calypso account for the Agoric account specified.
         *
         * @param {MsgAddAccount} msg
         * @returns {Promise<String>}
         */
         async addConnectionToCalypsoAccount (msg) {
            accounts = await addProtocol(msg, accounts, connectionHandlerICA, instanceIca)
            return accounts
        },
        /**
         * Performs a Swap/trade on the protocol defined within the Msg.
         *
         * @param {MsgSwap} msg
         * @returns {Promise<String>}
         */
        async aggregatedSwap (msg) {
            const ret = await agSwap(accounts, msg)
            return ret
        },
        /**
         * Adds liquidity to an AMM for the protocol defined within the Msg.
         *
         * @param {MsgAddLP} msg
         * @returns {Promise<String>}
         */
         async aggregatedAddLP (msg) {
            const ret = await agAddLP(accounts, msg)
            return ret
        },
        /**
         * Removes liquidity to an AMM for the protocol defined within the Msg.
         *
         * @param {MsgRemoveLP} msg
         * @returns {Promise<String>}
         */
         async aggregatedRemoveLP (msg) {
            const ret = await agRemoveLP(accounts, msg)
            return ret
        },
        /**
         * Stakes assets for the protocol defined within the Msg.
         *
         * @param {MsgStake} msg
         * @returns {Promise<String>}
         */
         async aggregatedStake (msg) {
            const ret = await stake(accounts, msg)
            return ret
        },
        /**
         * Unstakes assets for the protocol defined within the Msg.
         *
         * @param {MsgUnstake} msg
         * @returns {Promise<String>}
         */
         async aggregatedUnstake (msg) {
            const ret = await unstake(accounts, msg)
            return ret
        },
        /**
         * Restakes assets for the protocol defined within the Msg.
         *
         * @param {MsgRestake} msg
         * @returns {Promise<String>}
         */
         async aggregatedRestake (msg) {
            const ret = await restake(accounts, msg)
            return ret
        },
    })
}