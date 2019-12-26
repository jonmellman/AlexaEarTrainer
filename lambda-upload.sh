rm -rf compressed.zip

# Get list of production node_modules. Relative paths are needed to preserve the zipped archive's paths.
pwd_regex='\/Users\/home\/code\/AlexaEarTrainer\/'  # TODO: We can escape $(pwd) dynamically: https://stackoverflow.com/a/27787551/1937643
prod_dependencies=$(npm ls --production --parseable=true | grep node_modules | sed -e "s/${pwd_regex}//g")

# Compress prod node_modules as well as compiled source code
echo "$prod_dependencies\ndist" | zip -r -@ compressed.zip

echo "Uploading artifact to S3..."
# S3 upload instead of directly upload to lambda - it's more reliable on poor connections.
aws s3 cp compressed.zip s3://alexa-ear-trainer

echo "Deploying lambda using S3 artifact..."
aws lambda update-function-code \
  --function-name AlexaEarTrainer \
  --s3-bucket alexa-ear-trainer \
  --s3-key compressed.zip
