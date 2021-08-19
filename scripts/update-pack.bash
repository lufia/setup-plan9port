#!/bin/bash

set -eu

curl -LO https://github.com/9fans/plan9port/archive/refs/heads/master.zip
#unzip -f master.zip 
cd plan9port-master/
./INSTALL -b
tar c plan9port-master | gzip -9 >plan9port-master.tgz
