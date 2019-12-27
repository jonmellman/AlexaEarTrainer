import * as Alexa from 'ask-sdk-core'

import * as speech from '../speech'
import { isTestEnvironment } from "../utils";

export const FallbackHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		if (isTestEnvironment()) {
			throw new Error(`Fallback handler invoked request: ${Alexa.getRequestType(handlerInput.requestEnvelope)}, intent: ${Alexa.getIntentName(handlerInput.requestEnvelope)}!`);
		}
		return true;
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(speech.compose('Fallback handler', Alexa.getRequestType(handlerInput.requestEnvelope), Alexa.getIntentName(handlerInput.requestEnvelope)))
			// TODO: implement
			// .speak(speech.compose(
			// 	'Whoops, can you rephrase that?'
			// ))
			.getResponse();
	}
};
