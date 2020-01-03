import * as Alexa from 'ask-sdk-core'

import * as speech from '../speech'
import { isTestEnvironment, GameSessionManager } from "../utils";

export const FallbackHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		if (isTestEnvironment()) {
			throw new Error(`Fallback handler invoked request: ${Alexa.getRequestType(handlerInput.requestEnvelope)}, intent: ${Alexa.getIntentName(handlerInput.requestEnvelope)}!`);
		}
		return true;
	},
	handle(handlerInput) {
		const gameSession = new GameSessionManager(handlerInput).getSession()

		return handlerInput.responseBuilder
			// TODO: Move level in progress fallback to AnswerHandler.ts > LevelInProgressFallback
			.speak(gameSession.state === 'LEVEL_IN_PROGRESS' ? speech.compose(
				speech.intervalNameHelp(),
				speech.question(gameSession.currentRound, gameSession.level)
			) : speech.genericFallback())
			.getResponse();
	}
};
