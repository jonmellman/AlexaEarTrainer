import { Interval, Key } from "./music"
import { getLevelByNumber } from "./levels"

interface Stat {
	guess: Interval,
	answer: Interval
}

interface LevelInProgressState {
	state: 'LEVEL_IN_PROGRESS',
	level: number,
	stats: Stat[],
	currentRound: CurrentRound
}

interface LevelCompleteState {
	state: 'LEVEL_COMPLETE',
	level: number,
	stats: Stat[]
}

export type GameState = LevelInProgressState | LevelCompleteState

export interface CurrentRound {
	roundNumber: number
	key: Key
	targetInterval: Interval
}

export const getNewGame = (level: GameState['level'] = 1): LevelInProgressState => {
	return {
		state: 'LEVEL_IN_PROGRESS',
		level,
		stats: [],
		currentRound: getNewRound(level)
	}
}

export const evaluateGuess = (gameSession: LevelInProgressState, guessInterval: Interval): LevelInProgressState | LevelCompleteState => {
	const level = getLevelByNumber(gameSession.level)

	const isLevelComplete = gameSession.currentRound.roundNumber === level.numRounds
	return isLevelComplete ? levelComplete(gameSession, guessInterval) : levelProgress(gameSession, guessInterval)

	function levelComplete(gameSession: LevelInProgressState, guessInterval: Interval): LevelCompleteState {
		return {
			...gameSession,
			state: 'LEVEL_COMPLETE',
			stats: [...gameSession.stats, {
				guess: guessInterval,
				answer: gameSession.currentRound.targetInterval
			}],
		}
	}

	function levelProgress(gameSession: LevelInProgressState, guessInterval: Interval): LevelInProgressState {
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

function getNewRound(level: GameState['level'], previousRoundNumber: CurrentRound['roundNumber'] = 0): CurrentRound {
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
