import { CurrentRound, levels } from "./game"
import { getNoteFromKeyAtInterval, Key, Interval, Note } from "./music"

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

export const question = (currentRound: CurrentRound) =>
	compose(
		getAudioForReference(currentRound.key),
		getAudioForInterval(currentRound.key, currentRound.targetInterval)
	)

const getAudioForReference = (key: Key): string => {
	switch (key) {
		case Key.C:
			return getMediaAudio('C4_E4_G4_C5')
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
	`Choose a level between 1 and ${levels.length}`

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
