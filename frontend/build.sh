echo "--> Remove build"
rm -rf ../backend/build/*
echo "--> Bundling app"
node webpack.config.js --compile