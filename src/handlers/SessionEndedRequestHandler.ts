import * as Alexa from 'ask-sdk-core'

export const SessionEndedRequestHandler: Alexa.RequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},
	handle(handlerInput) {
		// TODO
		// @ts-ignore
		console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
		return handlerInput.responseBuilder.getResponse();
	},
};
