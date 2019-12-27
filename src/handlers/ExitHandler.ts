import * as Alexa from 'ask-sdk-core'

import * as speech from '../speech'
import { GameSessionManager } from '../utils'

export const ExitHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		const requestType = Alexa.getRequestType(handlerInput.requestEnvelope);
		const isIntentWithName = (name: string): boolean => {
			return requestType === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === name;
		};
		return isIntentWithName('AMAZON.StopIntent') || isIntentWithName('AMAZON.CancelIntent') || (
			// Round is over and user said no to continuing
			!Alexa.isNewSession(handlerInput.requestEnvelope) &&
			new GameSessionManager(handlerInput).getSession().state === 'LEVEL_COMPLETE' &&
			isIntentWithName('AMAZON.NoIntent'));
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(speech.goodbye())
			.withShouldEndSession(true)
			.getResponse();
	},
};
