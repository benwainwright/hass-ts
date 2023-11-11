[rtm-typescript](../README.md) / SuccessResponse

# Interface: SuccessResponse\<T, M\>

A successful response from the API

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<keyof `T`, \{ `requestArgs`: `unknown` ; `responseArgs`: `unknown`  }\> |
| `M` | extends keyof `T` |

## Table of contents

### Properties

- [rsp](SuccessResponse.md#rsp)

## Properties

### rsp

• **rsp**: [`ExpandRecursively`](../README.md#expandrecursively)\<\{ `api_key?`: `string` ; `callback`: `string` ; `stat`: ``"ok"``  } & `T`[`M`][``"responseArgs"``]\>

#### Defined in

[src/lib/types/responses/success-response.ts:12](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/responses/success-response.ts#L12)
