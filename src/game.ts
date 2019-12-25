// Nothing Alexa-specific in this file.

// https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies
export enum Note {
	C4 = 60,
	D4 = 62,
	E4 = 64,
	F4 = 65
}

interface Level {
	description: string,
	referenceNotes: Note[],
	targetNotes: Note[],
	numRounds: number
}

export interface GameSession {
	level: number,
	stats: {
		correct: number,
		incorrect: number
	},
	currentRound: CurrentRound | null // null means the round is over
}

interface CurrentRound {
	roundNumber: number
	referenceNote: Note
	targetNote: Note
	intervalDistance: number
}

export const levels: Level[] = [{
	description: 'First half of the C Major scale',
	referenceNotes: [Note.C4],
	targetNotes: [Note.D4, Note.E4, Note.F4],
	numRounds: 5
}/* , {
	description: 'Second half of C Major'
} */]

// Given a game level, select two pitches
// Given a pitch, return the audio file name
// Given two pitches, calculate the distance
// Given the distance, return the correct answer(s)


// Level 1: (C4), (D4, E4, F4)
// Level 2: (C4), (G4, A4, B4)
// Level 3: (C4), (C4, D4, E4, F4, G4, A4, B4)


export const getIntervalsForLevel = (levelNumber: number) => {
	const level = levels[levelNumber - 1]

	const referenceNote = getRandomElement(level.referenceNotes)
	const targetNote = getRandomElement(level.targetNotes)

	return {
		referenceNote,
		targetNote,
		intervalDistance: targetNote - referenceNote
	}

	function getRandomElement<T> (elements: Array<T>): T {
		return elements[Math.floor(Math.random() * elements.length)];
	}
}


export const getNewGame = (level: GameSession['level'] = 1): GameSession => {
	return {
		level,
		stats: {
			correct: 0,
			incorrect: 0
		},
		currentRound: {
			roundNumber: 1,
			...getIntervalsForLevel(level)
		}
	}
}

export const getNewRound = (level: GameSession['level'], previousRoundNumber: CurrentRound['roundNumber'] = 0): CurrentRound => {
	return {
		roundNumber: previousRoundNumber + 1,
		...getIntervalsForLevel(level)
	}
}

interface GuessEvaluation {
	gameSession: GameSession,
	isCorrect: boolean,
	isDoneWithLevel: boolean
}

export const evaluateGuess = (gameSession: GameSession, intervalDistanceGuess: CurrentRound['intervalDistance']): GuessEvaluation => {
	if (!gameSession.currentRound) {
		throw new Error('Cannot evaluate guess when there is no currentRound!')
	}

	const isCorrect = intervalDistanceGuess === gameSession.currentRound.intervalDistance
	const isDoneWithLevel = gameSession.currentRound.roundNumber === levels[gameSession.level - 1].numRounds

	const nextGameSession = {
		...gameSession,
		stats: {
			correct: isCorrect ? gameSession.stats.correct + 1 : gameSession.stats.correct,
			incorrect: !isCorrect ? gameSession.stats.incorrect + 1 : gameSession.stats.incorrect
		},
		currentRound: isDoneWithLevel ? null : getNewRound(gameSession.level, gameSession.currentRound.roundNumber)
	}

	return {
		gameSession: nextGameSession,
		isCorrect,
		isDoneWithLevel
	}
}
