import * as Alexa from 'ask-sdk-core'
import { RequestHandler } from 'ask-sdk-core';

import { evaluateGuess } from '../game/state'
import { GameSessionManager } from '../utils'
import * as speech from '../speech';

export const AnswerHandler: RequestHandler = {
	canHandle(handlerInput) {
		return !Alexa.isNewSession(handlerInput.requestEnvelope) &&
			new GameSessionManager(handlerInput).getSession().state === 'LEVEL_IN_PROGRESS' &&
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent'
	},
	async handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput)
		const previousRoundGameSession = gameSessionManager.getSession()

		if (previousRoundGameSession.state !== 'LEVEL_IN_PROGRESS') {
			throw new Error(`AnswerHandler invoked when state is ${previousRoundGameSession.state}`)
		}

		const intervalDistanceGuess = extractIntervalDistanceFromAnswer(handlerInput)
		const gameSession = evaluateGuess(previousRoundGameSession, intervalDistanceGuess)

		const stat = gameSession.stats[gameSession.stats.length - 1]
		const isCorrect = stat.guess === stat.answer

		const counts = {
			correct: gameSession.stats.filter(stat => stat.guess === stat.answer).length,
			total: gameSession.stats.length
		}

		gameSessionManager.setSession(gameSession)

		return handlerInput.responseBuilder
			.speak(speech.compose(
				speech.assess(isCorrect),
				(gameSession.state === 'LEVEL_IN_PROGRESS' ? speech.question(gameSession.currentRound, gameSession.level) : speech.levelComplete(counts.correct, counts.total, gameSession.level + 1))
			))
			.withShouldEndSession(false)
			.getResponse();

		function extractIntervalDistanceFromAnswer(handlerInput: Alexa.HandlerInput): number {
			const slot = Alexa.getSlot(handlerInput.requestEnvelope, 'intervalName') // `intervalName` is the literal name of the slot.

			if (!slot?.resolutions?.resolutionsPerAuthority) {
				throw new Error(`No slot resolutions found on '${slot}'`)
			}

			const resolutionsPerAuthority = slot.resolutions.resolutionsPerAuthority

			if (!resolutionsPerAuthority[0].values) {
				throw new Error(`AnswerHandler couldn't interpret '${slot.value}' as a '${slot.name}' slot`)
			}

			/*
				If we created our slots correctly in the Alexa Developer Console, we should have an ID that corresponds to the interval distance.
				If the guess is "minor second", then the distance will be 1. "major second" will be 2, etc.
			*/
			const intervalDistanceString = resolutionsPerAuthority[0].values[0].value.id
			const intervalDistance = parseInt(intervalDistanceString)

			if (Number.isNaN(intervalDistance)) {
				throw new Error(`Error converting '${intervalDistanceString}' to a number`)
			}

			return intervalDistance
		}
	}
}
