# AlexaEarTrainer

AlexaEarTrainer is the source code for the [Interval Practice Alexa skill](https://www.amazon.com/Jonathan-Mellman-Interval-Practice/dp/B0849LJK1D/ref=sr_1_1?keywords=interval+practice&qid=1582005160&s=digital-skills&sr=1-1).


## Creating media

1. Logic software instrument. Tempo 120 BPM. 2 measures. Velocity 98.
1. CMD+B to "bounce project or section" as MP3. Start 1111, End 1131. Bit rate mono/stero both 48 kbps
1. Convert to Alexa-compatible MP3 format:
	```sh
	./convert_media.sh
	```
1. Remove the input file from media/ directory before uploading.


## TODO

1. Add more levels
   1. ~~Minor~~
   2. ~~Octave~~
   3. ~~Major with chromatics~~
   4. ~~Minor with chromatics~~
2. Logic for when to level up
3. ~~"Start at level _"~~
4. ~~"Explain level _"~~
5. ~~AMAZON.HelpIntent~~
6. ~~AMAZON.RepeatIntent~~
7. ~~AMAZON.FallbackIntent~~
8. ~~AMAZON.StopIntent~~
9.  ~~AMAZON.NavigateHomeIntent~~
10. Persistence of last level and historical scores.
11. ~~right/wrong sounds~~
12. ~~add solfege and degree aliases for scale degree~~
13. ~~Repeat question when answered wrong~~
14. "Training wheels" - play note resolutions

## Documentation

Beta testers / long description:
- For extra functionality, have the Alexa app on your phone.
- Latency may be slow depending on where you're located. It's currently hosted in Oregon, US. Let me know how latency is for you.
