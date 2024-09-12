[hass-ts](../README.md) / GetHistoryParams

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

lib/core/client/get-history-params.ts:13

---

### minimalResponse

• `Optional` **minimalResponse**: `boolean`

only return last_changed and last_updated attributes for states
other than the first and last state in the period (much faster)

#### Defined in

lib/core/client/get-history-params.ts:19

---

### noAttributes

• `Optional` **noAttributes**: `boolean`

Skip returning attributes from the database (much faster)

#### Defined in

lib/core/client/get-history-params.ts:24

---

### significantChangesOnly

• `Optional` **significantChangesOnly**: `boolean`

Only return significant state changes

#### Defined in

lib/core/client/get-history-params.ts:29

---

### timestamp

• `Optional` **timestamp**: `Date`

Beginning of the history period - defaults to 1 day before the request

#### Defined in

lib/core/client/get-history-params.ts:8
