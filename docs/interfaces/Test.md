[rtm-typescript](../README.md) / Test

# Interface: Test

Methods used for testing the API

## Table of contents

### Properties

- [echo](Test.md#echo)
- [login](Test.md#login)

## Properties

### echo

• **echo**: (`args`: `Record`\<`string`, `string`\>) => `Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `method`: `string` ; `stat`: ``"ok"``  }\>

#### Type declaration

▸ (`args`): `Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `method`: `string` ; `stat`: ``"ok"``  }\>

A testing method which echos all parameters back in the response.

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Record`\<`string`, `string`\> |

##### Returns

`Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `method`: `string` ; `stat`: ``"ok"``  }\>

[SuccessResponse](SuccessResponse.md)

**`See`**

[Api Documentation](https://www.rememberthemilk.com/services/api/methods/rtm.test.echo.rtm|RTM) for more information

**`Throws`**

[RtmApiFailedResponseError](../classes/RtmApiFailedResponseError.md) if the API responds with a failure

**`Throws`**

[RtmHttpError](../classes/RtmHttpError.md) if the API responds with a non 200 response

#### Defined in

[src/lib/types/namespaces/test.ts:20](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/namespaces/test.ts#L20)

___

### login

• **login**: () => `Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `stat`: ``"ok"`` ; `user`: \{ id: string; username: string; }  }\>

#### Type declaration

▸ (): `Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `stat`: ``"ok"`` ; `user`: \{ id: string; username: string; }  }\>

A testing method which checks if the caller is logged in.

##### Returns

`Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `stat`: ``"ok"`` ; `user`: \{ id: string; username: string; }  }\>

[SuccessResponse](SuccessResponse.md)

**`See`**

[Api Documentation](https://www.rememberthemilk.com/services/api/methods/rtm.test.echo.rtm|RTM) for more information

**`Throws`**

[RtmApiFailedResponseError](../classes/RtmApiFailedResponseError.md) if the API responds with a failure

**`Throws`**

[RtmHttpError](../classes/RtmHttpError.md) if the API responds with a non 200 response

#### Defined in

[src/lib/types/namespaces/test.ts:34](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/namespaces/test.ts#L34)
