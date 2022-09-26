// @ts-nocheck

import { test } from '@agoric/zoe/tools/prepare-test-env-ava.js';
import path from 'path';

import bundleSource from '@endo/bundle-source';

import { E } from '@endo/eventual-send';
import { makeFakeVatAdmin } from '@agoric/zoe/tools/fakeVatAdmin.js';
import { makeZoeKit } from '@agoric/zoe';
import { makeFakeMyAddressNameAdmin } from '../src/utils.js';
import pegasusBundle from '@agoric/pegasus/bundles/bundle-pegasus.js';

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
  var myAddressNameAdmin = makeFakeMyAddressNameAdmin();

  // install the pegasus bundle and start pegasus instance
  const installationP = await E(zoe).install(pegasusBundle);
  await E(myAddressNameAdmin).default("pegasus", installationP)

  // install the interaccounts bundle and start interaccounts instance
  const icaBundle = await bundleSource(`../interaccounts/contract/src/contract.js`);
  const installationIca = await E(zoe).install(icaBundle);
  // set the lookup for ica interaccounts
  await E(myAddressNameAdmin).default("interaccounts", installationIca)

  const { publicFacet } = await E(zoe).startInstance(installation);

  const calypso = await E(publicFacet).initCalypso(zoe, myAddressNameAdmin);

  t.assert(true, "Contract did not run to end...")
});
