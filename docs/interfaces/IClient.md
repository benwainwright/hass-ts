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
- [subscribeToEvents](IClient.md#subscribetoevents)

## Methods

### callService

▸ **callService**(`params`): `Promise`\<[`CallServiceResponse`](CallServiceResponse.md)\>

Call a service action

See [https://developers.home-assistant.io/docs/api/websocket/#calling-a-service-action](https://developers.home-assistant.io/docs/api/websocket/#calling-a-service-action)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Omit`\<[`CallServiceCommand`](CallServiceCommand.md), ``"id"`` \| ``"type"``\> | parameters to send with the service command |

#### Returns

`Promise`\<[`CallServiceResponse`](CallServiceResponse.md)\>

#### Defined in

[lib/core/client/i-client.ts:77](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L77)

___

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/core/client/i-client.ts:111](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L111)

___

### getAreas

▸ **getAreas**(): `Promise`\<[`HassArea`](HassArea.md)[]\>

Gets a list of areas registered with home assistant

#### Returns

`Promise`\<[`HassArea`](HassArea.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:39](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L39)

___

### getCalendars

▸ **getCalendars**(): `Promise`\<[`CalendarDetails`](CalendarDetails.md)\>

#### Returns

`Promise`\<[`CalendarDetails`](CalendarDetails.md)\>

#### Defined in

[lib/core/client/i-client.ts:98](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L98)

___

### getConfig

▸ **getConfig**(): `Promise`\<[`Config`](Config.md)\>

Get the current Home Assistant configuration

#### Returns

`Promise`\<[`Config`](Config.md)\>

#### Defined in

[lib/core/client/i-client.ts:84](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L84)

___

### getDevices

▸ **getDevices**(): `Promise`\<[`HassDevice`](HassDevice.md)[]\>

Get a list of all devices currently registered by home assistant

#### Returns

`Promise`\<[`HassDevice`](HassDevice.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:56](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L56)

___

### getEntities

▸ **getEntities**(): `Promise`\<`HassEntity`[]\>

Get a list of all entities currently registered by home assistant

#### Returns

`Promise`\<`HassEntity`[]\>

#### Defined in

[lib/core/client/i-client.ts:51](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L51)

___

### getErrorLog

▸ **getErrorLog**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[lib/core/client/i-client.ts:102](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L102)

___

### getEvents

▸ **getEvents**(): `Promise`\<[`EventDetails`](EventDetails.md)[]\>

#### Returns

`Promise`\<[`EventDetails`](EventDetails.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:100](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L100)

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

[lib/core/client/i-client.ts:34](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L34)

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

[lib/core/client/i-client.ts:46](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L46)

___

### getPanels

▸ **getPanels**(): `Promise`\<`Record`\<`string`, [`Panel`](Panel.md)\>\>

#### Returns

`Promise`\<`Record`\<`string`, [`Panel`](Panel.md)\>\>

#### Defined in

[lib/core/client/i-client.ts:96](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L96)

___

### getServiceDomains

▸ **getServiceDomains**(): `Promise`\<[`ServiceDomainDetails`](ServiceDomainDetails.md)[]\>

Get a list of

#### Returns

`Promise`\<[`ServiceDomainDetails`](ServiceDomainDetails.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:94](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L94)

___

### getServices

▸ **getServices**(): `Promise`\<`Record`\<`string`, [`Service`](Service.md)\>\>

Get details of all the services currently registered in home assistant, grouped by domain

#### Returns

`Promise`\<`Record`\<`string`, [`Service`](Service.md)\>\>

#### Defined in

[lib/core/client/i-client.ts:89](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L89)

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

[lib/core/client/i-client.ts:68](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L68)

___

### getStates

▸ **getStates**(): `Promise`\<[`State`](State.md)[]\>

Get a list of the current states of all entities

#### Returns

`Promise`\<[`State`](State.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:61](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L61)

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

[lib/core/client/i-client.ts:104](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L104)

▸ **subscribeToEvents**(`type`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `callback` | (`message`: [`Event`](Event.md)) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/core/client/i-client.ts:106](https://github.com/benwainwright/hass-ts/blob/847beec/src/lib/core/client/i-client.ts#L106)
