import * as Alexa from 'ask-sdk-core'

import * as speech from '../speech'
import { GameSessionManager } from '../utils'

export const RepeatQuestionHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return !Alexa.isNewSession(handlerInput.requestEnvelope) &&
			new GameSessionManager(handlerInput).getSession().state === 'LEVEL_IN_PROGRESS' &&
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
	},
	handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput);
		const gameSession = gameSessionManager.getSession();
		if (gameSession.state !== 'LEVEL_IN_PROGRESS') {
			throw new Error('Asked to repeat a question, but no level in progress');
		}
		return handlerInput.responseBuilder
			.speak(speech.question(gameSession.currentRound, gameSession.level))
			.withShouldEndSession(false)
			.getResponse();
	},
};
