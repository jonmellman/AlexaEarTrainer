import * as Alexa from 'ask-sdk-core'

import * as speech from '../speech'

export const HelpHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
			Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(speech.help())
			.withSimpleCard(speech.helpCardTitle(), speech.helpCardContent())
			.withShouldEndSession(Alexa.isNewSession(handlerInput.requestEnvelope))
			.getResponse();
	},
};
