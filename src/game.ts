import { Interval, Key, Scales } from "./music"

// Nothing Alexa-specific in this file.

interface Level {
	description: string,
	numRounds: number,

	key: Key,
	targetIntervals: Interval[],
	isMajor: boolean

	// TODO: use this
	octaves: number
}

interface Stat {
	guess: Interval,
	answer: Interval
}

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

export type GameSession = LevelInProgress | LevelComplete

export interface CurrentRound {
	roundNumber: number
	key: Key
	targetInterval: Interval
}

export const levels: Level[] = [{
	description: 'First half of the C Major scale',
	numRounds: 5,
	key: Key.C,
	targetIntervals: Scales.MAJOR.firstHalf(),
	isMajor: Scales.MAJOR.isMajor(),

	octaves: 1
}, {
	description: 'Second half of the C Major scale',
	numRounds: 5,
	key: Key.C,
	targetIntervals: Scales.MAJOR.secondHalf(),
	isMajor: Scales.MAJOR.isMajor(),
	octaves: 1
}, {
	description: 'Full octave of the C Major scale',
	numRounds: 10,
	key: Key.C,
	targetIntervals: Scales.MAJOR.full(),
	isMajor: Scales.MAJOR.isMajor(),
	octaves: 1
}/* , {
	description: 'Multiple octaves of the C Major scale',
	numRounds: 5,
	key: Key.C,
	targetIntervals: Scales.MAJOR,
	octaves: 3 // TODO: implement multiple octaves
} */, {
	description: 'First half of the C Minor scale',
	numRounds: 5,
	key: Key.C,
	targetIntervals: Scales.MINOR.firstHalf(),
	isMajor: Scales.MINOR.isMajor(),
	octaves: 1
}, {
	description: 'Second half of the C Minor scale',
	numRounds: 5,
	key: Key.C,
	targetIntervals: Scales.MINOR.secondHalf(),
	isMajor: Scales.MINOR.isMajor(),
	octaves: 1
}, {
	description: 'Full octave of the C Minor scale',
	numRounds: 10,
	key: Key.C,
	targetIntervals: Scales.MINOR.full(),
	isMajor: Scales.MINOR.isMajor(),
	octaves: 1
}]

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
