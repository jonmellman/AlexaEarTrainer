import * as Alexa from 'ask-sdk-core'
import { RequestHandler } from 'ask-sdk-core';

import { evaluateGuess } from '../game/state'
import { GameSessionManager } from '../utils'
import * as speech from '../speech';
import { getStatsSummary, wasPreviousRoundCorrect } from '../game/util';

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

		const intervalDistanceGuess = getIntervalDistanceGuess(handlerInput)
		const correctInterval = previousRoundGameSession.currentRound.targetInterval
		const gameSession = evaluateGuess(previousRoundGameSession, intervalDistanceGuess)
		gameSessionManager.setSession(gameSession)

		const isCorrect = wasPreviousRoundCorrect(gameSession.stats)

		if (gameSession.state === 'LEVEL_COMPLETE') {
			const statsSummary = getStatsSummary(gameSession.stats)

			return handlerInput.responseBuilder
				.speak(speech.compose(
					isCorrect ? speech.correctGuess() : speech.wrongGuess(correctInterval),
					gameSession.passed ? speech.levelPassed(statsSummary, gameSession.level + 1) : speech.levelFailed(statsSummary)
				))
				.withShouldEndSession(false)
				.getResponse();
		}

		return handlerInput.responseBuilder
			.speak(speech.compose(
				isCorrect ? speech.correctGuess() : speech.wrongGuess(correctInterval),
				speech.question(gameSession.currentRound, gameSession.level)
			))
			.withShouldEndSession(false)
			.getResponse();

		function getIntervalDistanceGuess(handlerInput: Alexa.HandlerInput): number {
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
