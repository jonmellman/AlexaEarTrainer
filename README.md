

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

1. Logic software instrument
1. CMD+B to "bounce project or section" as MP3. Bit rate mono/stero both 48 kbps
1. Convert to Alexa-compatible MP3 format:
```sh
ffmpeg -i <input-file> -ac 2 -codec:a libmp3lame -b:a 48k -ar 24000 -write_xing 0 <output-file>
```
1. Remove the input file from media/ directory before uploading.


## TODO

1. "Play it again" / "One more time" intent
	"Play it again"
	"Let me hear it again"
	"Repeat"
	"Again"
	"Another time"
	"Once more"
1. Add more levels
1. Logic for when to level up
1. "Start at level _"
1. "Explain level _"
1. AMAZON.HelpIntent
1. AMAZON.FallbackIntent
1. AMAZON.StopIntent
1. AMAZON.NavigateHomeIntent
