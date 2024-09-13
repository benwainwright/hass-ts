[homeassistant-typescript](../README.md) / GetHistoryParams

# Interface: GetHistoryParams

## Table of contents

### Properties

- [filterEntityId](GetHistoryParams.md#filterentityid)
- [minimalResponse](GetHistoryParams.md#minimalresponse)
- [noAttributes](GetHistoryParams.md#noattributes)
- [significantChangesOnly](GetHistoryParams.md#significantchangesonly)
- [timestamp](GetHistoryParams.md#timestamp)

## Properties

### filterEntityId

• **filterEntityId**: `string`[]

Filter response on one more entities

#### Defined in

[lib/core/client/get-history-params.ts:13](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/get-history-params.ts#L13)

___

### minimalResponse

• `Optional` **minimalResponse**: `boolean`

only return last_changed and last_updated attributes for states
other than the first and last state in the period (much faster)

#### Defined in

[lib/core/client/get-history-params.ts:19](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/get-history-params.ts#L19)

___

### noAttributes

• `Optional` **noAttributes**: `boolean`

Skip returning attributes from the database (much faster)

#### Defined in

[lib/core/client/get-history-params.ts:24](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/get-history-params.ts#L24)

___

### significantChangesOnly

• `Optional` **significantChangesOnly**: `boolean`

Only return significant state changes

#### Defined in

[lib/core/client/get-history-params.ts:29](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/get-history-params.ts#L29)

___

### timestamp

• `Optional` **timestamp**: `Date`

Beginning of the history period - defaults to 1 day before the request

#### Defined in

[lib/core/client/get-history-params.ts:8](https://github.com/benwainwright/hass-ts/blob/65947ed/src/lib/core/client/get-history-params.ts#L8)
