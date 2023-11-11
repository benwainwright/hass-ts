rtm-typescript

# rtm-typescript

## Table of contents

### Functions

- [initialiseApi](README.md#initialiseapi)

### Interfaces

- [Auth](interfaces/Auth.md)
- [CheckTokenParams](interfaces/CheckTokenParams.md)
- [GetListParams](interfaces/GetListParams.md)
- [GetTokenParams](interfaces/GetTokenParams.md)
- [IRememberTheMilkApi](interfaces/IRememberTheMilkApi.md)
- [RtmApiConfig](interfaces/RtmApiConfig.md)
- [SuccessResponse](interfaces/SuccessResponse.md)
- [Tasks](interfaces/Tasks.md)
- [Test](interfaces/Test.md)

### Classes

- [RtmApiFailedResponseError](classes/RtmApiFailedResponseError.md)
- [RtmHttpError](classes/RtmHttpError.md)
- [RtmTypescriptError](classes/RtmTypescriptError.md)

### Enumerations

- [ClientPermissions](enums/ClientPermissions.md)

### Type Aliases

- [ExpandRecursively](README.md#expandrecursively)

## Functions

### initialiseApi

▸ **initialiseApi**(`config`): [`IRememberTheMilkApi`](interfaces/IRememberTheMilkApi.md)

Entry point to the API. Calling it with valid credentials will initialise and return an instantiated [IRememberTheMilkApi](interfaces/IRememberTheMilkApi.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`RtmApiConfig`](interfaces/RtmApiConfig.md) | Configuration object for the API |

#### Returns

[`IRememberTheMilkApi`](interfaces/IRememberTheMilkApi.md)

**`Example`**

```TypeScript
 import { initialiseApi, ClientPermissions } from "rtm-typescript";

 const key = "my-api-key";
 const secret = "my-shared-secret";

 const myAsyncFunction = async () => {

   const client = initialiseApi({
     key,
     secret,
     permissions: ClientPermissions.Read,
   });

   const result = await client.tasks.getList({ list_id: "2"});
 }
```

#### Defined in

[src/lib/core/initialise-api.ts:63](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/core/initialise-api.ts#L63)

## Type Aliases

### ExpandRecursively

Ƭ **ExpandRecursively**\<`T`\>: `T` extends `object` ? `T` extends infer O ? \{ [K in keyof O]: ExpandRecursively\<O[K]\> } : `never` : `T`

A helper type that expands types so that they resolve to their final forma
in editor tooltips

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/lib/types/expand-recursively.ts:7](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/expand-recursively.ts#L7)
