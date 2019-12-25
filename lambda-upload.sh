npm run build
rm -rf compressed.zip
zip -r compressed.zip * -x \*aws-sdk\*

echo "Upload not implemented. Use the AWS Lambda UI to upload compressed.zip."
# echo "Uploading..."
# aws lambda update-function-code --function-name CalPal --zip-file fileb://compressed.zip
