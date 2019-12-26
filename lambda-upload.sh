echo "Pruning devDependencies..."
npm prune --production
rm -rf compressed.zip
zip -r compressed.zip dist/ node_modules/
echo "Re-installing devDependencies..."
npm install

# S3 upload instead of directly upload to lambda - it's more reliable on poor connections.
aws s3 cp compressed.zip s3://alexa-ear-trainer
aws lambda update-function-code \
  --function-name AlexaEarTrainer \
  --s3-bucket alexa-ear-trainer \
  --s3-key compressed.zip
