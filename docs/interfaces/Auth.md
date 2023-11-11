[rtm-typescript](../README.md) / Auth

# Interface: Auth

Authentication methods

## Table of contents

### Properties

- [checkToken](Auth.md#checktoken)
- [getFrob](Auth.md#getfrob)
- [getToken](Auth.md#gettoken)

## Properties

### checkToken

• **checkToken**: (`args`: [`CheckTokenParams`](CheckTokenParams.md)) => `Promise`\<\{ `api_key?`: `string` ; `auth`: \{ token: string; perms: string; user: \{ id: string; username: string; fullname: string; }; } ; `callback`: `string` ; `stat`: ``"ok"``  }\>

#### Type declaration

▸ (`args`): `Promise`\<\{ `api_key?`: `string` ; `auth`: \{ token: string; perms: string; user: \{ id: string; username: string; fullname: string; }; } ; `callback`: `string` ; `stat`: ``"ok"``  }\>

Returns the credentials attached to an authentication token.

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`CheckTokenParams`](CheckTokenParams.md) |

##### Returns

`Promise`\<\{ `api_key?`: `string` ; `auth`: \{ token: string; perms: string; user: \{ id: string; username: string; fullname: string; }; } ; `callback`: `string` ; `stat`: ``"ok"``  }\>

[SuccessResponse](SuccessResponse.md)

**`See`**

[Api Documentation](https://www.rememberthemilk.com/services/api/methods/rtm.auth.checkToken.rtm|RTM) for more information

**`Throws`**

[RtmApiFailedResponseError](../classes/RtmApiFailedResponseError.md) if the API responds with a failure

**`Throws`**

[RtmHttpError](../classes/RtmHttpError.md) if the API responds with a non 200 response

#### Defined in

[src/lib/types/namespaces/auth.ts:44](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/namespaces/auth.ts#L44)

___

### getFrob

• **getFrob**: () => `Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `frob`: `string` ; `stat`: ``"ok"``  }\>

#### Type declaration

▸ (): `Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `frob`: `string` ; `stat`: ``"ok"``  }\>

Returns a frob for use during authentication

##### Returns

`Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `frob`: `string` ; `stat`: ``"ok"``  }\>

Remember the milk API response

**`See`**

[Api Documentation](https://www.rememberthemilk.com/services/api/methods/rtm.auth.getFrob.rtm|RTM) for more information

**`Throws`**

[RtmApiFailedResponseError](../classes/RtmApiFailedResponseError.md) if the API responds with a failure

**`Throws`**

[RtmHttpError](../classes/RtmHttpError.md) if the API responds with a non 200 response

#### Defined in

[src/lib/types/namespaces/auth.ts:72](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/namespaces/auth.ts#L72)

___

### getToken

• **getToken**: (`args`: [`GetTokenParams`](GetTokenParams.md)) => `Promise`\<\{ `api_key?`: `string` ; `auth`: \{ token: string; perms: string; user: \{ id: string; username: string; fullname: string; }; } ; `callback`: `string` ; `stat`: ``"ok"``  }\>

#### Type declaration

▸ (`args`): `Promise`\<\{ `api_key?`: `string` ; `auth`: \{ token: string; perms: string; user: \{ id: string; username: string; fullname: string; }; } ; `callback`: `string` ; `stat`: ``"ok"``  }\>

Returns the auth token for the given frob, if one has been attached.

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`GetTokenParams`](GetTokenParams.md) |

##### Returns

`Promise`\<\{ `api_key?`: `string` ; `auth`: \{ token: string; perms: string; user: \{ id: string; username: string; fullname: string; }; } ; `callback`: `string` ; `stat`: ``"ok"``  }\>

[SuccessResponse](SuccessResponse.md)

**`See`**

[Api Documentation](https://www.rememberthemilk.com/services/api/methods/rtm.auth.getToken.rtm|RTM) for more information

**`Throws`**

[RtmApiFailedResponseError](../classes/RtmApiFailedResponseError.md) if the API responds with a failure

**`Throws`**

[RtmHttpError](../classes/RtmHttpError.md) if the API responds with a non 200 response

#### Defined in

[src/lib/types/namespaces/auth.ts:58](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/namespaces/auth.ts#L58)
