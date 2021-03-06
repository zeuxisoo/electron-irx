#!/bin/bash

# Remove dist, appicon.iconset directory, built platform apps first
rm -rf dist
rm -rf ./appicon.iconset
rm -rf Irx-*

# Build dist assets
npm run dist-build

# Copy main.js, package.json to dist directory
cp ./main.js ./dist/
cp ./package.json ./dist/

# Copy app/bootstrap/production.html to dist directory
mkdir -p ./dist/app/bootstrap
cp ./app/bootstrap/production.html ./dist/app/bootstrap/production.html

# Copy assets to dist directory
cp -Rf ./assets ./dist/assets

# Convert png to icns
mkdir appicon.iconset

convert -alpha on -resize 32x32 ./artwork/icon.png ./appicon.iconset/icon_16x16.png
convert -alpha on -resize 32x32 ./artwork/icon.png ./appicon.iconset/icon_16x16@2x.png
convert -alpha on -resize 32x32 ./artwork/icon.png ./appicon.iconset/icon_32x32.png
convert -alpha on -resize 64x64 ./artwork/icon.png ./appicon.iconset/icon_32x32@2x.png
convert -alpha on -resize 128x128 ./artwork/icon.png ./appicon.iconset/icon_128x128.png
convert -alpha on -resize 256x256 ./artwork/icon.png ./appicon.iconset/icon_128x128@2x.png
convert -alpha on -resize 256x256 ./artwork/icon.png ./appicon.iconset/icon_256x256.png
convert -alpha on -resize 512x512 ./artwork/icon.png ./appicon.iconset/icon_256x256@2x.png
convert -alpha on -resize 512x512 ./artwork/icon.png ./appicon.iconset/icon_512x512.png
convert -alpha on -resize 1024x1024 ./artwork/icon.png ./appicon.iconset/icon_512x512@2x.png

iconutil -c icns appicon.iconset

mv ./appicon.icns ./dist/icon.icns

rm -rf ./appicon.iconset

# Convert png to ico
convert ./artwork/icon.png  -bordercolor white -border 0 \
          \( -clone 0 -resize 16x16 \) \
          \( -clone 0 -resize 32x32 \) \
          \( -clone 0 -resize 48x48 \) \
          \( -clone 0 -resize 64x64 \) \
          -delete 0 -alpha off -colors 256 ./dist/icon.ico

# Package mac app
./node_modules/.bin/electron-packager ./dist Irx --platform=darwin --arch=x64 --version=1.3.5 --icon=./dist/icon.icns --asar --overwrite

rm -rf ./Irx-darwin-x64/LICENSES.chromium.html
rm -rf ./Irx-darwin-x64/LICENSE
rm -rf ./Irx-darwin-x64/version

# Package win app
./node_modules/.bin/electron-packager ./dist Irx --platform=win32 --arch=x64 --version=1.3.5 --icon=./dist/icon.ico --asar --overwrite

rm -rf ./Irx-win32-x64/LICENSES.chromium.html
rm -rf ./Irx-win32-x64/LICENSE
rm -rf ./Irx-win32-x64/version
rm -rf ./Irx-win32-x64/resources/default_app
