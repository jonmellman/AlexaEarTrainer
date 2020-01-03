import * as Alexa from 'ask-sdk-core'

import * as speech from '../speech'
import { getNewGame } from '../game/state';
import { GameSessionManager } from '../utils'

export const NextLevelHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return !Alexa.isNewSession(handlerInput.requestEnvelope) &&
			new GameSessionManager(handlerInput).getSession().state === 'LEVEL_COMPLETE' &&
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
	},
	handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput);
		const previousGameSession = gameSessionManager.getSession()

		if (previousGameSession.state !== 'LEVEL_COMPLETE') {
			throw new Error(`NextLevelHandler called when game state is ${gameSessionManager.getSession().state}`)
		}

		const levelNumber = gameSessionManager.getSession().level + (previousGameSession.passed ? 1 : 0) // Increment level if they were presented with the next level
		const gameSession = getNewGame(levelNumber);
		gameSessionManager.setSession(gameSession);

		return handlerInput.responseBuilder
			.speak(speech.compose(speech.levelIntroduction(levelNumber), speech.question(gameSession.currentRound, levelNumber)))
			.reprompt(speech.question(gameSession.currentRound, levelNumber))
			.withShouldEndSession(false)
			.getResponse();
	},
};
