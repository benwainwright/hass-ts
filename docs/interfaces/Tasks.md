[rtm-typescript](../README.md) / Tasks

# Interface: Tasks

API methods related to tasks

## Table of contents

### Properties

- [getList](Tasks.md#getlist)

## Properties

### getList

• **getList**: (`params`: [`GetListParams`](GetListParams.md)) => `Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `stat`: ``"ok"`` ; `tasks`: \{ list: \{ id: string; taskseries: \{ id: string; created: string; modified: string; name: string; source: string; url: string; location\_id: string; tags: \{ tag: string[]; }; participants: never[]; notes: \{ note: \{ ...; }[]; }; task: \{ ...; }[] \| undefined; }[]; }[]; }  }\>

#### Type declaration

▸ (`params`): `Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `stat`: ``"ok"`` ; `tasks`: \{ list: \{ id: string; taskseries: \{ id: string; created: string; modified: string; name: string; source: string; url: string; location\_id: string; tags: \{ tag: string[]; }; participants: never[]; notes: \{ note: \{ ...; }[]; }; task: \{ ...; }[] \| undefined; }[]; }[]; }  }\>

Retrieves a list of tasks.

If list_id is not specified, all tasks are retrieved, unless filter is specified.
If last_sync is provided, only tasks modified since last_sync will be returned, and each <list> element will have an attribute, current, equal to last_sync.

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetListParams`](GetListParams.md) |

##### Returns

`Promise`\<\{ `api_key?`: `string` ; `callback`: `string` ; `stat`: ``"ok"`` ; `tasks`: \{ list: \{ id: string; taskseries: \{ id: string; created: string; modified: string; name: string; source: string; url: string; location\_id: string; tags: \{ tag: string[]; }; participants: never[]; notes: \{ note: \{ ...; }[]; }; task: \{ ...; }[] \| undefined; }[]; }[]; }  }\>

[SuccessResponse](SuccessResponse.md)

**`Throws`**

[RtmApiFailedResponseError](../classes/RtmApiFailedResponseError.md) if the API responds with a failure

**`Throws`**

[RtmHttpError](../classes/RtmHttpError.md) if the API responds with a non 200 response

#### Defined in

[src/lib/types/namespaces/tasks.ts:47](https://github.com/benwainwright/rtm-typescript/blob/566fc76/src/lib/types/namespaces/tasks.ts#L47)
