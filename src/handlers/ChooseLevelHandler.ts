import * as Alexa from 'ask-sdk-core'

import { getNewGame } from '../game';
import { GameSessionManager } from '../GameSessionManager';
import { getLevelByNumber } from '../levels';
import * as speech from '../speech'

export const ChooseLevelHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseLevelIntent';
	},
	handle(handlerInput) {
		const gameSessionManager = new GameSessionManager(handlerInput);
		const levelString = Alexa.getSlot(handlerInput.requestEnvelope, 'levelNumber').value;
		if (typeof levelString !== 'string') {
			throw new Error(`Unexpected levelNumber value on ${Alexa.getSlot(handlerInput.requestEnvelope, 'levelNumber')}`);
		}
		const levelNumber = parseInt(levelString);
		if (Number.isNaN(levelNumber)) {
			throw new Error(`Unable to parse level input '${levelString}'`);
		}
		if (!getLevelByNumber(levelNumber)) {
			return handlerInput.responseBuilder
				.speak(speech.invalidLevel())
				.withShouldEndSession(false)
				.getResponse();
		}
		const gameSession = getNewGame(levelNumber);
		gameSessionManager.setSession(gameSession);
		return handlerInput.responseBuilder
			.speak(speech.compose(speech.levelIntroduction(levelNumber), speech.question(gameSession.currentRound, levelNumber)))
			.reprompt(speech.question(gameSession.currentRound, levelNumber))
			.withShouldEndSession(false)
			.getResponse();
	},
};
