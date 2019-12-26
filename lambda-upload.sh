npm prune --production # Strip devDependencies since they add >9MB
rm -rf compressed.zip
zip -r compressed.zip *
npm install # Re-install devDependencies. Should use local cache and be quick

# aws lambda update-function-code --function-name AlexaEarTrainer --zip-file fileb://compressed.zip

# s3 uploading is more reliable on poor connections than uploading directly to lambda.
aws s3 cp compressed.zip s3://alexa-ear-trainer
aws lambda update-function-code \
  --function-name AlexaEarTrainer \
  --s3-bucket alexa-ear-trainer \
  --s3-key compressed.zip
