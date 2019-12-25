import * as Alexa from 'ask-sdk-core'
import {
	GameSession
} from './game'

// Wrap AttribuetsManager so we can type the attributes as GameSession
export class GameSessionManager {
	constructor(readonly handlerInput: Alexa.HandlerInput) { }

	public getSession(): GameSession {
		return this.handlerInput.attributesManager.getSessionAttributes()
	}

	public setSession(gameSession: GameSession): void {
		return this.handlerInput.attributesManager.setSessionAttributes(gameSession)
	}
}
