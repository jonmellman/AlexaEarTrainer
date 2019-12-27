import { Interval, Key } from "./music"
import { getLevelByNumber } from "./levels"

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

export const getNewGame = (level: GameSession['level'] = 1): LevelInProgress => {
	return {
		state: 'LEVEL_IN_PROGRESS',
		level,
		stats: [],
		currentRound: getNewRound(level)
	}
}

export const evaluateGuess = (gameSession: LevelInProgress, guessInterval: Interval): LevelInProgress | LevelComplete => {
	const level = getLevelByNumber(gameSession.level)

	const isLevelComplete = gameSession.currentRound.roundNumber === level.numRounds
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
		const level = getLevelByNumber(levelNumber)

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
