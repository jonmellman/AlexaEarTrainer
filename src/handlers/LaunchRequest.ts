import * as Alexa from 'ask-sdk-core'

import { RequestHandler } from 'ask-sdk-core';
import { getNewGame } from '../game/state';
import { GameSessionManager } from '../utils'
import * as speech from '../speech'

export const LaunchRequest: RequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest' ||
			false; // NewGameHandler
	},
	async handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput);
		const levelNumber = 1;
		const gameSession = getNewGame(levelNumber);
		gameSessionManager.setSession(gameSession);
		return handlerInput.responseBuilder
			.speak(speech.compose(speech.welcome(), speech.levelIntroduction(levelNumber), speech.question(gameSession.currentRound, levelNumber)))
			.reprompt(speech.question(gameSession.currentRound, levelNumber))
			.withShouldEndSession(false)
			.getResponse();
	},
};
