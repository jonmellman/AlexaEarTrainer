import * as Alexa from 'ask-sdk-core'

import { isTestEnvironment } from "../utils";

export const ErrorHandler: Alexa.ErrorHandler = {
	canHandle() {
		// Unhandled errors in tests are easier to debug
		return !isTestEnvironment();
	},
	handle(handlerInput, error) {
		console.log(`Error handled: ${error.stack}`);
		const speechOutput = error.stack || 'No stack trace';
		const repromptText = speechOutput;
		return handlerInput.responseBuilder
			.speak(speechOutput)
			.reprompt(repromptText)
			.getResponse();
	},
};
