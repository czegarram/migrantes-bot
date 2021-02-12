#! /bin/bash
NODE_VERSION=v14.15.4
BASE_BIN_FOLDER=/home/ubuntu/.nvm/versions/node/$NODE_VERSION/bin/

echo "Update app from Git"
git pull

echo "install packages"
"$BASE_BIN_FOLDER"node "$BASE_BIN_FOLDER"yarn install

echo "restart pm2"
"$BASE_BIN_FOLDER"node "$BASE_BIN_FOLDER"pm2 restart migrantes-bot

