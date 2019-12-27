// Nothing Alexa-specific in this file.

// https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies
export enum Note {
	C4 = 60,
	D4 = 62,
	E4 = 64,
	F4 = 65,
	G4 = 67,
	A4 = 69,
	B4 = 71,
	C5 = 72
}

export enum Key {
	C = 0,
	'C#',
	D,
	Eb,
	E,
	F,
	'F#',
	G,
	Ab,
	A,
	Bb,
	B,
}

export enum Interval {
	ROOT = 0,
	MINOR_SECOND,
	MAJOR_SECOND,
	MINOR_THIRD,
	MAJOR_THIRD,
	PERFECT_FOURTH,
	TRITONE,
	PERFECT_FIFTH,
	MINOR_SIXTH,
	MAJOR_SIXTH,
	MINOR_SEVENTH,
	MAJOR_SEVENTH,
	OCTAVE
}

const Quality = {
	MAJOR: [
		Interval.ROOT,
		Interval.MAJOR_SECOND,
		Interval.MAJOR_THIRD,
		Interval.PERFECT_FOURTH,
		Interval.PERFECT_FIFTH,
		Interval.MAJOR_SIXTH,
		Interval.MAJOR_SEVENTH,
		Interval.OCTAVE
	]
}

interface Level {
	description: string,
	key: Key,
	targetIntervals: Interval[],
	numRounds: number
}

interface Stat {
	guess: CurrentRound['targetInterval'],
	answer: CurrentRound['targetInterval']
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
	key: Key
	targetInterval: Interval
}



export const levels: Level[] = [{
	description: 'First half of the C Major scale',
	key: Key.C,
	targetIntervals: Quality.MAJOR.slice(0, Quality.MAJOR.indexOf(Interval.PERFECT_FIFTH)),
	numRounds: 5
}, {
	description: 'Second half of the C Major scale',
	key: Key.C,
	targetIntervals: Quality.MAJOR.slice(Quality.MAJOR.indexOf(Interval.PERFECT_FIFTH)),
	numRounds: 5
}, {
	description: 'Full octave of the C Major scale',
	key: Key.C,
	targetIntervals: Quality.MAJOR,
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

export const evaluateGuess = (gameSession: LevelInProgress, guessInterval: Interval): LevelInProgress | LevelComplete => {
	const isLevelComplete = gameSession.currentRound.roundNumber === levels[gameSession.level - 1].numRounds
	return isLevelComplete ? levelComplete(gameSession, guessInterval) : levelProgress(gameSession, guessInterval)

	function levelComplete(gameSession: LevelInProgress, guessInterval: Interval): LevelComplete {
		return {
			...gameSession,
			state: 'LEVEL_COMPLETE',
			stats: [...gameSession.stats, {
				guess: guessInterval,
				answer: gameSession.currentRound.targetInterval
			}],
		}
	}

	function levelProgress(gameSession: LevelInProgress, guessInterval: Interval): LevelInProgress {
		return {
			...gameSession,
			stats: [...gameSession.stats, {
				guess: guessInterval,
				answer: gameSession.currentRound.targetInterval
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

		return {
			key: level.key,
			targetInterval: getRandomElement(level.targetIntervals)
		}

		function getRandomElement<T>(elements: Array<T>): T {
			return elements[Math.floor(Math.random() * elements.length)];
		}
	}
}
