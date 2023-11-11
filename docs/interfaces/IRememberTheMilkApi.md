[rtm-typescript](../README.md) / IRememberTheMilkApi

# Interface: IRememberTheMilkApi

This is the public API surface for this package. At the present time it only exposes a small number of methods from the RTM API; in future it will be comprehensive.

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

## Table of contents

### Properties

- [auth](IRememberTheMilkApi.md#auth)
- [getAuthUrl](IRememberTheMilkApi.md#getauthurl)
- [tasks](IRememberTheMilkApi.md#tasks)
- [test](IRememberTheMilkApi.md#test)

## Properties

### auth

• **auth**: [`Auth`](Auth.md)

Methods attached to the rtm.auth namespace

#### Defined in

[src/lib/types/i-remember-the-milk-api.ts:32](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/i-remember-the-milk-api.ts#L32)

___

### getAuthUrl

• **getAuthUrl**: (`frob?`: `string`) => `string`

#### Type declaration

▸ (`frob?`): `string`

Return a valid authentication URL for the RTM API

##### Parameters

| Name | Type |
| :------ | :------ |
| `frob?` | `string` |

##### Returns

`string`

A URL in the form of a string

**`See`**

[RTM Api Documentation](https://www.rememberthemilk.com/services/api/authentication.rtm) for more information

#### Defined in

[src/lib/types/i-remember-the-milk-api.ts:51](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/i-remember-the-milk-api.ts#L51)

___

### tasks

• **tasks**: [`Tasks`](Tasks.md)

Methods attached to the rtm.tasks namespace

#### Defined in

[src/lib/types/i-remember-the-milk-api.ts:37](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/i-remember-the-milk-api.ts#L37)

___

### test

• **test**: [`Test`](Test.md)

Methods attached to the rtm.test namespace

#### Defined in

[src/lib/types/i-remember-the-milk-api.ts:42](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/i-remember-the-milk-api.ts#L42)
