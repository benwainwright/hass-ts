[homeassistant-typescript](../README.md) / Event

# Interface: Event

## Table of contents

### Properties

- [context](Event.md#context)
- [data](Event.md#data)
- [event\_type](Event.md#event_type)
- [origin](Event.md#origin)
- [time\_fired](Event.md#time_fired)

## Properties

### context

• **context**: [`Context`](Context.md)

#### Defined in

[lib/types/event.ts:16](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/types/event.ts#L16)

___

### data

• **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `entity_id` | `string` |
| `new_state` | [`State`](State.md) |
| `old_state` | [`State`](State.md) |

#### Defined in

[lib/types/event.ts:8](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/types/event.ts#L8)

___

### event\_type

• **event\_type**: `string`

#### Defined in

[lib/types/event.ts:13](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/types/event.ts#L13)

___

### origin

• **origin**: `string`

#### Defined in

[lib/types/event.ts:15](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/types/event.ts#L15)

___

### time\_fired

• **time\_fired**: `string`

#### Defined in

[lib/types/event.ts:14](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/types/event.ts#L14)
