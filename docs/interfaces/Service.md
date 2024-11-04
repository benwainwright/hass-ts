[homeassistant-typescript](../README.md) / Service

# Interface: Service

## Table of contents

### Properties

- [Response](Service.md#response)
- [description](Service.md#description)
- [fields](Service.md#fields)
- [name](Service.md#name)
- [target](Service.md#target)

## Properties

### Response

• **Response**: `unknown`

#### Defined in

[lib/types/services.ts:9](https://github.com/benwainwright/hass-ts/blob/24908fa/src/lib/types/services.ts#L9)

___

### description

• **description**: `string`

#### Defined in

[lib/types/services.ts:6](https://github.com/benwainwright/hass-ts/blob/24908fa/src/lib/types/services.ts#L6)

___

### fields

• **fields**: `ServiceFields`

#### Defined in

[lib/types/services.ts:7](https://github.com/benwainwright/hass-ts/blob/24908fa/src/lib/types/services.ts#L7)

___

### name

• **name**: `string`

#### Defined in

[lib/types/services.ts:5](https://github.com/benwainwright/hass-ts/blob/24908fa/src/lib/types/services.ts#L5)

___

### target

• `Optional` **target**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `device?` | `DeviceTarget`[] |
| `entity?` | `EntityTarget`[] |

#### Defined in

[lib/types/services.ts:8](https://github.com/benwainwright/hass-ts/blob/24908fa/src/lib/types/services.ts#L8)
