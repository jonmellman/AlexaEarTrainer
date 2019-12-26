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

const AnswerIntent: RequestHandler = {
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
	canHandle() {
		return true
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(speech.compose(
				Alexa.getRequestType(handlerInput.requestEnvelope),
				Alexa.getIntentName(handlerInput.requestEnvelope)
			))
			.getResponse();
	}
}

const ErrorHandler: Alexa.ErrorHandler = {
	canHandle() {
		return true;
	},
	handle(handlerInput, error) {
		console.log(`Error handled: ${error.stack}`)

		const speechOutput = error.stack as string; // TODO
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

const YesIntent: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		// TODO: Also check that round is over...
		return !Alexa.isNewSession(handlerInput.requestEnvelope) &&
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
	},
	handle(handlerInput) {
		// Handle level up
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
			.reprompt('Bee boop') // TODO
			.withShouldEndSession(false)
			.getResponse();
	},
}

const NoIntent: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		// TODO: Also check that round is over...
		return !Alexa.isNewSession(handlerInput.requestEnvelope) &&
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak('Thanks for playing!')
			.withShouldEndSession(true)
			.getResponse();
	},
}

const StopIntent: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return !Alexa.isNewSession(handlerInput.requestEnvelope) &&
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent';
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(`Thanks for playing!`)
			.withShouldEndSession(true)
			.getResponse();
	},
}

export const handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		LaunchRequest,
		AnswerIntent,
		YesIntent,
		NoIntent,
		StopIntent,
		// HelpHandler,
		// ExitHandler,
		FallbackHandler,
		SessionEndedRequestHandler,
	)
	.addErrorHandlers(ErrorHandler)
	.lambda()

process.on('unhandledRejection', error => {
	// Will print "unhandledRejection err is not defined"
	console.error('unhandledRejection', error);
});
