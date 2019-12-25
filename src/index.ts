import Alexa from 'ask-sdk-core'
import {
	RequestHandler,
} from 'ask-sdk-core';

const skillBuilder = Alexa.SkillBuilders.custom();

const LaunchRequest: RequestHandler = {
	canHandle(handlerInput) {
		return Alexa.isNewSession(handlerInput.requestEnvelope) ||
			Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
	},
	async handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak('Welcome to ear trainer. What level would you like to play?')
			.reprompt('What level dawg?')
			.getResponse();
	},
};


export const handler = skillBuilder
	.addRequestHandlers(
		LaunchRequest,
		// HelpHandler,
		// ExitHandler,
		// FallbackHandler,
		// SessionEndedRequestHandler,
	)
	// .addErrorHandlers(ErrorHandler)
	.lambda();
