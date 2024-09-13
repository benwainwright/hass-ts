[homeassistant-typescript](../README.md) / State

# Interface: State

## Table of contents

### Properties

- [attributes](State.md#attributes)
- [context](State.md#context)
- [entity\_id](State.md#entity_id)
- [last\_changed](State.md#last_changed)
- [last\_reported](State.md#last_reported)
- [last\_updated](State.md#last_updated)
- [state](State.md#state)

## Properties

### attributes

• **attributes**: `Record`\<`string`, `unknown`\>

State attributes (Specific to different entity domains)

#### Defined in

[lib/types/state.ts:30](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/types/state.ts#L30)

___

### context

• **context**: [`Context`](Context.md)

The context associated with this state change

#### Defined in

[lib/types/state.ts:40](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/types/state.ts#L40)

___

### entity\_id

• **entity\_id**: `string`

Home assistant entity id string in the format <domain>.<id>

#### Defined in

[lib/types/state.ts:10](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/types/state.ts#L10)

___

### last\_changed

• **last\_changed**: `string`

When was the entity last changed (ISO timestamp)

#### Defined in

[lib/types/state.ts:15](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/types/state.ts#L15)

___

### last\_reported

• **last\_reported**: `string`

When did the entity last report its state (ISO timestamp)

#### Defined in

[lib/types/state.ts:20](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/types/state.ts#L20)

___

### last\_updated

• **last\_updated**: `string`

When was the entity last updated (ISO timestamp)

#### Defined in

[lib/types/state.ts:35](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/types/state.ts#L35)

___

### state

• **state**: `string`

Current state of the entity

#### Defined in

[lib/types/state.ts:25](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/types/state.ts#L25)
