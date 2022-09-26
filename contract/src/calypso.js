import '@agoric/zoe/exported.js';
import { Far } from '@agoric/marshal';
import { defineKind } from '@agoric/vat-data';
import { agSwap } from './swap';
import { openAccount, addProtocolAccount } from './account';

/**
 * Creates the Calypso accounts store for the contract.
 * 
 * @param {Instance} instanceIca
 * @param {ConnectionHandler} handler
 * @returns {PromiseKindFacets<{
    open: ({ state }: MsgOpenAccount, msg: MsgOpenAccount) => Promise<string>;
    add: ({ state }: MsgAddAccount, msg: MsgAddAccount) => Promise<string>;
    getAccount: ({ state }: {
        state: any;
    }, agoricAccount: any) => any;
    count: ({ state }: {
        state: any;
    }) => any;
}>}
 */
const createAccountsStore = async (instanceIca, handler) => {

    // Create the store behavior and stores for Calypso accounts
    const initAccounts = () => ({ accounts: {} })
    const accountsBehavior = {
        /**
         * Open a new Calypso account.
         * 
         * @param {MsgOpenAccount} msg
         * @returns {Promise<String>}
         */
        open: async ({state}, msg) => {
            const accountObj = { "osmosis": null, "juno": null, "secret": null, "cosmos": null }
            // Create a connection object for osmosis
            accountObj.osmosis = await E(instanceIca.publicFacet).createICAAccount(msg.port, handler, msg.osmosis.agoric, msg.osmosis.counterparty)
            // Create a connection object for juno
            accountObj.juno = await E(instanceIca.publicFacet).createICAAccount(msg.port, handler, msg.juno.agoric, msg.juno.counterparty)
            // Create a connection object for secret
            accountObj.secret = await E(instanceIca.publicFacet).createICAAccount(msg.port, handler, msg.secret.agoric, msg.secret.counterparty)
            // Create a connection object for cosmos
            accountObj.cosmos = await E(instanceIca.publicFacet).createICAAccount(msg.port, handler, msg.cosmos.agoric, msg.cosmos.counterparty)
            // Set the new Calypso account with the connections
            state.accounts[msg.account] = accountObj
        },
        /**
         * Add a new chain connection to a Calypso account.
         * 
         * @param {MsgAddAccount} msg
         * @returns {Promise<String>}
         */
        add: async ({state}, msg) => {
            const connectionObj = {}
            connectionObj[msg.chainName] = await E(instanceIca.publicFacet).createICAAccount(msg.port, handler, msg.chain.agoric, msg.chain.counterparty)
            state.accounts[msg.account] = {...connectionObj, ...state.accounts[msg.account]}
        },
        // Get the Calypso account by looking up via Agoric address and getting the connections
        // associated with it.
        getAccount: ({state}, agoricAccount) => {
            return state.accounts[agoricAccount]
        },
        // Gets the amount of opened Calypso accounts in the store
        count: ({state}) => {
            return state.accounts.keys().length
        },
    }
    // Create the virtual object store
    const makeAccountsStore = defineKind('accounts', initAccounts, accountsBehavior);

    // Initialize the virtual object store
    const accounts = makeAccountsStore('calypso');

    return Far('accounts', accounts)
}

/**
 * Initializes Calypso and then returns the Calypso object to interact with Calypso for the account.
 * 
 * @param {MsgOpenAccount} msg
 * @returns {Promise<CalypsoResponse>}
 */
export const startCalypso = async (msg) => {

    // start the ica instance
    const interaccounts = await E(nameHub).lookup("interaccounts");
    const instanceIca = await E(zoe).startInstance(interaccounts);

    // setup the ica connection handler
    /** @type {ConnectionHandler} */
    const connectionHandlerICA = Far('handler', {
        onOpen: async (c) => { 
          console.log("Connection opened: ", c) 
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

    const accounts = await createAccountsStore(msg, instanceIca, connectionHandlerICA);

    return Far('calypso', {
        /**
         * Get the number of Calypso accounts.
         *
         * @returns {Promise<Number>}
         */
         async getCalypsoAccountCount () {
            const ret = await accounts.count()
            return ret
        },
        /**
         * Get the Calypso account and the connection objects for the account using Agoric bech32 address.
         *
         * @param {String} agoricAccount
         * @returns {Promise<Object>}
         */
         async getCalypsoAccount (agoricAccount) {
            const ret = await accounts.getAccount(agoricAccount)
            return ret
        },
        /**
         * Open up a Calypso account and create channels/connections for each chain needed for each protocol.
         *
         * @param {MsgOpenAccount} msg
         * @returns {Promise<String>}
         */
         async openCalypsoAccount (msg) {
            const ret = await openAccount(msg, accounts)
            return ret
        },
        /**
         * Add a new connection to the Calypso account for the Agoric account specified.
         *
         * @param {MsgAddAccount} msg
         * @param {ConnectionPair} connections
         * @returns {Promise<String>}
         */
         async addConnectionToCalypsoAccount (msg) {
            const ret = await addProtocolAccount(msg, accounts)
            return ret
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