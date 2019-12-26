import * as Alexa from 'ask-sdk-core'
import {
	RequestHandler,
} from 'ask-sdk-core';

import {
	getNewGame,
	evaluateGuess,
} from './game'
import { GameSessionManager } from './GameSessionManager'
import * as speech from './speech';

const AnswerHandler: RequestHandler = {
	canHandle(handlerInput) {
		return !Alexa.isNewSession(handlerInput.requestEnvelope) &&
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent';
	},
	async handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput)

		const intervalDistanceGuess = extractIntervalDistanceFromAnswer(handlerInput)
		const gameSession = evaluateGuess(gameSessionManager.getSession(), intervalDistanceGuess)

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
				(gameSession.currentRound ? speech.question(gameSession.currentRound) : speech.roundComplete(counts.correct, counts.total, gameSession.level + 1))
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
				throw new Error(`'${slot.value}' didn't match '${slot.name}' slots`)
			}

			/*
				If we created our slots correctly in the Alexa Developer Console, we should have an ID that corresponds to the interval distance.
				If the guess is "minor second", then the distance will be 1. "major second" will be 2, etc.
			*/
			const intervalDistanceString = resolutionsPerAuthority[0].values[0].value.id
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

		return handlerInput.responseBuilder
			.speak(speech.compose(
				speech.welcome(),
				speech.levelIntroduction(level),
				speech.question(currentRound)
			))
			.reprompt('Bee boop') // TODO
			.withShouldEndSession(false)
			.getResponse();
	},
};

const FallbackHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		if (isTestEnvironment()) {
			throw new Error(`Fallback handler invoked request: ${Alexa.getRequestType(handlerInput.requestEnvelope)}, intent: ${Alexa.getIntentName(handlerInput.requestEnvelope)}!`)
		}

		return true
	},
	handle(handlerInput) {
		// TODO: implement
		return handlerInput.responseBuilder
			.speak(speech.compose(
				'Fallback handler',
				Alexa.getRequestType(handlerInput.requestEnvelope),
				Alexa.getIntentName(handlerInput.requestEnvelope)
			))
			.getResponse()
	}
}

const ErrorHandler: Alexa.ErrorHandler = {
	canHandle() {
		// Unhandled errors in tests are easier to debug
		return !isTestEnvironment();
	},
	handle(handlerInput, error) {
		console.log(`Error handled: ${error.stack}`)

		const speechOutput = error.stack || 'No stack trace'
		const repromptText = speechOutput;

		return handlerInput.responseBuilder
			.speak(speechOutput)
			.reprompt(repromptText)
			.getResponse();
	},
};

const SessionEndedRequestHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},
	handle(handlerInput) {
		// TODO
		// @ts-ignore
		console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

		return handlerInput.responseBuilder.getResponse();
	},
};

const NextLevelHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return !Alexa.isNewSession(handlerInput.requestEnvelope) &&

			// Round is over
			new GameSessionManager(handlerInput).getSession().currentRound === undefined &&

			// User said yes
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
	},
	handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput)
		const level = gameSessionManager.getSession().level + 1

		// Set state for new game
		gameSessionManager.setSession(getNewGame(level))

		// Return UI for new game
		const currentRound = gameSessionManager.getSession().currentRound

		if (!currentRound) {
			throw new Error('Expected currentRound when starting a new game')
		}

		return handlerInput.responseBuilder
			.speak(speech.compose(
				speech.levelIntroduction(level),
				speech.question(currentRound)
			))
			.withShouldEndSession(false)
			.getResponse();
	},
}

const StopHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return (
				// User said Stop or Cancel
				Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
				(
					Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent' ||
					Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
				)
			) || (
				// Round is over
				!Alexa.isNewSession(handlerInput.requestEnvelope) &&
				new GameSessionManager(handlerInput).getSession().currentRound === undefined &&

				// User said No to continuing
				Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
				Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent'
			)
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak('Thanks for playing!')
			.withShouldEndSession(true)
			.getResponse();
	},
}

const RepeatQuestionHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return !Alexa.isNewSession(handlerInput.requestEnvelope) &&
			new GameSessionManager(handlerInput).getSession().currentRound !== undefined &&
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent'
	},
	handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput)
		const gameSession = gameSessionManager.getSession()

		if (!gameSession.currentRound) {
			throw new Error('Asked to repeat a question, but no currentRound!')
		}

		return handlerInput.responseBuilder
			.speak(speech.question(gameSession.currentRound))
			.withShouldEndSession(false)
			.getResponse();
	},
}

export const handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		LaunchRequest,
		NextLevelHandler,
		RepeatQuestionHandler,
		StopHandler,
		AnswerHandler, // This must be the last non-generic input handler, because Alexa maps other phrases to our slot values.
		// HelpHandler,
		// ExitHandler,
		SessionEndedRequestHandler,
		FallbackHandler,
	)
	.addErrorHandlers(ErrorHandler)
	.lambda()

process.on('unhandledRejection', error => {
	console.error('unhandledRejection', error);
});

const isTestEnvironment = (): boolean => process.env.JEST_WORKER_ID !== undefined
