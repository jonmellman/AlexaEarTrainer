import * as Alexa from 'ask-sdk-core'
import {
	RequestHandler,
} from 'ask-sdk-core';

import {
	Note,
	levels,
	getNewRound,
	getNewGame,
	evaluateGuess
} from './game'
import { GameSessionManager } from './GameSessionManager'

const AnswerIntent: RequestHandler = {
	canHandle(handlerInput) {
		return !Alexa.isNewSession(handlerInput.requestEnvelope) &&
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent';
	},
	async handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput)

		const intervalDistanceGuess = extractIntervalDistanceFromAnswer(handlerInput)
		const { gameSession, isCorrect, isDoneWithLevel } = evaluateGuess(gameSessionManager.getSession(), intervalDistanceGuess)

		gameSessionManager.setSession(gameSession)

		const stats = gameSessionManager.getSession().stats

		return handlerInput.responseBuilder
			.speak(
				(isCorrect ? 'Right' : 'Wrong') +
				(isDoneWithLevel ? ` All done! Score was ${stats.correct} out of ${stats.correct + stats.incorrect}` : /* getNextRoundSpeech */'')
			)
			.getResponse();

		function extractIntervalDistanceFromAnswer(handlerInput: Alexa.HandlerInput): number {
			const slot = Alexa.getSlot(handlerInput.requestEnvelope, 'intervalName') // `intervalName` is the literal name of the slot.

			if (!slot?.resolutions?.resolutionsPerAuthority) {
				throw new Error(`No slot resolutions found on '${slot}'`)
			}

			/*
				If we created our slots correctly in the Alexa Developer Console, we should have an ID that corresponds to the interval distance.
				If the guess is "minor second", then the distance will be 1. "major second" will be 2, etc.
			*/
			const intervalDistanceString = slot.resolutions.resolutionsPerAuthority[0].values[0].value.id
			const intervalDistance = parseInt(intervalDistanceString)

			if (isNaN(intervalDistance)) {
				throw new Error(`Error converting '${intervalDistanceString}' to a number`)
			}

			return intervalDistance
		}
	}
}

const LaunchRequest: RequestHandler = {
	canHandle(handlerInput) {
		return Alexa.isNewSession(handlerInput.requestEnvelope) ||
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
	},
	async handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput)
		const level = 1

		// Set state for new game
		gameSessionManager.setSession(getNewGame(level))

		// Return UI for new game
		const currentRound = gameSessionManager.getSession().currentRound

		if (!currentRound) {
			throw new Error('Expected currentRound when starting a new game')
		}

		const { referenceNote, targetNote } = currentRound

		return handlerInput.responseBuilder
			.speak(
				`Welcome to ear trainer. <audio src="soundbank://soundlibrary/musical/amzn_sfx_piano_note_1x_01"/> Let\'s start with level ${level}.` +
				`${Note[referenceNote]}, ${Note[targetNote]}`
			)
			.getResponse();
	},
};


export const handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		LaunchRequest,
		AnswerIntent,
		// HelpHandler,
		// ExitHandler,
		// FallbackHandler,
		// SessionEndedRequestHandler,
	)
	// .addErrorHandlers(ErrorHandler)
	.lambda()
