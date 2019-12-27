

U: Alexa, ask Interval Trainer to start a new game
A: Starting a new game at level 1 <UserLastLevel or level 1>. Name the interval:
A: <question>

U: Major Second
A: <audio correct>
A: <question> || if (score)

U: Major Seventh
A: <audio incorrect>. Your score so far is <session score>
A: <question>

U: Skip
A: <question>



## Creating media

1. Logic software instrument. Tempo 120 BPM. 2 measures. Velocity 98.
1. CMD+B to "bounce project or section" as MP3. Bit rate mono/stero both 48 kbps
1. Convert to Alexa-compatible MP3 format:
	```sh
	./convert_media.sh
	```
1. Remove the input file from media/ directory before uploading.


## TODO

1. Add more levels
2. Logic for when to level up
3. "Start at level _"
4. "Explain level _"
5. AMAZON.HelpIntent
6. ~~AMAZON.RepeatIntent~~
7. AMAZON.FallbackIntent
8. ~~AMAZON.StopIntent~~
9. ~~AMAZON.NavigateHomeIntent~~
11. Persistence
12. right/wrong sounds
13. add aliases for scale degree (two, three etc)
14. Repeat question when answered wrong
