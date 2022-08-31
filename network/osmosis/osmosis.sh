#!/bin/bash

cd $HOME
yes | rm -r osmosis
git clone https://github.com/osmosis-labs/osmosis
cd osmosis
make install
sudo cp $GOPATH/bin/osmosisd /usr/local/bin