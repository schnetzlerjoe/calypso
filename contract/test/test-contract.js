// @ts-nocheck

import { test } from './prepare-test-env-ava.js';
import path from 'path';

import bundleSource from '@endo/bundle-source';

import { E } from '@endo/eventual-send';
import { Far } from '@endo/marshal';
import { makeFakeVatAdmin } from '@agoric/zoe/tools/fakeVatAdmin.js';
import { makeZoeKit } from '@agoric/zoe';
import { makeFakeMyAddressNameAdmin } from '../src/utils.js';
import pegasusBundle from '@agoric/pegasus/bundles/bundle-pegasus.js';
import {
  makeNetworkProtocol,
  makeLoopbackProtocolHandler,
} from '@agoric/swingset-vat/src/vats/network/index.js';
import { makePromiseKit } from '@endo/promise-kit';
import { homedir } from 'os';

const filename = new URL(import.meta.url).pathname;
const dirname = path.dirname(filename);

const contractPath = `${dirname}/../src/contract.js`;

test('Calypso Tests', async (t) => {
  const { zoeService } = makeZoeKit(makeFakeVatAdmin().admin);
  const feePurse = E(zoeService).makeFeePurse();
  const zoe = E(zoeService).bindDefaultFeePurse(feePurse);

  // pack the contract
  const bundle = await bundleSource(contractPath);

  // install the contract
  const installation = E(zoe).install(bundle);

  // create fake address admin
  var myAddressNameAdmin = makeFakeMyAddressNameAdmin("1");
  const address = await E(myAddressNameAdmin).getMyAddress()

  // create fake address admin 2
  var myAddressNameAdmin2 = makeFakeMyAddressNameAdmin("2");
  const address2 = await E(myAddressNameAdmin2).getMyAddress()

  // install the pegasus bundle and start pegasus instance
  const installationP = await E(zoe).install(pegasusBundle);
  await E(myAddressNameAdmin).default("pegasus", installationP)

  // install the interaccounts bundle and start interaccounts instance
  const icaBundle = await bundleSource(homedir() + `/interaccounts/contract/src/contract.js`);
  const installationIca = await E(zoe).install(icaBundle);
  // set the lookup for ica interaccounts
  await E(myAddressNameAdmin).default("interaccounts", installationIca)

  // make the network api and all the ports/connections we need
  // Create a network protocol to be used for testing
  const protocol = makeNetworkProtocol(makeLoopbackProtocolHandler());

  const closed = makePromiseKit();

  // Create agoric port with connection-0
  const port = await protocol.bind('/ibc-hop/connection-0/ibc-port/icahost/ordered');
  // Create osmosis port with connection-1
  const osmosis = await protocol.bind('/ibc-hop/connection-1/ibc-port/icahost/ordered');
  // Create cosmos port with connection-2
  const cosmos = await protocol.bind('/ibc-hop/connection-2/ibc-port/icahost/ordered');
  // Create juno port with connection-3
  const juno = await protocol.bind('/ibc-hop/connection-3/ibc-port/icahost/ordered');
  // Create secret port with connection-4
  const secret = await protocol.bind('/ibc-hop/connection-4/ibc-port/icahost/ordered');
  // Create terra port with connection-5
  const terra = await protocol.bind('/ibc-hop/connection-5/ibc-port/icahost/ordered');

  /**
   * Create the listener for the test port
   *
   * @type {import('../src/vats/network').ListenHandler}
   */
   const listener = Far('listener', {
    async onAccept(_p, _localAddr, _remoteAddr, _listenHandler) {
      return harden({
        async onReceive(c, packet, _connectionHandler) {
          // Check that recieved packet is the packet we created above
          const json = await JSON.parse(packet);
          console.log("Received Packet on Port 1:", json);
          return 'AQ==';
        },
      });
    },
  });

  await port.addListener(listener);
  await osmosis.addListener(listener);
  await cosmos.addListener(listener);
  await juno.addListener(listener);
  await secret.addListener(listener);
  await terra.addListener(listener);

  // Start the instance and grab the public facet
  const { publicFacet } = await E(zoe).startInstance(installation);

  // init Calypso
  const calypso = await E(publicFacet).initCalypso(zoe, myAddressNameAdmin);

  const openMsg = {
    account: address,
    port: port,
    osmosis: {agoric: "connection-1", counterparty: "connection-1"},
    cosmos: {agoric: "connection-2", counterparty: "connection-2"},
    juno: {agoric: "connection-3", counterparty: "connection-3"},
    secret: {agoric: "connection-4", counterparty: "connection-4"},
  }

  const openMsg2 = {
    account: address2,
    port: port,
    osmosis: {agoric: "connection-1", counterparty: "connection-1"},
    cosmos: {agoric: "connection-2", counterparty: "connection-2"},
    juno: {agoric: "connection-3", counterparty: "connection-3"},
    secret: {agoric: "connection-4", counterparty: "connection-4"},
  }

  const msgAdd = {
    account: address,
    port: port,
    chainName: "terra",
    chain: {agoric: "connection-1", counterparty: "connection-5"},
  }

  // Run first test to check that we can open Calypso account
  const account = await E(calypso).openCalypsoAccount(openMsg);
  t.assert(typeof(account) === "object", 'openCalypsoAccount failed: did not return an account object');

  // Open up another account
  const account2 = await E(calypso).openCalypsoAccount(openMsg2);
  t.assert(typeof(account2) === "object", 'openCalypsoAccount failed: did not return an account object');

  // Run third test to check that we can get our account
  const calypsoAccount = await E(calypso).getCalypsoAccount(address);
  t.assert(calypsoAccount.address === account.address, 'getCalypsoAccount failed: does not equal expected');

  // Run test to add a new chain connection to an account
  const calypsoAccount2 = await E(calypso).addConnectionToCalypsoAccount(msgAdd);
  console.log(calypsoAccount2)
  t.assert(calypsoAccount2.address === account.address, 'getCalypsoAccount failed: does not equal expected');

  closed.promise

  return

});
