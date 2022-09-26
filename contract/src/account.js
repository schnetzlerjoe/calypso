/**
 * 
 * @param {MsgOpenAccount} msg
 */
export const openAccount = async (msg) => {
    // open up a new Calypso account in the store using the msg
    accounts.open(msg)
};

/**
 * 
 * @param {MsgAddAccount} msg
 */
export const addProtocolAccount = async (msg) => {
    accounts.add(msg)
};