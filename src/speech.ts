import { CurrentRound, Note } from "./game"

export const compose = (...speeches: String[]): string =>
	// Join with sentence break
	speeches.join('<break strength="strong"/>')

export const welcome = () =>
	'Welcome to ear trainer. <audio src="soundbank://soundlibrary/musical/amzn_sfx_piano_note_1x_01"/>'

export const levelIntroduction = (level: number) =>
	`Let's start with level ${level}.`

export const question = (currentRound: CurrentRound) =>
	`${Note[currentRound.referenceNote]}, ${Note[currentRound.targetNote]}`

export const assess = (isCorrect: boolean) =>
	isCorrect ? 'Right.' : 'Wrong.'

export const roundComplete = (correct: number, total: number, nextLevel: number) =>
	`All done! Score was ${correct} out of ${total}. Ready for level ${nextLevel}?`
