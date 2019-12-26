#!/bin/bash

# Bounce MP3 tracks to ./media/tmp, then convert them to Alexa format with this script.

for absolute_filename in ./media/tmp/*; do
	filename=$(basename "$absolute_filename")
	ffmpeg -i $absolute_filename -ac 2 -codec:a libmp3lame -b:a 48k -ar 24000 -write_xing 0 ./media/$filename
done

rm -rf ./media/tmp
