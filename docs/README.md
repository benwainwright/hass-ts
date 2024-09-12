homeassistant-typescript

# homeassistant-typescript

## Table of contents

### Functions

- [initialiseClient](README.md#initialiseclient)

### Interfaces

- [CalendarDetails](interfaces/CalendarDetails.md)
- [Config](interfaces/Config.md)
- [Context](interfaces/Context.md)
- [Event](interfaces/Event.md)
- [EventDetails](interfaces/EventDetails.md)
- [GetHistoryParams](interfaces/GetHistoryParams.md)
- [GetLogbookParams](interfaces/GetLogbookParams.md)
- [HassClientConfig](interfaces/HassClientConfig.md)
- [IClient](interfaces/IClient.md)
- [LogBookEntry](interfaces/LogBookEntry.md)
- [Logger](interfaces/Logger.md)
- [Panel](interfaces/Panel.md)
- [Service](interfaces/Service.md)
- [ServiceDomainDetails](interfaces/ServiceDomainDetails.md)
- [State](interfaces/State.md)

### Type Aliases

- [Services](README.md#services)

## Functions

### initialiseClient

▸ **initialiseClient**(`config`): `Promise`\<[`IClient`](interfaces/IClient.md)\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`HassClientConfig`](interfaces/HassClientConfig.md) | Config for the Home Assistant client |

#### Returns

`Promise`\<[`IClient`](interfaces/IClient.md)\>

#### Defined in

[lib/core/initialise-client.ts:11](https://github.com/benwainwright/hass-ts/blob/c03f283/src/lib/core/initialise-client.ts#L11)

## Type Aliases

### Services

Ƭ **Services**: `Object`

#### Index signature

▪ [key: `string`]: \{ `[key: string]`: [`Service`](interfaces/Service.md);  }

#### Defined in

[lib/types/services.ts:4](https://github.com/benwainwright/hass-ts/blob/c03f283/src/lib/types/services.ts#L4)
