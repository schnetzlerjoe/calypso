import { makeNameHubKit } from '@agoric/vats/src/nameHub.js';
import { Far } from '@endo/marshal';
import { E } from '@endo/eventual-send';

/**
 * Parses an IBC ICA connection version and responds with the ica controller
 * account address (in Bech32) on the host chain
 *
 * @param {Connection} connection
 * @returns {String}
 */
 export const parseICAAddress = async (connection) => {
    const remote = await E(connection).getRemoteAddress()
    const version = remote.split("/")[6]
    const versionJSON = await JSON.parse(version)
    return versionJSON.address
}

/**
 * 
 * @param {String} i
 */
export const makeFakeMyAddressNameAdmin = async (i) => {
    const { nameHub, nameAdmin: rawMyAddressNameAdmin } = makeNameHubKit();
    return Far('fakeMyAddressNameAdmin', {
      ...nameHub,
      ...rawMyAddressNameAdmin,
      getMyAddress() {
        return 'agoric1test' + i;
      },
    });
  }