rm -rf compressed.zip
zip -r compressed.zip * -x \*aws-sdk\*

echo "Uploading..."
aws lambda update-function-code --function-name AlexaEarTrainer --zip-file fileb://compressed.zip
