[homeassistant-typescript](../README.md) / IClient

# Interface: IClient

The Home Assistant client API. Uses a combination of both the websocket and HTTP apis

## Table of contents

### Methods

- [callService](IClient.md#callservice)
- [close](IClient.md#close)
- [getCalendars](IClient.md#getcalendars)
- [getConfig](IClient.md#getconfig)
- [getErrorLog](IClient.md#geterrorlog)
- [getEvents](IClient.md#getevents)
- [getHistory](IClient.md#gethistory)
- [getLogbook](IClient.md#getlogbook)
- [getPanels](IClient.md#getpanels)
- [getServiceDomains](IClient.md#getservicedomains)
- [getServices](IClient.md#getservices)
- [getState](IClient.md#getstate)
- [getStates](IClient.md#getstates)
- [subscribeToEvents](IClient.md#subscribetoevents)

## Methods

### callService

▸ **callService**(`params`): `Promise`\<`CallServiceResponse`\>

Call a service action

See https://developers.home-assistant.io/docs/api/websocket/#calling-a-service-action

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Omit`\<`CallServiceCommand`, ``"id"`` \| ``"type"``\> | parameters to send with the service command |

#### Returns

`Promise`\<`CallServiceResponse`\>

#### Defined in

[lib/core/client/i-client.ts:45](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L45)

___

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/core/client/i-client.ts:70](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L70)

___

### getCalendars

▸ **getCalendars**(): `Promise`\<[`CalendarDetails`](CalendarDetails.md)\>

#### Returns

`Promise`\<[`CalendarDetails`](CalendarDetails.md)\>

#### Defined in

[lib/core/client/i-client.ts:57](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L57)

___

### getConfig

▸ **getConfig**(): `Promise`\<[`Config`](Config.md)\>

#### Returns

`Promise`\<[`Config`](Config.md)\>

#### Defined in

[lib/core/client/i-client.ts:49](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L49)

___

### getErrorLog

▸ **getErrorLog**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[lib/core/client/i-client.ts:61](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L61)

___

### getEvents

▸ **getEvents**(): `Promise`\<[`EventDetails`](EventDetails.md)[]\>

#### Returns

`Promise`\<[`EventDetails`](EventDetails.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:59](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L59)

___

### getHistory

▸ **getHistory**(`params`): `Promise`\<[`State`](State.md)[][]\>

Returns an array of state changes from the past

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetHistoryParams`](GetHistoryParams.md) |

#### Returns

`Promise`\<[`State`](State.md)[][]\>

#### Defined in

[lib/core/client/i-client.ts:30](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L30)

___

### getLogbook

▸ **getLogbook**(`params?`): `Promise`\<[`LogBookEntry`](LogBookEntry.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | [`GetLogbookParams`](GetLogbookParams.md) |

#### Returns

`Promise`\<[`LogBookEntry`](LogBookEntry.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:32](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L32)

___

### getPanels

▸ **getPanels**(): `Promise`\<`Record`\<`string`, [`Panel`](Panel.md)\>\>

#### Returns

`Promise`\<`Record`\<`string`, [`Panel`](Panel.md)\>\>

#### Defined in

[lib/core/client/i-client.ts:55](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L55)

___

### getServiceDomains

▸ **getServiceDomains**(): `Promise`\<[`ServiceDomainDetails`](ServiceDomainDetails.md)[]\>

#### Returns

`Promise`\<[`ServiceDomainDetails`](ServiceDomainDetails.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:53](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L53)

___

### getServices

▸ **getServices**(): `Promise`\<[`Services`](../README.md#services)\>

#### Returns

`Promise`\<[`Services`](../README.md#services)\>

#### Defined in

[lib/core/client/i-client.ts:51](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L51)

___

### getState

▸ **getState**(`entityId`): `Promise`\<[`State`](State.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `entityId` | `string` |

#### Returns

`Promise`\<[`State`](State.md)\>

#### Defined in

[lib/core/client/i-client.ts:36](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L36)

___

### getStates

▸ **getStates**(): `Promise`\<[`State`](State.md)[]\>

#### Returns

`Promise`\<[`State`](State.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:34](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L34)

___

### subscribeToEvents

▸ **subscribeToEvents**(`callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`message`: [`Event`](Event.md)) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/core/client/i-client.ts:63](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L63)

▸ **subscribeToEvents**(`type`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `callback` | (`message`: [`Event`](Event.md)) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/core/client/i-client.ts:65](https://github.com/benwainwright/hass-ts/blob/432b3d4/src/lib/core/client/i-client.ts#L65)
