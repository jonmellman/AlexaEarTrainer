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
import { getLevelByNumber } from './levels';

const AnswerHandler: RequestHandler = {
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

const LaunchRequest: RequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest' ||
			false // NewGameHandler
	},
	async handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput)
		const levelNumber = 1

		const gameSession = getNewGame(levelNumber)
		gameSessionManager.setSession(gameSession)

		return handlerInput.responseBuilder
			.speak(speech.compose(
				speech.welcome(),
				speech.levelIntroduction(levelNumber),
				speech.question(gameSession.currentRound, levelNumber)
			))
			.reprompt(speech.question(gameSession.currentRound, levelNumber))
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
		return handlerInput.responseBuilder
			.speak(speech.compose(
				'Fallback handler',
				Alexa.getRequestType(handlerInput.requestEnvelope),
				Alexa.getIntentName(handlerInput.requestEnvelope)
			))
			// TODO: implement
			// .speak(speech.compose(
			// 	'Whoops, can you rephrase that?'
			// ))
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
			new GameSessionManager(handlerInput).getSession().state === 'LEVEL_COMPLETE' &&
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent'
	},
	handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput)
		const levelNumber = gameSessionManager.getSession().level + 1

		const gameSession = getNewGame(levelNumber)
		gameSessionManager.setSession(gameSession)

		return handlerInput.responseBuilder
			.speak(speech.compose(
				speech.levelIntroduction(levelNumber),
				speech.question(gameSession.currentRound, levelNumber)
			))
			.reprompt(speech.question(gameSession.currentRound, levelNumber))
			.withShouldEndSession(false)
			.getResponse();
	},
}

const StopHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		const requestType = Alexa.getRequestType(handlerInput.requestEnvelope)
		const isIntentWithName = (name: string): boolean => {
			return requestType === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === name
		}

		return isIntentWithName('AMAZON.StopIntent') || isIntentWithName('AMAZON.CancelIntent') || (
				// Round is over and user said no to continuing
				!Alexa.isNewSession(handlerInput.requestEnvelope) &&
				new GameSessionManager(handlerInput).getSession().state === 'LEVEL_COMPLETE' &&
				isIntentWithName('AMAZON.NoIntent')
			)
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(speech.goodbye())
			.withShouldEndSession(true)
			.getResponse();
	},
}

const RepeatQuestionHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return !Alexa.isNewSession(handlerInput.requestEnvelope) &&
			new GameSessionManager(handlerInput).getSession().state === 'LEVEL_IN_PROGRESS' &&
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent'
	},
	handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput)
		const gameSession = gameSessionManager.getSession()

		if (gameSession.state !== 'LEVEL_IN_PROGRESS') {
			throw new Error('Asked to repeat a question, but no level in progress')
		}

		return handlerInput.responseBuilder
			.speak(speech.question(gameSession.currentRound, gameSession.level))
			.withShouldEndSession(false)
			.getResponse();
	},
}

const ChooseLevelHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseLevelIntent'
	},
	handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput)

		const levelString = Alexa.getSlot(handlerInput.requestEnvelope, 'levelNumber').value

		if (typeof levelString !== 'string') {
			throw new Error(`Unexpected levelNumber value on ${Alexa.getSlot(handlerInput.requestEnvelope, 'levelNumber')}`)
		}

		const levelNumber = parseInt(levelString)

		if (Number.isNaN(levelNumber)) {
			throw new Error(`Unable to parse level input '${levelString}'`)
		}

		try {
			getLevelByNumber(levelNumber)
		} catch(e) {


			return handlerInput.responseBuilder
				.speak(speech.invalidLevel())
				.withShouldEndSession(false)
				.getResponse();
		}

		const gameSession = getNewGame(levelNumber)
		gameSessionManager.setSession(gameSession)

		return handlerInput.responseBuilder
			.speak(speech.compose(
				speech.levelIntroduction(levelNumber),
				speech.question(gameSession.currentRound, levelNumber)
			))
			.reprompt(speech.question(gameSession.currentRound, levelNumber))
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
		ChooseLevelHandler,
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
