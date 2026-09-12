#!/bin/sh
export NVM_DIR="$HOME/.nvm"
export PATH="$NVM_DIR/versions/node/v24.21.0/bin:$PATH"
exec npm run dev
