[rtm-typescript](../README.md) / RtmApiFailedResponseError

# Class: RtmApiFailedResponseError

Thrown if the API returns an error response

**`See`**

[RTM Api documentation](https://www.rememberthemilk.com/services/api/response.rtm) for more information

## Hierarchy

- [`RtmTypescriptError`](RtmTypescriptError.md)

  ↳ **`RtmApiFailedResponseError`**

## Table of contents

### Constructors

- [constructor](RtmApiFailedResponseError.md#constructor)

### Methods

- [captureStackTrace](RtmApiFailedResponseError.md#capturestacktrace)

### Properties

- [cause](RtmApiFailedResponseError.md#cause)
- [code](RtmApiFailedResponseError.md#code)
- [message](RtmApiFailedResponseError.md#message)
- [name](RtmApiFailedResponseError.md#name)
- [stack](RtmApiFailedResponseError.md#stack)
- [prepareStackTrace](RtmApiFailedResponseError.md#preparestacktrace)
- [stackTraceLimit](RtmApiFailedResponseError.md#stacktracelimit)

## Constructors

### constructor

• **new RtmApiFailedResponseError**(`code`, `message`): [`RtmApiFailedResponseError`](RtmApiFailedResponseError.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `number` | The response code returned from the RTM Api |
| `message` | `string` | The error message returned from the RTM Api |

#### Returns

[`RtmApiFailedResponseError`](RtmApiFailedResponseError.md)

#### Overrides

[RtmTypescriptError](RtmTypescriptError.md).[constructor](RtmTypescriptError.md#constructor)

#### Defined in

[src/lib/errors/rtm-api-failed-response-error.ts:24](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/errors/rtm-api-failed-response-error.ts#L24)

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

[RtmTypescriptError](RtmTypescriptError.md).[captureStackTrace](RtmTypescriptError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

[RtmTypescriptError](RtmTypescriptError.md).[cause](RtmTypescriptError.md#cause)

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:24

___

### code

• `Readonly` **code**: `number`

The response code returned from the RTM Api

#### Defined in

[src/lib/errors/rtm-api-failed-response-error.ts:13](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/errors/rtm-api-failed-response-error.ts#L13)

___

### message

• `Readonly` **message**: `string`

The error message returned from the RTM Api

#### Overrides

[RtmTypescriptError](RtmTypescriptError.md).[message](RtmTypescriptError.md#message)

#### Defined in

[src/lib/errors/rtm-api-failed-response-error.ts:18](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/errors/rtm-api-failed-response-error.ts#L18)

___

### name

• **name**: `string`

#### Inherited from

[RtmTypescriptError](RtmTypescriptError.md).[name](RtmTypescriptError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[RtmTypescriptError](RtmTypescriptError.md).[stack](RtmTypescriptError.md#stack)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1069

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

[RtmTypescriptError](RtmTypescriptError.md).[prepareStackTrace](RtmTypescriptError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[RtmTypescriptError](RtmTypescriptError.md).[stackTraceLimit](RtmTypescriptError.md#stacktracelimit)

#### Defined in

node_modules/@types/node/globals.d.ts:13
