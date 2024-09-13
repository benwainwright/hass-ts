[homeassistant-typescript](../README.md) / Context

# Interface: Context

Used to tie events and states together. See [https://data.home-assistant.io/docs/context/](https://data.home-assistant.io/docs/context/)

## Table of contents

### Properties

- [id](Context.md#id)
- [parent\_id](Context.md#parent_id)
- [user\_id](Context.md#user_id)

## Properties

### id

• **id**: `string`

Unique identifier for the context

#### Defined in

[lib/types/context.ts:10](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/types/context.ts#L10)

___

### parent\_id

• **parent\_id**: ``null``

Unique identifier for the user that started the change

#### Defined in

[lib/types/context.ts:15](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/types/context.ts#L15)

___

### user\_id

• **user\_id**: `string`

Unique identifier of the parent context_id that started the change.

#### Defined in

[lib/types/context.ts:20](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/types/context.ts#L20)
