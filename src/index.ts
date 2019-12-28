import * as Alexa from 'ask-sdk-core'

import { SessionEndedRequestHandler } from './handlers/SessionEndedRequestHandler';
import { NextLevelHandler } from './handlers/NextLevelHandler';
import { ExitHandler } from './handlers/ExitHandler';
import { RepeatQuestionHandler } from './handlers/RepeatQuestionHandler';
import { ChooseLevelHandler } from './handlers/ChooseLevelHandler';
import { ErrorHandler } from './handlers/ErrorHandler';
import { FallbackHandler } from './handlers/FallbackHandler';
import { LaunchRequest } from './handlers/LaunchRequest';
import { AnswerHandler } from './handlers/AnswerHandler';
import { HelpHandler } from './handlers/HelpHandler'

export const handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		LaunchRequest,
		NextLevelHandler,
		RepeatQuestionHandler,
		ExitHandler,
		ChooseLevelHandler,
		HelpHandler,
		AnswerHandler, // This must be the last non-generic input handler, because Alexa maps other phrases to our slot values.
		// HelpHandler,
		SessionEndedRequestHandler,
		FallbackHandler,
	)
	.addErrorHandlers(ErrorHandler)
	.lambda()

process.on('unhandledRejection', error => {
	console.error('unhandledRejection', error);
	throw error
});
