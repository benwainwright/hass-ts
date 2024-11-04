[homeassistant-typescript](../README.md) / IClient

# Interface: IClient

The Home Assistant client API. Once initialised, the client will make requests via
**either** the websocket or HTTP API where appropriate

## Table of contents

### Methods

- [callService](IClient.md#callservice)
- [close](IClient.md#close)
- [getAreas](IClient.md#getareas)
- [getCalendars](IClient.md#getcalendars)
- [getConfig](IClient.md#getconfig)
- [getDevices](IClient.md#getdevices)
- [getEntities](IClient.md#getentities)
- [getErrorLog](IClient.md#geterrorlog)
- [getEvents](IClient.md#getevents)
- [getHistory](IClient.md#gethistory)
- [getLogbook](IClient.md#getlogbook)
- [getPanels](IClient.md#getpanels)
- [getServiceDomains](IClient.md#getservicedomains)
- [getServices](IClient.md#getservices)
- [getState](IClient.md#getstate)
- [getStates](IClient.md#getstates)
- [registerTrigger](IClient.md#registertrigger)
- [subscribeToEvents](IClient.md#subscribetoevents)

## Methods

### callService

▸ **callService**(`params`): `Promise`\<[`State`](State.md)[]\>

Call a service action

See [https://developers.home-assistant.io/docs/api/websocket/#calling-a-service-action](https://developers.home-assistant.io/docs/api/websocket/#calling-a-service-action)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Omit`\<[`CallServiceCommand`](CallServiceCommand.md), ``"id"`` \| ``"type"``\> | parameters to send with the service command |

#### Returns

`Promise`\<[`State`](State.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:78](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L78)

___

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/core/client/i-client.ts:122](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L122)

___

### getAreas

▸ **getAreas**(): `Promise`\<[`HassArea`](HassArea.md)[]\>

Gets a list of areas registered with home assistant

#### Returns

`Promise`\<[`HassArea`](HassArea.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:40](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L40)

___

### getCalendars

▸ **getCalendars**(): `Promise`\<[`CalendarDetails`](CalendarDetails.md)\>

#### Returns

`Promise`\<[`CalendarDetails`](CalendarDetails.md)\>

#### Defined in

[lib/core/client/i-client.ts:99](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L99)

___

### getConfig

▸ **getConfig**(): `Promise`\<[`Config`](Config.md)\>

Get the current Home Assistant configuration

#### Returns

`Promise`\<[`Config`](Config.md)\>

#### Defined in

[lib/core/client/i-client.ts:85](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L85)

___

### getDevices

▸ **getDevices**(): `Promise`\<[`HassDevice`](HassDevice.md)[]\>

Get a list of all devices currently registered by home assistant

#### Returns

`Promise`\<[`HassDevice`](HassDevice.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:57](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L57)

___

### getEntities

▸ **getEntities**(): `Promise`\<`HassEntity`[]\>

Get a list of all entities currently registered by home assistant

#### Returns

`Promise`\<`HassEntity`[]\>

#### Defined in

[lib/core/client/i-client.ts:52](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L52)

___

### getErrorLog

▸ **getErrorLog**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[lib/core/client/i-client.ts:103](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L103)

___

### getEvents

▸ **getEvents**(): `Promise`\<[`EventDetails`](EventDetails.md)[]\>

#### Returns

`Promise`\<[`EventDetails`](EventDetails.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:101](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L101)

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

[lib/core/client/i-client.ts:35](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L35)

___

### getLogbook

▸ **getLogbook**(`params?`): `Promise`\<[`LogBookEntry`](../README.md#logbookentry)[]\>

Gets a list of entries from the Home Assistant logbook

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | [`GetLogbookParams`](GetLogbookParams.md) | params to filter the results |

#### Returns

`Promise`\<[`LogBookEntry`](../README.md#logbookentry)[]\>

#### Defined in

[lib/core/client/i-client.ts:47](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L47)

___

### getPanels

▸ **getPanels**(): `Promise`\<`Record`\<`string`, [`Panel`](Panel.md)\>\>

#### Returns

`Promise`\<`Record`\<`string`, [`Panel`](Panel.md)\>\>

#### Defined in

[lib/core/client/i-client.ts:97](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L97)

___

### getServiceDomains

▸ **getServiceDomains**(): `Promise`\<[`ServiceDomainDetails`](ServiceDomainDetails.md)[]\>

Get a list of

#### Returns

`Promise`\<[`ServiceDomainDetails`](ServiceDomainDetails.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:95](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L95)

___

### getServices

▸ **getServices**(): `Promise`\<`Record`\<`string`, [`Service`](Service.md)\>\>

Get details of all the services currently registered in home assistant, grouped by domain

#### Returns

`Promise`\<`Record`\<`string`, [`Service`](Service.md)\>\>

#### Defined in

[lib/core/client/i-client.ts:90](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L90)

___

### getState

▸ **getState**(`entityId`): `Promise`\<[`State`](State.md)\>

Get the current state of a specific entity

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entityId` | `string` | The entity id in the form <domain>.<id> |

#### Returns

`Promise`\<[`State`](State.md)\>

#### Defined in

[lib/core/client/i-client.ts:69](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L69)

___

### getStates

▸ **getStates**(): `Promise`\<[`State`](State.md)[]\>

Get a list of the current states of all entities

#### Returns

`Promise`\<[`State`](State.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:62](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L62)

___

### registerTrigger

▸ **registerTrigger**(`trigger`, `callback`): `Promise`\<`void`\>

Subscribe to a trigger. See https://developers.home-assistant.io/docs/api/websocket/#subscribe-to-trigger

#### Parameters

| Name | Type |
| :------ | :------ |
| `trigger` | `Record`\<`string`, `unknown`\> |
| `callback` | (`event`: `unknown`) => `void` \| `Promise`\<`void`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/core/client/i-client.ts:108](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L108)

___

### subscribeToEvents

▸ **subscribeToEvents**(`callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`message`: [`Event`](Event.md) \| \{ `variables`: \{ `trigger`: `unknown`  }  }) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/core/client/i-client.ts:113](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L113)

▸ **subscribeToEvents**(`type`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `callback` | (`message`: [`Event`](Event.md) \| \{ `variables`: \{ `trigger`: `unknown`  }  }) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/core/client/i-client.ts:117](https://github.com/benwainwright/hass-ts/blob/01f576e/src/lib/core/client/i-client.ts#L117)
