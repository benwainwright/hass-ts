homeassistant-typescript

# homeassistant-typescript

## Table of contents

### Functions

- [getConfig](README.md#getconfig)
- [initialiseClient](README.md#initialiseclient)

### Interfaces

- [CalendarDetails](interfaces/CalendarDetails.md)
- [CallServiceCommand](interfaces/CallServiceCommand.md)
- [CallServiceResponse](interfaces/CallServiceResponse.md)
- [Config](interfaces/Config.md)
- [Context](interfaces/Context.md)
- [Event](interfaces/Event.md)
- [EventDetails](interfaces/EventDetails.md)
- [GetHistoryParams](interfaces/GetHistoryParams.md)
- [GetLogbookParams](interfaces/GetLogbookParams.md)
- [HassArea](interfaces/HassArea.md)
- [HassConfig](interfaces/HassConfig.md)
- [HassDevice](interfaces/HassDevice.md)
- [IClient](interfaces/IClient.md)
- [Logger](interfaces/Logger.md)
- [Panel](interfaces/Panel.md)
- [Service](interfaces/Service.md)
- [ServiceDomainDetails](interfaces/ServiceDomainDetails.md)
- [State](interfaces/State.md)

### Type Aliases

- [LogBookEntry](README.md#logbookentry)

## Functions

### getConfig

▸ **getConfig**(): [`HassConfig`](interfaces/HassConfig.md)

Parse Home Assistant config from environment variables

HASS_TOKEN - access token
HASS_WS_PATH - url path portion for the websocket API
HASS_HTTP_PATH - url path portion for the HTTP API
HASS_HOST - home assistant host
HASS_PORT - home assistant port

Note - will supply the correct default values for the http and
websocket path segment. When executed in the context of an addon,
no environment variables need to be supplied

#### Returns

[`HassConfig`](interfaces/HassConfig.md)

#### Defined in

[lib/core/get-config.ts:29](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/get-config.ts#L29)

___

### initialiseClient

▸ **initialiseClient**(`config`): `Promise`\<[`IClient`](interfaces/IClient.md)\>

Initialise the http and websocket connections and return a client that is ready
to use. Use with [getConfig](README.md#getconfig) to get the correct config values

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`HassConfig`](interfaces/HassConfig.md) | Config for the Home Assistant client |

#### Returns

`Promise`\<[`IClient`](interfaces/IClient.md)\>

**`Example`**

```ts
const config = getConfig()
const client = await initialiseClient(config)
```

#### Defined in

[lib/core/initialise-client.ts:20](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/initialise-client.ts#L20)

## Type Aliases

### LogBookEntry

Ƭ **LogBookEntry**: `LogbookStatechangeEntry` \| `LogbookStatechangeEntry2` \| `LogbookTriggerEntry`

An entry in the Home Assistant logbook

#### Defined in

[lib/types/logbook-entry.ts:6](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/types/logbook-entry.ts#L6)
