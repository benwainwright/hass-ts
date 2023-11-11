[rtm-typescript](../README.md) / RtmTypescriptError

# Class: RtmTypescriptError

Base error type thrown by this package

## Hierarchy

- `Error`

  ↳ **`RtmTypescriptError`**

  ↳↳ [`RtmApiFailedResponseError`](RtmApiFailedResponseError.md)

  ↳↳ [`RtmHttpError`](RtmHttpError.md)

## Table of contents

### Constructors

- [constructor](RtmTypescriptError.md#constructor)

### Methods

- [captureStackTrace](RtmTypescriptError.md#capturestacktrace)

### Properties

- [cause](RtmTypescriptError.md#cause)
- [message](RtmTypescriptError.md#message)
- [name](RtmTypescriptError.md#name)
- [stack](RtmTypescriptError.md#stack)
- [prepareStackTrace](RtmTypescriptError.md#preparestacktrace)
- [stackTraceLimit](RtmTypescriptError.md#stacktracelimit)

## Constructors

### constructor

• **new RtmTypescriptError**(`message?`): [`RtmTypescriptError`](RtmTypescriptError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Returns

[`RtmTypescriptError`](RtmTypescriptError.md)

#### Inherited from

Error.constructor

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1073

• **new RtmTypescriptError**(`message?`, `options?`): [`RtmTypescriptError`](RtmTypescriptError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |
| `options?` | `ErrorOptions` |

#### Returns

[`RtmTypescriptError`](RtmTypescriptError.md)

#### Inherited from

Error.constructor

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:28

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

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:24

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

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

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13
