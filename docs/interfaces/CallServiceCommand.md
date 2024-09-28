[homeassistant-typescript](../README.md) / CallServiceCommand

# Interface: CallServiceCommand

## Hierarchy

- `Command`

  ↳ **`CallServiceCommand`**

## Table of contents

### Properties

- [domain](CallServiceCommand.md#domain)
- [id](CallServiceCommand.md#id)
- [return\_response](CallServiceCommand.md#return_response)
- [service](CallServiceCommand.md#service)
- [service\_data](CallServiceCommand.md#service_data)
- [target](CallServiceCommand.md#target)
- [type](CallServiceCommand.md#type)

## Properties

### domain

• **domain**: `string`

Service domain (e.g. 'light')

#### Defined in

[lib/core/websocket-client/messages/call-service-command.ts:15](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/websocket-client/messages/call-service-command.ts#L15)

___

### id

• **id**: `number`

Internal command ID - used to match commands to responses

#### Inherited from

Command.id

#### Defined in

[lib/core/websocket-client/messages/command.ts:5](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/websocket-client/messages/command.ts#L5)

___

### return\_response

• `Optional` **return\_response**: `boolean`

Not optional for service actions that return response data

#### Defined in

[lib/core/websocket-client/messages/call-service-command.ts:45](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/websocket-client/messages/call-service-command.ts#L45)

___

### service

• **service**: `string`

Service action (e.g. 'turn_on')

#### Defined in

[lib/core/websocket-client/messages/call-service-command.ts:20](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/websocket-client/messages/call-service-command.ts#L20)

___

### service\_data

• `Optional` **service\_data**: `Record`\<`string`, `unknown`\>

Optional service data

**`Example`**

```ts
service_data: {
 color_name: "beige",
 brightness: "101"
}
```

#### Defined in

[lib/core/websocket-client/messages/call-service-command.ts:31](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/websocket-client/messages/call-service-command.ts#L31)

___

### target

• `Optional` **target**: `Object`

What entity is the service targeting

#### Type declaration

| Name | Type |
| :------ | :------ |
| `area_id?` | `string` \| `string`[] |
| `device_id?` | `string` \| `string`[] |
| `entity_id?` | `string` \| `string`[] |

#### Defined in

[lib/core/websocket-client/messages/call-service-command.ts:36](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/websocket-client/messages/call-service-command.ts#L36)

___

### type

• **type**: ``"call_service"``

Type of command on the Websocket API

#### Defined in

[lib/core/websocket-client/messages/call-service-command.ts:10](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/websocket-client/messages/call-service-command.ts#L10)
