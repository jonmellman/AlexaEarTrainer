// Nothing Alexa-specific in this file.

// https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies
export enum Note {
	C4 = 60,
	D4 = 62,
	E4 = 64,
	F4 = 65,
	G4 = 67,
	A4 = 69,
	B4 = 71
}

interface Level {
	description: string,
	referenceNotes: Note[],
	targetNotes: Note[],
	numRounds: number
}

interface Stat {
	guess: CurrentRound['intervalDistance'],
	answer: CurrentRound['intervalDistance']
}

export interface GameSession {
	level: number,
	stats: Stat[],
	currentRound?: CurrentRound // undefined when round is over
}

export interface CurrentRound {
	roundNumber: number
	referenceNote: Note
	targetNote: Note
	intervalDistance: number
}

export const levels: Level[] = [{
	description: 'First half of the C Major scale',
	referenceNotes: [Note.C4],
	targetNotes: [Note.D4, Note.E4, Note.F4],
	numRounds: 2
}, {
	description: 'Second half of the C Major scale',
	referenceNotes: [Note.C4],
	targetNotes: [Note.G4, Note.A4, Note.B4],
	numRounds: 2
}]

// Given a game level, select two pitches
// Given a pitch, return the audio file name
// Given two pitches, calculate the distance
// Given the distance, return the correct answer(s)


// Level 1: (C4), (D4, E4, F4)
// Level 2: (C4), (G4, A4, B4)
// Level 3: (C4), (C4, D4, E4, F4, G4, A4, B4)

export const getNewGame = (level: GameSession['level'] = 1): GameSession => {
	return {
		level,
		stats: [],
		currentRound: getNewRound(level)
	}
}

export const evaluateGuess = (gameSession: GameSession, intervalDistanceGuess: CurrentRound['intervalDistance']): GameSession => {
	if (!gameSession.currentRound) {
		throw new Error('Cannot evaluate guess when there is no currentRound!')
	}

	const isDoneWithLevel = gameSession.currentRound.roundNumber === levels[gameSession.level - 1].numRounds

	const nextGameSession = {
		...gameSession,
		stats: [...gameSession.stats, {
			guess: intervalDistanceGuess,
			answer: gameSession.currentRound.intervalDistance
		}],
		currentRound: isDoneWithLevel ? undefined : getNewRound(gameSession.level, gameSession.currentRound.roundNumber)
	}

	return nextGameSession
}

function getNewRound(level: GameSession['level'], previousRoundNumber: CurrentRound['roundNumber'] = 0): CurrentRound {
	return {
		roundNumber: previousRoundNumber + 1,
		...getIntervalsForLevel(level)
	}

	function getIntervalsForLevel(levelNumber: number) {
		const level = levels[levelNumber - 1]

		if (!level) {
			throw new Error(`No level configuration for level ${levelNumber}!`)
		}

		const referenceNote = getRandomElement(level.referenceNotes)
		const targetNote = getRandomElement(level.targetNotes)

		return {
			referenceNote,
			targetNote,
			intervalDistance: targetNote - referenceNote
		}

		function getRandomElement<T>(elements: Array<T>): T {
			return elements[Math.floor(Math.random() * elements.length)];
		}
	}
}
