// const { handler } = require('./src')

// handler({
// 	"version": "1.0",
// 	"session": {
// 		"new": false,
// 		"sessionId": "amzn1.echo-api.session.7535ef4c-4cbd-42ca-9f45-7ccd98db7f36",
// 		"application": {
// 			"applicationId": "amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d"
// 		},
// 		"attributes": {
// 			"currentRound": {
// 				"roundNumber": 1,
// 				"referenceNote": 60,
// 				"targetNote": 65,
// 				"intervalDistance": 5
// 			},
// 			"level": 1,
// 			"stats": []
// 		},
// 		"user": {
// 			"userId": "amzn1.ask.account.AGN5YIY47D3D4YOSYFDGIOEAX4RZUUADVSUNRA2KB3RHX6VHES37TP4KQSNOAJVWTZFUIZOGCE547G3JH5P4G4IBA4JXWNZWLZGJTWAFS4DMITP56UXIQDFJFQEXR3PKFGWAMYDLD4ATC77FMN4EDXOR5X7BDX4ZQ2JXD5PRRIMLH3KLMMVOXWO2WVDLXXE753WRCGS7MY6CBGQ"
// 		}
// 	},
// 	"context": {
// 		"System": {
// 			"application": {
// 				"applicationId": "amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d"
// 			},
// 			"user": {
// 				"userId": "amzn1.ask.account.AGN5YIY47D3D4YOSYFDGIOEAX4RZUUADVSUNRA2KB3RHX6VHES37TP4KQSNOAJVWTZFUIZOGCE547G3JH5P4G4IBA4JXWNZWLZGJTWAFS4DMITP56UXIQDFJFQEXR3PKFGWAMYDLD4ATC77FMN4EDXOR5X7BDX4ZQ2JXD5PRRIMLH3KLMMVOXWO2WVDLXXE753WRCGS7MY6CBGQ"
// 			},
// 			"device": {
// 				"deviceId": "amzn1.ask.device.AGPUGKPHH5FCF4QZEWHQZOMN4CZ5DA4FJ2D44VQLQN6VAMXMBHVZUDJBRD7WI2VATOBYXSBE76F3UH36AWOT4X7WBB2WSGEB6BASOD4OLITOJERFC7YG5R7MD7EQFEIP7LDK2PGPHJFT74OTJ4FXAPPCZCHNH2TFEHPGZUXBWV7O3QP7AVA2W",
// 				"supportedInterfaces": {}
// 			},
// 			"apiEndpoint": "https://api.amazonalexa.com",
// 			"apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmM4ODk4ZGU0LTA1Y2EtNDRmNi04NzEwLTI0YTU2ZTk3OTMzZCIsImV4cCI6MTU3NzMzMjQ3NywiaWF0IjoxNTc3MzMyMTc3LCJuYmYiOjE1NzczMzIxNzcsInByaXZhdGVDbGFpbXMiOnsiY29udGV4dCI6IkFBQUFBQUFBQUFCQkYzOThjV3pYdGtVblRsY3BHT0s3S2dFQUFBQUFBQUNwTjNXL24xYU4zY0dxUUhnYWpwemhEYXBIS0VnelJpSnF1U0pmK3ZTQ2J1N2dYcGVmd3YzY3Z4RjJUcDlId0FVYUVPODN1SHovS2xzRDdQdXFKOUVCakZRRXR1QlN4b1E4bnF3SC9kaXhJM2xRWjJVK2tiZ3NhZlpRbXVJRlBUbEFRNGtpTy8xTERLQ1JzQTN1T0dkaTBxUDdyTWNmcFRUQzZuTkROM3l6T2duSC9RWG4vTVVZUjNQK000cU9HUDV1MlZBRUFLSVVxbVQ4K2gyNXVnZ25tZTdIMVRMUEM2Wjg5c1VOM09YVEh0VWZWUTV0cDV4TVpRdEI0Z1ArV3lwQjNkYjZzRm5oRlNFd0Zpc04xcVRSWlA0VzdwcTc4OGl3MmF6bFo4Tk1XbTJ2MEhpRFAxa2pjWk5qZFd0eVRtNHFDVWRlTGI3Z1VvVkxQSU1qTE9ITHR4OHFPNzlxaVdTSWpBQmFNRWVheXAyNGJZZnZ1dnZvMERVekJPcTFVY20vZm5lZFFodklTNUdRIiwiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUdQVUdLUEhINUZDRjRRWkVXSFFaT01ONENaNURBNEZKMkQ0NFZRTFFONlZBTVhNQkhWWlVESkJSRDdXSTJWQVRPQllYU0JFNzZGM1VIMzZBV09UNFg3V0JCMldTR0VCNkJBU09ENE9MSVRPSkVSRkM3WUc1UjdNRDdFUUZFSVA3TERLMlBHUEhKRlQ3NE9USjRGWEFQUENaQ0hOSDJURkVIUEdaVVhCV1Y3TzNRUDdBVkEyVyIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFHTjVZSVk0N0QzRDRZT1NZRkRHSU9FQVg0UlpVVUFEVlNVTlJBMktCM1JIWDZWSEVTMzdUUDRLUVNOT0FKVldUWkZVSVpPR0NFNTQ3RzNKSDVQNEc0SUJBNEpYV05aV0xaR0pUV0FGUzRETUlUUDU2VVhJUURGSkZRRVhSM1BLRkdXQU1ZRExENEFUQzc3Rk1ONEVEWE9SNVg3QkRYNFpRMkpYRDVQUlJJTUxIM0tMTU1WT1hXTzJXVkRMWFhFNzUzV1JDR1M3TVk2Q0JHUSJ9fQ.SQ9FXK3D6VnIUlm062zIw3TamOsafmLiyL6YCoTUTfs4D5zKQqjIf8MU3fxyh6L3c1XW5ZCjW9nW8wyC6WbvltO1KefkzgstdVLyeP4Q7FoIWNB8bRfByCWGsCX1aVZQHzTvrRkUnk_LMYN5d4JkZPeMrlmLNanP4gunSJOHDXn22WCHZfup8-t-gsNkEeo02ThXib0CuPraCn3GsIogjP3SmUMwGK4Pcvfi_TD9PUs6_49Ui2PkTueqCOHklnPX2smEWHowG4wsmOszdfQ8Bb-ElxVeVsOGwckHm43UIvDlQqoTM5iTIDOZ_yjOZRhcj4SQbj8jXeBOuATG1gm60A"
// 		},
// 		"Viewport": {
// 			"experiences": [
// 				{
// 					"arcMinuteWidth": 246,
// 					"arcMinuteHeight": 144,
// 					"canRotate": false,
// 					"canResize": false
// 				}
// 			],
// 			"shape": "RECTANGLE",
// 			"pixelWidth": 1024,
// 			"pixelHeight": 600,
// 			"dpi": 160,
// 			"currentPixelWidth": 1024,
// 			"currentPixelHeight": 600,
// 			"touch": [
// 				"SINGLE"
// 			],
// 			"video": {
// 				"codecs": [
// 					"H_264_42",
// 					"H_264_41"
// 				]
// 			}
// 		},
// 		"Viewports": [
// 			{
// 				"type": "APL",
// 				"id": "main",
// 				"shape": "RECTANGLE",
// 				"dpi": 160,
// 				"presentationType": "STANDARD",
// 				"canRotate": false,
// 				"configuration": {
// 					"current": {
// 						"video": {
// 							"codecs": [
// 								"H_264_42",
// 								"H_264_41"
// 							]
// 						},
// 						"size": {
// 							"type": "DISCRETE",
// 							"pixelWidth": 1024,
// 							"pixelHeight": 600
// 						}
// 					}
// 				}
// 			}
// 		]
// 	},
// 	"request": {
// 		"type": "SessionEndedRequest",
// 		"requestId": "amzn1.echo-api.request.e2caa15e-3e22-4ee8-83cc-e6dcaa7e2fed",
// 		"timestamp": "2019-12-26T03:49:37Z",
// 		"locale": "en-US",
// 		"reason": "USER_INITIATED"
// 	}
// }, {}, (err, result) => console.log(err, result))
