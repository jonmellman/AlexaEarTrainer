import { CurrentRound } from "./game/state"
import { getNoteFromKeyAtInterval, Key, Interval, Note } from "./game/music"
import { getNumberOfLevels, getLevelByNumber } from "./game/levels"

const MEDIA_FOLDER = 'https://alexa-ear-trainer.s3-us-west-2.amazonaws.com/media'

const getMediaAudio = (filename: string): string =>
	`<audio src="${MEDIA_FOLDER}/${filename}.mp3"/>`

export const compose = (...speeches: String[]): string =>
	// Join with sentence break
	speeches.join('<break strength="strong"/>')

export const welcome = () =>
	`<amazon:emotion name="excited" intensity="high">Welcome!</amazon:emotion> ${getMediaAudio('welcome')}`

export const levelIntroduction = (level: number) =>
	`level ${level}.`

export const question = (currentRound: CurrentRound, levelNumber: number) =>
	compose(
		getAudioForReference(currentRound.key, levelNumber),
		getAudioForInterval(currentRound.key, currentRound.targetInterval)
	)

const getAudioForReference = (key: Key, levelNumber: number): string => {
	const isMajor = getLevelByNumber(levelNumber).isMajor

	switch (key) {
		case Key.C:
			return getMediaAudio(`reference_${Key[key]}-${isMajor ? 'MAJOR' : 'MINOR'}`)
		default:
			throw new Error(`Key ${Key[key]} not implemented`)
	}
}

const getAudioForInterval = (key: Key, interval: Interval): string => {
	const note = getNoteFromKeyAtInterval(key, interval)
	return getMediaAudio(Note[note])
}

export const assess = (isCorrect: boolean) =>
	isCorrect ? '<amazon:emotion name="excited" intensity="low">Right!</amazon:emotion>' : 'Wrong.'

export const levelComplete = (correct: number, total: number, nextLevel: number) =>
	`All done! Score was ${correct} out of ${total}. Ready for level ${nextLevel}?`

export const goodbye = () =>
	'Thanks for playing!'

export const invalidLevel = () =>
	`Choose a level between 1 and ${getNumberOfLevels()}`

export const intervalNameHelp = () =>
	'Please say an interval like root, major third, minor sixth, etc'

export const genericFallback = () =>
	`You can say "Start level 1", or ask for help and I'll send you a help card.`

export const help = () =>
	`I'm sending a help card to your Alexa app with details.`

export const helpCardTitle = () =>
	'Interval Practice - Guide'

export const helpCardContent = () =>
// Take care to format using unicode, which is all cards can use.
`
⎯⎯⎯⎯⎯⎯⎯⎯
𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀
❝ Start level 3 ❞ - Start a specific level
❝ Again? ❞ - Repeat an interval
❝ Help ❞ - Send this card

⠀
𝗟𝗲𝘃𝗲𝗹𝘀
• 1: 1st half of C Major
• 2: 2nd half of C Major
• 3: Full octave of C Major
• 4: 1st half of C Minor
• 5: 2nd half of C Minor
• 6: Full octave of C Minor

⠀
𝗖𝗼𝗺𝗶𝗻𝗴 𝘀𝗼𝗼𝗻
• Levels with multiple octaves
• Levels with multiple keys
• Score tracking

⠀
𝗙𝗲𝗲𝗱𝗯𝗮𝗰𝗸 𝘄𝗲𝗹𝗰𝗼𝗺𝗲 ♡
jonmellman@gmail.com
`.trim()

/*
	Between levels:
		<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_bridge_02"/>

		Level up:
			<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_tally_positive_01"/>

		No level up:
			<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_tally_negative_01"/>

	Wrong answer:
		<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_neutral_response_02"/>Try again!

	Right answer:
		<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_player1_01"/>
		<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_01"/>

	Level up:
		<say-as interpret-as="interjection">boom</say-as>
		<say-as interpret-as="interjection">you go girl</say-as>
		<say-as interpret-as="interjection">yippee</say-as>
		<say-as interpret-as="interjection">yes</say-as>
		<say-as interpret-as="interjection">yabba dabba doo</say-as>
		<say-as interpret-as="interjection">woo hoo</say-as>
		<say-as interpret-as="interjection">well done</say-as>
		<say-as interpret-as="interjection">way to go</say-as>
		<say-as interpret-as="interjection">stunning</say-as>
		<say-as interpret-as="interjection">she shoots she scores</say-as>
		<say-as interpret-as="interjection">mazel tov </say-as>

*/
