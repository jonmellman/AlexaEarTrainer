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

export type GameSession = LevelInProgress | LevelComplete

interface LevelInProgress {
	state: 'LEVEL_IN_PROGRESS',
	level: number,
	stats: Stat[],
	currentRound: CurrentRound
}

interface LevelComplete {
	state: 'LEVEL_COMPLETE',
	level: number,
	stats: Stat[]
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
	targetNotes: [Note.C4, Note.D4, Note.E4, Note.F4],
	numRounds: 5
}, {
	description: 'Second half of the C Major scale',
	referenceNotes: [Note.C4],
	targetNotes: [Note.G4, Note.A4, Note.B4],
	numRounds: 5
}, {
	description: 'Full octave of the C Major scale',
	referenceNotes: [Note.C4],
	targetNotes: [Note.C4, Note.D4, Note.E4, Note.F4, Note.G4, Note.A4, Note.B4, /* TODO: Note.C5 */],
	numRounds: 5
}]

// Given a game level, select two pitches
// Given a pitch, return the audio file name
// Given two pitches, calculate the distance
// Given the distance, return the correct answer(s)


// Level 1: (C4), (D4, E4, F4)
// Level 2: (C4), (G4, A4, B4)
// Level 3: (C4), (C4, D4, E4, F4, G4, A4, B4)

export const getNewGame = (level: GameSession['level'] = 1): LevelInProgress => {
	return {
		state: 'LEVEL_IN_PROGRESS',
		level,
		stats: [],
		currentRound: getNewRound(level)
	}
}

export const evaluateGuess = (gameSession: LevelInProgress, intervalDistanceGuess: CurrentRound['intervalDistance']): LevelInProgress | LevelComplete => {
	const isLevelComplete = gameSession.currentRound.roundNumber === levels[gameSession.level - 1].numRounds
	return isLevelComplete ? levelComplete(gameSession, intervalDistanceGuess) : levelProgress(gameSession, intervalDistanceGuess)

	function levelComplete(gameSession: LevelInProgress, intervalDistanceGuess: CurrentRound['intervalDistance']): LevelComplete {
		return {
			...gameSession,
			state: 'LEVEL_COMPLETE',
			stats: [...gameSession.stats, {
				guess: intervalDistanceGuess,
				answer: gameSession.currentRound.intervalDistance
			}],
		}
	}

	function levelProgress(gameSession: LevelInProgress, intervalDistanceGuess: CurrentRound['intervalDistance']): LevelInProgress {
		return {
			...gameSession,
			stats: [...gameSession.stats, {
				guess: intervalDistanceGuess,
				answer: gameSession.currentRound.intervalDistance
			}],
			currentRound: getNewRound(gameSession.level, gameSession.currentRound.roundNumber)
		}
	}
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
