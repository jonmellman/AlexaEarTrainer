const { handler } = require('./src')

handler({
	"version": "1.0",
	"session": {
		"new": false,
		"sessionId": "amzn1.echo-api.session.65bbf1b0-2f97-4c69-ab33-0c99e5841541",
		"application": {
			"applicationId": "amzn1.ask.skill.c8898de4-05ca-44f6-8710-24a56e97933d"
		},
		"attributes": {
			"currentRound": {
				"roundNumber": 2,
				"referenceNote": 60,
				"targetNote": 69,
				"intervalDistance": 9
			},
			"level": 2,
			"stats": [
				{
					"guess": 11,
					"answer": 11
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
			"apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmM4ODk4ZGU0LTA1Y2EtNDRmNi04NzEwLTI0YTU2ZTk3OTMzZCIsImV4cCI6MTU3NzMyNTcyMiwiaWF0IjoxNTc3MzI1NDIyLCJuYmYiOjE1NzczMjU0MjIsInByaXZhdGVDbGFpbXMiOnsiY29udGV4dCI6IkFBQUFBQUFBQUFCQkYzOThjV3pYdGtVblRsY3BHT0s3S2dFQUFBQUFBQUIwb3VVSlkrUDRkTUFXUDVMMHN1T2U1bDVRY3dDL0pER3U3Zy8rWXlTSFNFQzNJMWpHNjlRa3JkSVFMcUd2M0FaVnFSSUVZWmJhTVg3SnhCbnBrWm40MXBGUXM2aDlKNEhDcHhoZ0RQbnlhZkVwcnc1ZUU1clNiY1BieHpuNjQ3RldteDd6YjdWcEdsUHBCOFVRMFF2WWRyMUJ4bHpjK3BIZVhYZlczSG1jelpsZTVEL3VSWTU4TldRVllQNEhlM2hhKy9ORVIrQjRxMXdmaldzblhtRTNIdXdmdVJncmJybUh6NGQrcXRaTFNuMWQybndVc09GUzNUL3NnRlhJWFNQbjlzTy9CNU9MaDhxdWtPNGpLak5HbzRPMTlYRkJiNE1od0lSMFJPeTV2RkcyMm1OV0lMc0N6VUlab2ZMZTZ0VkR6RXJpUHNjRUhSaTFDQmw2enBpNGhOMm9hTU1nOEY5c0ZheUxab3QySk10V2J3SURKUHhvSkVvUktYT0Y4UGlBU3J5aGNvVjQ4TC80IiwiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUdQVUdLUEhINUZDRjRRWkVXSFFaT01ONENaNURBNEZKMkQ0NFZRTFFONlZBTVhNQkhWWlVESkJSRDdXSTJWQVRPQllYU0JFNzZGM1VIMzZBV09UNFg3V0JCMldTR0VCNkJBU09ENE9MSVRPSkVSRkM3WUc1UjdNRDdFUUZFSVA3TERLMlBHUEhKRlQ3NE9USjRGWEFQUENaQ0hOSDJURkVIUEdaVVhCV1Y3TzNRUDdBVkEyVyIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFHTjVZSVk0N0QzRDRZT1NZRkRHSU9FQVg0UlpVVUFEVlNVTlJBMktCM1JIWDZWSEVTMzdUUDRLUVNOT0FKVldUWkZVSVpPR0NFNTQ3RzNKSDVQNEc0SUJBNEpYV05aV0xaR0pUV0FGUzRETUlUUDU2VVhJUURGSkZRRVhSM1BLRkdXQU1ZRExENEFUQzc3Rk1ONEVEWE9SNVg3QkRYNFpRMkpYRDVQUlJJTUxIM0tMTU1WT1hXTzJXVkRMWFhFNzUzV1JDR1M3TVk2Q0JHUSJ9fQ.d__sC9kcSSYEAmwcoyD4L2cjcHg6qeUi46FzY4ZGQ9H3jzLEnzQgxjXMyPozO2Gj1E-0MzGtOsbz85CyKryw6ELDQLo5o47GT3FJ4mA_Q9rhY80M9HAgCpJVOLONx8jfiFc6Lo38BCNbll9eFWVw-DYosZa3hcmR_70e459t3Ig985opnkK9wWACOTdlGB5H7JYcXfpNbQnK3noUjtngiQCf9hPytsYPA9KMN4ezsknLyGXnFxy6HwWc_7ipLeKpbV5uU7PotYVsaXoBA9eJo_AuJvfcvrrNxnwDI7lJ_5wXHHer9LNV0XwKbyw0-s__bUVznyFKuvD19wObiI0xNg"
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
		"requestId": "amzn1.echo-api.request.74bf94a0-025c-4385-bc67-a6f1765fff88",
		"timestamp": "2019-12-26T01:57:02Z",
		"locale": "en-US",
		"intent": {
			"name": "AnswerIntent",
			"confirmationStatus": "NONE",
			"slots": {
				"intervalName": {
					"name": "intervalName",
					"value": "play it again",
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
}, {}, (err, result) => console.log('done'))
