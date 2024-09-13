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

[lib/core/client/i-client.ts:63](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L63)

___

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/core/client/i-client.ts:88](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L88)

___

### getAreas

▸ **getAreas**(): `Promise`\<[`HassArea`](HassArea.md)[]\>

Gets a list of areas registered with home assistant

#### Returns

`Promise`\<[`HassArea`](HassArea.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:39](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L39)

___

### getCalendars

▸ **getCalendars**(): `Promise`\<[`CalendarDetails`](CalendarDetails.md)\>

#### Returns

`Promise`\<[`CalendarDetails`](CalendarDetails.md)\>

#### Defined in

[lib/core/client/i-client.ts:75](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L75)

___

### getConfig

▸ **getConfig**(): `Promise`\<[`Config`](Config.md)\>

#### Returns

`Promise`\<[`Config`](Config.md)\>

#### Defined in

[lib/core/client/i-client.ts:67](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L67)

___

### getDevices

▸ **getDevices**(): `Promise`\<[`HassDevice`](HassDevice.md)[]\>

#### Returns

`Promise`\<[`HassDevice`](HassDevice.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:50](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L50)

___

### getEntities

▸ **getEntities**(): `Promise`\<`HassEntity`[]\>

#### Returns

`Promise`\<`HassEntity`[]\>

#### Defined in

[lib/core/client/i-client.ts:48](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L48)

___

### getErrorLog

▸ **getErrorLog**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[lib/core/client/i-client.ts:79](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L79)

___

### getEvents

▸ **getEvents**(): `Promise`\<[`EventDetails`](EventDetails.md)[]\>

#### Returns

`Promise`\<[`EventDetails`](EventDetails.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:77](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L77)

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

[lib/core/client/i-client.ts:34](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L34)

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

[lib/core/client/i-client.ts:46](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L46)

___

### getPanels

▸ **getPanels**(): `Promise`\<`Record`\<`string`, [`Panel`](Panel.md)\>\>

#### Returns

`Promise`\<`Record`\<`string`, [`Panel`](Panel.md)\>\>

#### Defined in

[lib/core/client/i-client.ts:73](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L73)

___

### getServiceDomains

▸ **getServiceDomains**(): `Promise`\<[`ServiceDomainDetails`](ServiceDomainDetails.md)[]\>

#### Returns

`Promise`\<[`ServiceDomainDetails`](ServiceDomainDetails.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:71](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L71)

___

### getServices

▸ **getServices**(): `Promise`\<`Record`\<`string`, [`Service`](Service.md)\>\>

#### Returns

`Promise`\<`Record`\<`string`, [`Service`](Service.md)\>\>

#### Defined in

[lib/core/client/i-client.ts:69](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L69)

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

[lib/core/client/i-client.ts:54](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L54)

___

### getStates

▸ **getStates**(): `Promise`\<[`State`](State.md)[]\>

#### Returns

`Promise`\<[`State`](State.md)[]\>

#### Defined in

[lib/core/client/i-client.ts:52](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L52)

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

[lib/core/client/i-client.ts:81](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L81)

▸ **subscribeToEvents**(`type`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `callback` | (`message`: [`Event`](Event.md)) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/core/client/i-client.ts:83](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/i-client.ts#L83)
