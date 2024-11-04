[homeassistant-typescript](../README.md) / TriggerEventMessage

# Interface: TriggerEventMessage\<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Table of contents

### Properties

- [event](TriggerEventMessage.md#event)
- [id](TriggerEventMessage.md#id)
- [type](TriggerEventMessage.md#type)

## Properties

### event

• **event**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `variables` | \{ `trigger`: `T`  } |
| `variables.trigger` | `T` |

#### Defined in

[lib/core/websocket-client/messages/trigger-event-message.ts:7](https://github.com/benwainwright/hass-ts/blob/24908fa/src/lib/core/websocket-client/messages/trigger-event-message.ts#L7)

___

### id

• **id**: `number`

#### Defined in

[lib/core/websocket-client/messages/trigger-event-message.ts:5](https://github.com/benwainwright/hass-ts/blob/24908fa/src/lib/core/websocket-client/messages/trigger-event-message.ts#L5)

___

### type

• **type**: ``"event"``

#### Defined in

[lib/core/websocket-client/messages/trigger-event-message.ts:6](https://github.com/benwainwright/hass-ts/blob/24908fa/src/lib/core/websocket-client/messages/trigger-event-message.ts#L6)
