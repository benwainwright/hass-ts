[homeassistant-typescript](../README.md) / CallServiceResponse

# Interface: CallServiceResponse

## Table of contents

### Properties

- [context](CallServiceResponse.md#context)
- [response](CallServiceResponse.md#response)

## Properties

### context

• **context**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `parent_id` | ``null`` \| `string` |
| `user_id` | `string` |

#### Defined in

[lib/core/websocket-client/messages/call-service-response.ts:5](https://github.com/benwainwright/hass-ts/blob/31505ab/src/lib/core/websocket-client/messages/call-service-response.ts#L5)

___

### response

• **response**: ``null`` \| `Record`\<`string`, `unknown`\>

Response data from the service action. Always present, but
will be `null` if the action does not support response data

#### Defined in

[lib/core/websocket-client/messages/call-service-response.ts:15](https://github.com/benwainwright/hass-ts/blob/31505ab/src/lib/core/websocket-client/messages/call-service-response.ts#L15)
