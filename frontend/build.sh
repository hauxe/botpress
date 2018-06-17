echo "--> Remove build"
rm -rf ./build/*
echo "--> Bundling app"
node webpack.config.js --compile