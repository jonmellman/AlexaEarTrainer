import { GameState } from './state'

export const getStatsSummary = (stats: GameState['stats']): { correct: number, total: number } =>
	({
		correct: stats.filter(stat => stat.guess === stat.answer).length,
		total: stats.length
	})

export const wasPreviousRoundCorrect = (stats: GameState['stats']): boolean => {
	const previousRoundStat = stats[stats.length - 1]
	return previousRoundStat.answer === previousRoundStat.guess
}
