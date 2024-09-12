[hass-ts](../README.md) / Event

# Interface: Event

## Table of contents

### Properties

- [context](Event.md#context)
- [data](Event.md#data)
- [event_type](Event.md#event_type)
- [origin](Event.md#origin)
- [time_fired](Event.md#time_fired)

## Properties

### context

• **context**: [`Context`](Context.md)

#### Defined in

lib/types/event.ts:16

---

### data

• **data**: `Object`

#### Type declaration

| Name        | Type                |
| :---------- | :------------------ |
| `entity_id` | `string`            |
| `new_state` | [`State`](State.md) |
| `old_state` | [`State`](State.md) |

#### Defined in

lib/types/event.ts:8

---

### event_type

• **event_type**: `string`

#### Defined in

lib/types/event.ts:13

---

### origin

• **origin**: `string`

#### Defined in

lib/types/event.ts:15

---

### time_fired

• **time_fired**: `string`

#### Defined in

lib/types/event.ts:14
