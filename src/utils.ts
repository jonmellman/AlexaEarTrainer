import * as Alexa from 'ask-sdk-core'
import {
	GameState
} from './game/state'

// Wrap AttribuetsManager as a new utility so we can type the attributes as GameSession.
export class GameSessionManager {
	constructor(readonly handlerInput: Alexa.HandlerInput) { }

	public getSession(): GameState {
		return this.handlerInput.attributesManager.getSessionAttributes()
	}

	public setSession(gameSession: GameState): void {
		return this.handlerInput.attributesManager.setSessionAttributes(gameSession)
	}
}

export const isTestEnvironment = (): boolean => process.env.JEST_WORKER_ID !== undefined;
