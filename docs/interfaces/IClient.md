[hass-ts](../README.md) / IClient

# Interface: IClient

The Home Assistant client API. Implements both the websocket and REST APIs

## Table of contents

### Methods

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

### close

▸ **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

lib/core/client/i-client.ts:54

---

### getCalendars

▸ **getCalendars**(): `Promise`\<[`CalendarDetails`](CalendarDetails.md)\>

#### Returns

`Promise`\<[`CalendarDetails`](CalendarDetails.md)\>

#### Defined in

lib/core/client/i-client.ts:41

---

### getConfig

▸ **getConfig**(): `Promise`\<[`Config`](Config.md)\>

#### Returns

`Promise`\<[`Config`](Config.md)\>

#### Defined in

lib/core/client/i-client.ts:33

---

### getErrorLog

▸ **getErrorLog**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

lib/core/client/i-client.ts:45

---

### getEvents

▸ **getEvents**(): `Promise`\<[`EventDetails`](EventDetails.md)[]\>

#### Returns

`Promise`\<[`EventDetails`](EventDetails.md)[]\>

#### Defined in

lib/core/client/i-client.ts:43

---

### getHistory

▸ **getHistory**(`params`): `Promise`\<[`State`](State.md)[][]\>

Returns an array of state changes from the past

#### Parameters

| Name     | Type                                      |
| :------- | :---------------------------------------- |
| `params` | [`GetHistoryParams`](GetHistoryParams.md) |

#### Returns

`Promise`\<[`State`](State.md)[][]\>

#### Defined in

lib/core/client/i-client.ts:25

---

### getLogbook

▸ **getLogbook**(`params?`): `Promise`\<[`LogBookEntry`](LogBookEntry.md)[]\>

#### Parameters

| Name      | Type                                      |
| :-------- | :---------------------------------------- |
| `params?` | [`GetLogbookParams`](GetLogbookParams.md) |

#### Returns

`Promise`\<[`LogBookEntry`](LogBookEntry.md)[]\>

#### Defined in

lib/core/client/i-client.ts:27

---

### getPanels

▸ **getPanels**(): `Promise`\<`Record`\<`string`, [`Panel`](Panel.md)\>\>

#### Returns

`Promise`\<`Record`\<`string`, [`Panel`](Panel.md)\>\>

#### Defined in

lib/core/client/i-client.ts:39

---

### getServiceDomains

▸ **getServiceDomains**(): `Promise`\<[`ServiceDomainDetails`](ServiceDomainDetails.md)[]\>

#### Returns

`Promise`\<[`ServiceDomainDetails`](ServiceDomainDetails.md)[]\>

#### Defined in

lib/core/client/i-client.ts:37

---

### getServices

▸ **getServices**(): `Promise`\<[`Services`](../README.md#services)\>

#### Returns

`Promise`\<[`Services`](../README.md#services)\>

#### Defined in

lib/core/client/i-client.ts:35

---

### getState

▸ **getState**(`entityId`): `Promise`\<[`State`](State.md)\>

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `entityId` | `string` |

#### Returns

`Promise`\<[`State`](State.md)\>

#### Defined in

lib/core/client/i-client.ts:31

---

### getStates

▸ **getStates**(): `Promise`\<[`State`](State.md)[]\>

#### Returns

`Promise`\<[`State`](State.md)[]\>

#### Defined in

lib/core/client/i-client.ts:29

---

### subscribeToEvents

▸ **subscribeToEvents**(`callback`): `Promise`\<`void`\>

#### Parameters

| Name       | Type                                       |
| :--------- | :----------------------------------------- |
| `callback` | (`message`: [`Event`](Event.md)) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

lib/core/client/i-client.ts:47

▸ **subscribeToEvents**(`type`, `callback`): `Promise`\<`void`\>

#### Parameters

| Name       | Type                                       |
| :--------- | :----------------------------------------- |
| `type`     | `string`                                   |
| `callback` | (`message`: [`Event`](Event.md)) => `void` |

#### Returns

`Promise`\<`void`\>

#### Defined in

lib/core/client/i-client.ts:49
