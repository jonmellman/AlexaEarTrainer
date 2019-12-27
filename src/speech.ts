import { CurrentRound, Note } from "./game"

const mediaFolder = 'https://alexa-ear-trainer.s3-us-west-2.amazonaws.com/media'

export const compose = (...speeches: String[]): string =>
	// Join with sentence break
	speeches.join('<break strength="strong"/>')

export const welcome = () =>
	`<amazon:emotion name="excited" intensity="high">Welcome!</amazon:emotion> ${getMediaAudio('welcome')}`

export const levelIntroduction = (level: number) =>
	`level ${level}.`

export const question = (currentRound: CurrentRound) =>
	compose(
		getNoteAudio(currentRound.referenceNote),
		getNoteAudio(currentRound.targetNote)
	)
	// `${Note[currentRound.referenceNote]}, ${Note[currentRound.targetNote]}`

export const assess = (isCorrect: boolean) =>
	isCorrect ? '<amazon:emotion name="excited" intensity="high">Right!</amazon:emotion>' : 'Wrong.'

export const roundComplete = (correct: number, total: number, nextLevel: number) =>
	`All done! Score was ${correct} out of ${total}. Ready for level ${nextLevel}?`

const getNoteAudio = (note: Note): string => getMediaAudio(Note[note])

const getMediaAudio = (filename: string): string =>
	`<audio src="${mediaFolder}/${filename}.mp3"/>`


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
