[homeassistant-typescript](../README.md) / HassArea

# Interface: HassArea

An area registered with home assistant

## Table of contents

### Properties

- [aliases](HassArea.md#aliases)
- [area\_id](HassArea.md#area_id)
- [created\_at](HassArea.md#created_at)
- [floor\_id](HassArea.md#floor_id)
- [icon](HassArea.md#icon)
- [labels](HassArea.md#labels)
- [modified\_at](HassArea.md#modified_at)
- [name](HassArea.md#name)
- [picture](HassArea.md#picture)

## Properties

### aliases

• **aliases**: `string`[]

Aliases for this area

#### Defined in

[lib/types/area.ts:10](https://github.com/benwainwright/hass-ts/blob/283d3f2/src/lib/types/area.ts#L10)

___

### area\_id

• **area\_id**: `string`

Unique id that can be used to identify this area

#### Defined in

[lib/types/area.ts:15](https://github.com/benwainwright/hass-ts/blob/283d3f2/src/lib/types/area.ts#L15)

___

### created\_at

• **created\_at**: `number`

When was the area created (Unix timestamp in seconds)

#### Defined in

[lib/types/area.ts:45](https://github.com/benwainwright/hass-ts/blob/283d3f2/src/lib/types/area.ts#L45)

___

### floor\_id

• **floor\_id**: ``null`` \| `string`

What floor is this area on

#### Defined in

[lib/types/area.ts:20](https://github.com/benwainwright/hass-ts/blob/283d3f2/src/lib/types/area.ts#L20)

___

### icon

• **icon**: ``null`` \| `string`

Material icon used to represent this area

#### Defined in

[lib/types/area.ts:25](https://github.com/benwainwright/hass-ts/blob/283d3f2/src/lib/types/area.ts#L25)

___

### labels

• **labels**: ``null`` \| `string`[]

List of labels associated with this area

#### Defined in

[lib/types/area.ts:30](https://github.com/benwainwright/hass-ts/blob/283d3f2/src/lib/types/area.ts#L30)

___

### modified\_at

• **modified\_at**: `number`

When was the area modified (Unix timestamp in seconds)

#### Defined in

[lib/types/area.ts:50](https://github.com/benwainwright/hass-ts/blob/283d3f2/src/lib/types/area.ts#L50)

___

### name

• **name**: `string`

Name of the area

#### Defined in

[lib/types/area.ts:35](https://github.com/benwainwright/hass-ts/blob/283d3f2/src/lib/types/area.ts#L35)

___

### picture

• **picture**: ``null`` \| `string`

URL for the area picture

#### Defined in

[lib/types/area.ts:40](https://github.com/benwainwright/hass-ts/blob/283d3f2/src/lib/types/area.ts#L40)
