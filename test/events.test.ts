// @ts-nocheck
// nocheck because we intentionally test with objects not conforming to types in source code
import { handler } from '../src'

describe('events', () => {
	const testHandler = (input) => {
		return new Promise((resolve, reject) => {
			handler(input, {}, (err, result) => {
				if (err) {
					return reject(err)
				}

				return resolve(result)
			})
		})
	}

	it('user-initiated exit event', async () => {
		const input = {
			"version": "1.0",
			"session": {
				"new": false,
				"sessionId": "amzn1.echo-api.session.7535ef4c-4cbd-42ca-9f45-7ccd98db7f36",
				"application": {
					"applicationId": "amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d"
				},
				"attributes": {
					"currentRound": {
						"roundNumber": 1,
						"referenceNote": 60,
						"targetNote": 65,
						"intervalDistance": 5
					},
					"level": 1,
					"stats": []
				},
				"user": {
					"userId": "amzn1.ask.account.AGN5YIY47D3D4YOSYFDGIOEAX4RZUUADVSUNRA2KB3RHX6VHES37TP4KQSNOAJVWTZFUIZOGCE547G3JH5P4G4IBA4JXWNZWLZGJTWAFS4DMITP56UXIQDFJFQEXR3PKFGWAMYDLD4ATC77FMN4EDXOR5X7BDX4ZQ2JXD5PRRIMLH3KLMMVOXWO2WVDLXXE753WRCGS7MY6CBGQ"
				}
			},
			"context": {
				"System": {
					"application": {
						"applicationId": "amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d"
					},
					"user": {
						"userId": "amzn1.ask.account.AGN5YIY47D3D4YOSYFDGIOEAX4RZUUADVSUNRA2KB3RHX6VHES37TP4KQSNOAJVWTZFUIZOGCE547G3JH5P4G4IBA4JXWNZWLZGJTWAFS4DMITP56UXIQDFJFQEXR3PKFGWAMYDLD4ATC77FMN4EDXOR5X7BDX4ZQ2JXD5PRRIMLH3KLMMVOXWO2WVDLXXE753WRCGS7MY6CBGQ"
					},
					"device": {
						"deviceId": "amzn1.ask.device.AGPUGKPHH5FCF4QZEWHQZOMN4CZ5DA4FJ2D44VQLQN6VAMXMBHVZUDJBRD7WI2VATOBYXSBE76F3UH36AWOT4X7WBB2WSGEB6BASOD4OLITOJERFC7YG5R7MD7EQFEIP7LDK2PGPHJFT74OTJ4FXAPPCZCHNH2TFEHPGZUXBWV7O3QP7AVA2W",
						"supportedInterfaces": {}
					},
					"apiEndpoint": "https://api.amazonalexa.com",
					"apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmM4ODk4ZGU0LTA1Y2EtNDRmNi04NzEwLTI0YTU2ZTk3OTMzZCIsImV4cCI6MTU3NzMzMjQ3NywiaWF0IjoxNTc3MzMyMTc3LCJuYmYiOjE1NzczMzIxNzcsInByaXZhdGVDbGFpbXMiOnsiY29udGV4dCI6IkFBQUFBQUFBQUFCQkYzOThjV3pYdGtVblRsY3BHT0s3S2dFQUFBQUFBQUNwTjNXL24xYU4zY0dxUUhnYWpwemhEYXBIS0VnelJpSnF1U0pmK3ZTQ2J1N2dYcGVmd3YzY3Z4RjJUcDlId0FVYUVPODN1SHovS2xzRDdQdXFKOUVCakZRRXR1QlN4b1E4bnF3SC9kaXhJM2xRWjJVK2tiZ3NhZlpRbXVJRlBUbEFRNGtpTy8xTERLQ1JzQTN1T0dkaTBxUDdyTWNmcFRUQzZuTkROM3l6T2duSC9RWG4vTVVZUjNQK000cU9HUDV1MlZBRUFLSVVxbVQ4K2gyNXVnZ25tZTdIMVRMUEM2Wjg5c1VOM09YVEh0VWZWUTV0cDV4TVpRdEI0Z1ArV3lwQjNkYjZzRm5oRlNFd0Zpc04xcVRSWlA0VzdwcTc4OGl3MmF6bFo4Tk1XbTJ2MEhpRFAxa2pjWk5qZFd0eVRtNHFDVWRlTGI3Z1VvVkxQSU1qTE9ITHR4OHFPNzlxaVdTSWpBQmFNRWVheXAyNGJZZnZ1dnZvMERVekJPcTFVY20vZm5lZFFodklTNUdRIiwiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUdQVUdLUEhINUZDRjRRWkVXSFFaT01ONENaNURBNEZKMkQ0NFZRTFFONlZBTVhNQkhWWlVESkJSRDdXSTJWQVRPQllYU0JFNzZGM1VIMzZBV09UNFg3V0JCMldTR0VCNkJBU09ENE9MSVRPSkVSRkM3WUc1UjdNRDdFUUZFSVA3TERLMlBHUEhKRlQ3NE9USjRGWEFQUENaQ0hOSDJURkVIUEdaVVhCV1Y3TzNRUDdBVkEyVyIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFHTjVZSVk0N0QzRDRZT1NZRkRHSU9FQVg0UlpVVUFEVlNVTlJBMktCM1JIWDZWSEVTMzdUUDRLUVNOT0FKVldUWkZVSVpPR0NFNTQ3RzNKSDVQNEc0SUJBNEpYV05aV0xaR0pUV0FGUzRETUlUUDU2VVhJUURGSkZRRVhSM1BLRkdXQU1ZRExENEFUQzc3Rk1ONEVEWE9SNVg3QkRYNFpRMkpYRDVQUlJJTUxIM0tMTU1WT1hXTzJXVkRMWFhFNzUzV1JDR1M3TVk2Q0JHUSJ9fQ.SQ9FXK3D6VnIUlm062zIw3TamOsafmLiyL6YCoTUTfs4D5zKQqjIf8MU3fxyh6L3c1XW5ZCjW9nW8wyC6WbvltO1KefkzgstdVLyeP4Q7FoIWNB8bRfByCWGsCX1aVZQHzTvrRkUnk_LMYN5d4JkZPeMrlmLNanP4gunSJOHDXn22WCHZfup8-t-gsNkEeo02ThXib0CuPraCn3GsIogjP3SmUMwGK4Pcvfi_TD9PUs6_49Ui2PkTueqCOHklnPX2smEWHowG4wsmOszdfQ8Bb-ElxVeVsOGwckHm43UIvDlQqoTM5iTIDOZ_yjOZRhcj4SQbj8jXeBOuATG1gm60A"
				},
				"Viewport": {
					"experiences": [
						{
							"arcMinuteWidth": 246,
							"arcMinuteHeight": 144,
							"canRotate": false,
							"canResize": false
						}
					],
					"shape": "RECTANGLE",
					"pixelWidth": 1024,
					"pixelHeight": 600,
					"dpi": 160,
					"currentPixelWidth": 1024,
					"currentPixelHeight": 600,
					"touch": [
						"SINGLE"
					],
					"video": {
						"codecs": [
							"H_264_42",
							"H_264_41"
						]
					}
				},
				"Viewports": [
					{
						"type": "APL",
						"id": "main",
						"shape": "RECTANGLE",
						"dpi": 160,
						"presentationType": "STANDARD",
						"canRotate": false,
						"configuration": {
							"current": {
								"video": {
									"codecs": [
										"H_264_42",
										"H_264_41"
									]
								},
								"size": {
									"type": "DISCRETE",
									"pixelWidth": 1024,
									"pixelHeight": 600
								}
							}
						}
					}
				]
			},
			"request": {
				"type": "SessionEndedRequest",
				"requestId": "amzn1.echo-api.request.e2caa15e-3e22-4ee8-83cc-e6dcaa7e2fed",
				"timestamp": "2019-12-26T03:49:37Z",
				"locale": "en-US",
				"reason": "USER_INITIATED"
			}
		}

		const result = await testHandler(input)
		expect(result).toMatchSnapshot()
	})

	it('interrupt alexa with cancel', async () => {
		const input = {
			"version": "1.0",
			"session": {
				"new": false,
				"sessionId": "amzn1.echo-api.session.16979802-2d72-453c-832d-4c1e040b9594",
				"application": {
					"applicationId": "amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d"
				},
				"attributes": {
					"currentRound": {
						"roundNumber": 1,
						"referenceNote": 60,
						"targetNote": 62,
						"intervalDistance": 2
					},
					"level": 1,
					"stats": []
				},
				"user": {
					"userId": "amzn1.ask.account.AGN5YIY47D3D4YOSYFDGIOEAX4RZUUADVSUNRA2KB3RHX6VHES37TP4KQSNOAJVWTZFUIZOGCE547G3JH5P4G4IBA4JXWNZWLZGJTWAFS4DMITP56UXIQDFJFQEXR3PKFGWAMYDLD4ATC77FMN4EDXOR5X7BDX4ZQ2JXD5PRRIMLH3KLMMVOXWO2WVDLXXE753WRCGS7MY6CBGQ"
				}
			},
			"context": {
				"System": {
					"application": {
						"applicationId": "amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d"
					},
					"user": {
						"userId": "amzn1.ask.account.AGN5YIY47D3D4YOSYFDGIOEAX4RZUUADVSUNRA2KB3RHX6VHES37TP4KQSNOAJVWTZFUIZOGCE547G3JH5P4G4IBA4JXWNZWLZGJTWAFS4DMITP56UXIQDFJFQEXR3PKFGWAMYDLD4ATC77FMN4EDXOR5X7BDX4ZQ2JXD5PRRIMLH3KLMMVOXWO2WVDLXXE753WRCGS7MY6CBGQ"
					},
					"device": {
						"deviceId": "amzn1.ask.device.AGPUGKPHH5FCF4QZEWHQZOMN4CZ5DA4FJ2D44VQLQN6VAMXMBHVZUDJBRD7WI2VATOBYXSBE76F3UH36AWOT4X7WBB2WSGEB6BASOD4OLITOJERFC7YG5R7MD7EQFEIP7LDK2PGPHJFT74OTJ4FXAPPCZCHNH2TFEHPGZUXBWV7O3QP7AVA2W",
						"supportedInterfaces": {}
					},
					"apiEndpoint": "https://api.amazonalexa.com",
					"apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmM4ODk4ZGU0LTA1Y2EtNDRmNi04NzEwLTI0YTU2ZTk3OTMzZCIsImV4cCI6MTU3NzMzNDUxMCwiaWF0IjoxNTc3MzM0MjEwLCJuYmYiOjE1NzczMzQyMTAsInByaXZhdGVDbGFpbXMiOnsiY29udGV4dCI6IkFBQUFBQUFBQUFCQkYzOThjV3pYdGtVblRsY3BHT0s3S2dFQUFBQUFBQUE1SitaNmtrN1dGSzIzWHIwRHlmcGVUbCtPQU1sRy94akpOSU5QTUxhMjczSWVKeEd0bWVvMmd1NU0xUW9MeXlTZm5kV2xWU2R1TC9zekNObmt4eGp4eGtCanlSR0tjYWYzM0hzeWo2Q0MzZnp2aWNON1cvaTJCb05lUXQwb1NOM2JXUlVEV0xEM1NmdmNwWHd4Sk5hQ2ZUREZNcWw2KytRb1JxV2czaHdaWlRSWjV3dzZLTklnK0g5Y2E2TFBBc25Fd2ZKTTNqRHpjVExkd2xDY3Z1YUR4cnRlQ091Y3Z2bk01djQxSllweVNFYVlxamFKa242ZGh6bSs2NUtDNURIdVljNmNQK1JoMXFiV2pEWHI1UTd2Zzc0UTYrMTFEQ0NsalhZbnMvZUxvMzJZZW9hd1JHY1dYZVlyRXNNajRGcWR0bkR5N3ZGdUFBSno4WTdVeVNTaHVoa3k5SXdoY1pVUU1ZazBwdFo5SVhtYlhUdmlQTGF6OS9yNHZDVEVxb2I4a01EcXRaMGw2V0NtIiwiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUdQVUdLUEhINUZDRjRRWkVXSFFaT01ONENaNURBNEZKMkQ0NFZRTFFONlZBTVhNQkhWWlVESkJSRDdXSTJWQVRPQllYU0JFNzZGM1VIMzZBV09UNFg3V0JCMldTR0VCNkJBU09ENE9MSVRPSkVSRkM3WUc1UjdNRDdFUUZFSVA3TERLMlBHUEhKRlQ3NE9USjRGWEFQUENaQ0hOSDJURkVIUEdaVVhCV1Y3TzNRUDdBVkEyVyIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFHTjVZSVk0N0QzRDRZT1NZRkRHSU9FQVg0UlpVVUFEVlNVTlJBMktCM1JIWDZWSEVTMzdUUDRLUVNOT0FKVldUWkZVSVpPR0NFNTQ3RzNKSDVQNEc0SUJBNEpYV05aV0xaR0pUV0FGUzRETUlUUDU2VVhJUURGSkZRRVhSM1BLRkdXQU1ZRExENEFUQzc3Rk1ONEVEWE9SNVg3QkRYNFpRMkpYRDVQUlJJTUxIM0tMTU1WT1hXTzJXVkRMWFhFNzUzV1JDR1M3TVk2Q0JHUSJ9fQ.HxVKdez504QdfqpB8BRoRfIkOf26Eg85EwnwGqUvUSpJcu51NR79-prq_1V5F9GmOUUwnqHw8QGhG548McecKKmwrelfHYuUes3eZMSeV07p95GknSBVJ-62JLbP-TYsVmBJY80P1cCFYderoWdkOmjdu6ltZa_igZF4aXtJMr6VsQGcA9e7DSR-Tsp59PYmLOzi9XIqNu9_wn1TOrKCvKKVlQtzjaaPCCJeoQY7iWmnZ4dyfZXchCl0ZAtg04kNty26WwyXto0W-ndIamsZUG090iBeWdDDjpnWY15NaWS-7Z83rDqMd2qNMT69aBkyAsV9qC_bQmQvIpnQ8iqU2g"
				},
				"Viewport": {
					"experiences": [
						{
							"arcMinuteWidth": 246,
							"arcMinuteHeight": 144,
							"canRotate": false,
							"canResize": false
						}
					],
					"shape": "RECTANGLE",
					"pixelWidth": 1024,
					"pixelHeight": 600,
					"dpi": 160,
					"currentPixelWidth": 1024,
					"currentPixelHeight": 600,
					"touch": [
						"SINGLE"
					],
					"video": {
						"codecs": [
							"H_264_42",
							"H_264_41"
						]
					}
				},
				"Viewports": [
					{
						"type": "APL",
						"id": "main",
						"shape": "RECTANGLE",
						"dpi": 160,
						"presentationType": "STANDARD",
						"canRotate": false,
						"configuration": {
							"current": {
								"video": {
									"codecs": [
										"H_264_42",
										"H_264_41"
									]
								},
								"size": {
									"type": "DISCRETE",
									"pixelWidth": 1024,
									"pixelHeight": 600
								}
							}
						}
					}
				]
			},
			"request": {
				"type": "IntentRequest",
				"requestId": "amzn1.echo-api.request.b96dfcd9-f149-4df9-8f1f-4add5bcd96fd",
				"timestamp": "2019-12-26T04:23:30Z",
				"locale": "en-US",
				"intent": {
					"name": "AMAZON.CancelIntent",
					"confirmationStatus": "NONE"
				}
			}
		}

		const result = await testHandler(input)
		expect(result).toMatchSnapshot()
	})

	it('answer handler non-match', async () => {
		const input = {
			"version": "1.0",
			"session": {
				"new": false,
				"sessionId": "amzn1.echo-api.session.c8c1a096-f798-4961-8fe7-dbab6ae4a619",
				"application": {
					"applicationId": "amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d"
				},
				"attributes": {
					"level": 3,
					"stats": [
						{
							"guess": 9,
							"answer": 9
						},
						{
							"guess": 11,
							"answer": 11
						},
						{
							"guess": 2,
							"answer": 2
						},
						{
							"guess": 4,
							"answer": 4
						},
						{
							"guess": 0,
							"answer": 0
						}
					]
				},
				"user": {
					"userId": "amzn1.ask.account.AGN5YIY47D3D4YOSYFDGIOEAX4RZUUADVSUNRA2KB3RHX6VHES37TP4KQSNOAJVWTZFUIZOGCE547G3JH5P4G4IBA4JXWNZWLZGJTWAFS4DMITP56UXIQDFJFQEXR3PKFGWAMYDLD4ATC77FMN4EDXOR5X7BDX4ZQ2JXD5PRRIMLH3KLMMVOXWO2WVDLXXE753WRCGS7MY6CBGQ"
				}
			},
			"context": {
				"System": {
					"application": {
						"applicationId": "amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d"
					},
					"user": {
						"userId": "amzn1.ask.account.AGN5YIY47D3D4YOSYFDGIOEAX4RZUUADVSUNRA2KB3RHX6VHES37TP4KQSNOAJVWTZFUIZOGCE547G3JH5P4G4IBA4JXWNZWLZGJTWAFS4DMITP56UXIQDFJFQEXR3PKFGWAMYDLD4ATC77FMN4EDXOR5X7BDX4ZQ2JXD5PRRIMLH3KLMMVOXWO2WVDLXXE753WRCGS7MY6CBGQ"
					},
					"device": {
						"deviceId": "amzn1.ask.device.AGPUGKPHH5FCF4QZEWHQZOMN4CZ5DA4FJ2D44VQLQN6VAMXMBHVZUDJBRD7WI2VATOBYXSBE76F3UH36AWOT4X7WBB2WSGEB6BASOD4OLITOJERFC7YG5R7MD7EQFEIP7LDK2PGPHJFT74OTJ4FXAPPCZCHNH2TFEHPGZUXBWV7O3QP7AVA2W",
						"supportedInterfaces": {}
					},
					"apiEndpoint": "https://api.amazonalexa.com",
					"apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmM4ODk4ZGU0LTA1Y2EtNDRmNi04NzEwLTI0YTU2ZTk3OTMzZCIsImV4cCI6MTU3NzMzNzY5MCwiaWF0IjoxNTc3MzM3MzkwLCJuYmYiOjE1NzczMzczOTAsInByaXZhdGVDbGFpbXMiOnsiY29udGV4dCI6IkFBQUFBQUFBQUFCQkYzOThjV3pYdGtVblRsY3BHT0s3S2dFQUFBQUFBQUNlVnM3L3RUSEY4aVVXYUc1ZE1GVVV0U0duWGUxYUw5clVjWkxTU3NCL2ZPT1lHSUZlRjI0RXQ1T05lK0RsbHI2WDNsV0FyQmNiWU5tN1JYeE5qblRIVThVV2hHVWZxNEpCT0FwbkhJQ0FDVDJxQm1PTWdzeHU2MzRWaVRPc0RDdkZKMzRBNC9waFdEQ2dTR240TFRuQzZvY3V1U2pLb3NFeWt0WTNvL21QTGVqZmpaU0w0amhMTFpFOVJsZVVhRzExd0E1eE9GdlgxbEh6bDRHTG1JRzA0b0ZOQkplNXlqa0ozQmowUlRhWEJoQWI3V2IyelRER2xkQ2dPbnRWQ2RtRC9KRWdxVnNibk1YVjRqMldXS0FPQ0xOdDREbjBzWFQ1M25RZjJpR1ZobTFnWFoxaVpUbFNUczZNQnl3MVh4RXZZaXk2RjEyeHluWWk0aTNDVG1HZXFUVVdYWFZPNEhGb1dmcVQ3bStVRUd3aFQzMkNOcE5nOU1pWXpvQ1lKV1lMcERxRFU2bjNzQ2txIiwiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUdQVUdLUEhINUZDRjRRWkVXSFFaT01ONENaNURBNEZKMkQ0NFZRTFFONlZBTVhNQkhWWlVESkJSRDdXSTJWQVRPQllYU0JFNzZGM1VIMzZBV09UNFg3V0JCMldTR0VCNkJBU09ENE9MSVRPSkVSRkM3WUc1UjdNRDdFUUZFSVA3TERLMlBHUEhKRlQ3NE9USjRGWEFQUENaQ0hOSDJURkVIUEdaVVhCV1Y3TzNRUDdBVkEyVyIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFHTjVZSVk0N0QzRDRZT1NZRkRHSU9FQVg0UlpVVUFEVlNVTlJBMktCM1JIWDZWSEVTMzdUUDRLUVNOT0FKVldUWkZVSVpPR0NFNTQ3RzNKSDVQNEc0SUJBNEpYV05aV0xaR0pUV0FGUzRETUlUUDU2VVhJUURGSkZRRVhSM1BLRkdXQU1ZRExENEFUQzc3Rk1ONEVEWE9SNVg3QkRYNFpRMkpYRDVQUlJJTUxIM0tMTU1WT1hXTzJXVkRMWFhFNzUzV1JDR1M3TVk2Q0JHUSJ9fQ.gZfMg2gv7SudtNMv5mFdu0R37Usra10Cds8X2D2p04vTEKztLUnZUIjNt3G8QkSudeIyAElJagNgyUnT5zZx0utaQe4oc4E7rnZDke1b6JXoB5OUpOQIOg4FXVJg6x8zabEMfaQOncEGzcnd13wBvPBm4HFT5UlMbkF_XEpDq1XvlTPnTG_h6yawatY94t3jrHhVY39kwSYYxjPTcxj-CgSwGdRfken75U5OroREIE7GxIHMCWCFIlm6DhwJ_j99HnwjYUJoALYzcakO3LLh4eQqReWWinNFXkmM0lpap4b9m8fZ0YOVJKunXzQzhxFqnyumzYOY7xap8_EJp_ySxg"
				},
				"Viewport": {
					"experiences": [
						{
							"arcMinuteWidth": 246,
							"arcMinuteHeight": 144,
							"canRotate": false,
							"canResize": false
						}
					],
					"shape": "RECTANGLE",
					"pixelWidth": 1024,
					"pixelHeight": 600,
					"dpi": 160,
					"currentPixelWidth": 1024,
					"currentPixelHeight": 600,
					"touch": [
						"SINGLE"
					],
					"video": {
						"codecs": [
							"H_264_42",
							"H_264_41"
						]
					}
				},
				"Viewports": [
					{
						"type": "APL",
						"id": "main",
						"shape": "RECTANGLE",
						"dpi": 160,
						"presentationType": "STANDARD",
						"canRotate": false,
						"configuration": {
							"current": {
								"video": {
									"codecs": [
										"H_264_42",
										"H_264_41"
									]
								},
								"size": {
									"type": "DISCRETE",
									"pixelWidth": 1024,
									"pixelHeight": 600
								}
							}
						}
					}
				]
			},
			"request": {
				"type": "IntentRequest",
				"requestId": "amzn1.echo-api.request.d40e1096-9bf1-4bfe-a15c-ac25114c05a9",
				"timestamp": "2019-12-26T05:16:30Z",
				"locale": "en-US",
				"intent": {
					"name": "AnswerIntent",
					"confirmationStatus": "NONE",
					"slots": {
						"intervalName": {
							"name": "intervalName",
							"value": "uh-huh",
							"resolutions": {
								"resolutionsPerAuthority": [
									{
										"authority": "amzn1.er-authority.echo-sdk.amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d.IntervalName",
										"status": {
											"code": "ER_SUCCESS_NO_MATCH"
										}
									}
								]
							},
							"confirmationStatus": "NONE",
							"source": "USER"
						}
					}
				}
			}
		}

		expect.assertions(1)
		await expect(testHandler(input)).rejects.toThrowError('Fallback handler invoked request')
	})

	it('go to level 100', async () => {
		const input = {
			"version": "1.0",
			"session": {
				"new": true,
				"sessionId": "amzn1.echo-api.session.92b23b27-9315-4249-bb05-e7a6f2fd08ff",
				"application": {
					"applicationId": "amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d"
				},
				"user": {
					"userId": "amzn1.ask.account.AGN5YIY47D3D4YOSYFDGIOEAX4RZUUADVSUNRA2KB3RHX6VHES37TP4KQSNOAJVWTZFUIZOGCE547G3JH5P4G4IBA4JXWNZWLZGJTWAFS4DMITP56UXIQDFJFQEXR3PKFGWAMYDLD4ATC77FMN4EDXOR5X7BDX4ZQ2JXD5PRRIMLH3KLMMVOXWO2WVDLXXE753WRCGS7MY6CBGQ"
				}
			},
			"context": {
				"System": {
					"application": {
						"applicationId": "amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d"
					},
					"user": {
						"userId": "amzn1.ask.account.AGN5YIY47D3D4YOSYFDGIOEAX4RZUUADVSUNRA2KB3RHX6VHES37TP4KQSNOAJVWTZFUIZOGCE547G3JH5P4G4IBA4JXWNZWLZGJTWAFS4DMITP56UXIQDFJFQEXR3PKFGWAMYDLD4ATC77FMN4EDXOR5X7BDX4ZQ2JXD5PRRIMLH3KLMMVOXWO2WVDLXXE753WRCGS7MY6CBGQ"
					},
					"device": {
						"deviceId": "amzn1.ask.device.AGPUGKPHH5FCF4QZEWHQZOMN4CZ5DA4FJ2D44VQLQN6VAMXMBHVZUDJBRD7WI2VATOBYXSBE76F3UH36AWOT4X7WBB2WSGEB6BASOD4OLITOJERFC7YG5R7MD7EQFEIP7LDK2PGPHJFT74OTJ4FXAPPCZCHNH2TFEHPGZUXBWV7O3QP7AVA2W",
						"supportedInterfaces": {}
					},
					"apiEndpoint": "https://api.amazonalexa.com",
					"apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmM4ODk4ZGU0LTA1Y2EtNDRmNi04NzEwLTI0YTU2ZTk3OTMzZCIsImV4cCI6MTU3NzQyNzc2NSwiaWF0IjoxNTc3NDI3NDY1LCJuYmYiOjE1Nzc0Mjc0NjUsInByaXZhdGVDbGFpbXMiOnsiY29udGV4dCI6IkFBQUFBQUFBQUFBM25rOG5QcWhLRUl3b0s4NEFubndqS2dFQUFBQUFBQUFpUWxlZmk3T2VpZFJTb1BvMEJhVFFTc2NNOXNEb3RSaUw2VE9OMzVlMUpORzFxdXFJVzBJdENiSzJKNmRQcHhCMEdCS0JNMGZ3WjlIRi9Ka3pjYlg2Zlltc0M5SzdHNWtWaE0raXRwaWdkN1g2RHIwMkFUc2ZTKytmNUJBQjc0OVFUWmY3L2VZdTYySnJWSzAyTVBPSHdScXN3a0R3NHltMFhTQmUxdXlqZHBVWnJYbzdSTEYzQU00WVBtNnJNbU5kRkZLUERNck1RZGUvYURoZ3U2RHJYcjBTb2NtSmx3NUlIQW5VeGxmQ0QyYllLZFR6S3FHYTV2SUs1NTFQQzNGMHdteVg4ekE0eXAzMWF4RytxNThCZjlDUlNWZkNxcDNNQUF2NWh0ZlZJMDdFaFVkSzYxRC9ZYVp3Q0lYam1nUnAvTWZFUXlDZG5oODdZbkhzNlJ4OE5lNmxWR1o4UXJmeHUzVlFkWTY3emZtQmNLSWlqOXA5YkIyRXYrNDROejVpS0hHU1JPMnpvaGM5IiwiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUdQVUdLUEhINUZDRjRRWkVXSFFaT01ONENaNURBNEZKMkQ0NFZRTFFONlZBTVhNQkhWWlVESkJSRDdXSTJWQVRPQllYU0JFNzZGM1VIMzZBV09UNFg3V0JCMldTR0VCNkJBU09ENE9MSVRPSkVSRkM3WUc1UjdNRDdFUUZFSVA3TERLMlBHUEhKRlQ3NE9USjRGWEFQUENaQ0hOSDJURkVIUEdaVVhCV1Y3TzNRUDdBVkEyVyIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFHTjVZSVk0N0QzRDRZT1NZRkRHSU9FQVg0UlpVVUFEVlNVTlJBMktCM1JIWDZWSEVTMzdUUDRLUVNOT0FKVldUWkZVSVpPR0NFNTQ3RzNKSDVQNEc0SUJBNEpYV05aV0xaR0pUV0FGUzRETUlUUDU2VVhJUURGSkZRRVhSM1BLRkdXQU1ZRExENEFUQzc3Rk1ONEVEWE9SNVg3QkRYNFpRMkpYRDVQUlJJTUxIM0tMTU1WT1hXTzJXVkRMWFhFNzUzV1JDR1M3TVk2Q0JHUSJ9fQ.VEosLlV41HgnRq-0YAh4PBRESMpL2HvqWW--p65vYeP0Zh7KMWpt9XAT4bNq2qaMYrhe2bwu60w_dGl8AZpWHEz8piME6kQ8KE-ua8rAeB8ds6CeYscXLOHAGVyr12iwIEvjttYiBHmpEWQgIUNE39ye5B0BDg2PiUZGy4EKfFM9jtwoKO0h16G_CfshxuoEmGp8VTyVvb0Dr6iI9ORP_gwwYzRQtzXD-jSjNXWvafDFNAIliN2TfTRw8kmdSReEmEYhQH4uzxZOA2ElCuakaXhnAd__pUDx-OxEI82ItQBCnVytUCKcvgX0wF3ILC_EEzgWo4RIBIoraaeLtQA90g"
				},
				"Viewport": {
					"experiences": [
						{
							"arcMinuteWidth": 246,
							"arcMinuteHeight": 144,
							"canRotate": false,
							"canResize": false
						}
					],
					"shape": "RECTANGLE",
					"pixelWidth": 1024,
					"pixelHeight": 600,
					"dpi": 160,
					"currentPixelWidth": 1024,
					"currentPixelHeight": 600,
					"touch": [
						"SINGLE"
					],
					"video": {
						"codecs": [
							"H_264_42",
							"H_264_41"
						]
					}
				},
				"Viewports": [
					{
						"type": "APL",
						"id": "main",
						"shape": "RECTANGLE",
						"dpi": 160,
						"presentationType": "STANDARD",
						"canRotate": false,
						"configuration": {
							"current": {
								"video": {
									"codecs": [
										"H_264_42",
										"H_264_41"
									]
								},
								"size": {
									"type": "DISCRETE",
									"pixelWidth": 1024,
									"pixelHeight": 600
								}
							}
						}
					}
				]
			},
			"request": {
				"type": "IntentRequest",
				"requestId": "amzn1.echo-api.request.805957c2-c891-47c6-a82c-bc53c40e20cd",
				"timestamp": "2019-12-27T06:17:45Z",
				"locale": "en-US",
				"intent": {
					"name": "ChooseLevelIntent",
					"confirmationStatus": "NONE",
					"slots": {
						"levelNumber": {
							"name": "levelNumber",
							"value": "100",
							"confirmationStatus": "NONE",
							"source": "USER"
						}
					}
				}
			}
		}

		const result = await testHandler(input)
		expect(result).toMatchSnapshot()
	})
})
