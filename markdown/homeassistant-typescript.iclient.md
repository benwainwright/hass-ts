<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [homeassistant-typescript](./homeassistant-typescript.md) &gt; [IClient](./homeassistant-typescript.iclient.md)

## IClient interface

The Home Assistant client API. Once initialised, the client will make requests via \*\*either\*\* the websocket or HTTP API where appropriate

**Signature:**

```typescript
export interface IClient
```

## Methods

<table><thead><tr><th>

Method

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

[callService(params)](./homeassistant-typescript.iclient.callservice.md)

</td><td>

Call a service action

See [https://developers.home-assistant.io/docs/api/websocket/\#calling-a-service-action](https://developers.home-assistant.io/docs/api/websocket/#calling-a-service-action)

</td></tr>
<tr><td>

[close()](./homeassistant-typescript.iclient.close.md)

</td><td>

</td></tr>
<tr><td>

[getAreas()](./homeassistant-typescript.iclient.getareas.md)

</td><td>

Gets a list of areas registered with home assistant

</td></tr>
<tr><td>

[getCalendars()](./homeassistant-typescript.iclient.getcalendars.md)

</td><td>

</td></tr>
<tr><td>

[getConfig()](./homeassistant-typescript.iclient.getconfig.md)

</td><td>

Get the current Home Assistant configuration

</td></tr>
<tr><td>

[getDevices()](./homeassistant-typescript.iclient.getdevices.md)

</td><td>

Get a list of all devices currently registered by home assistant

</td></tr>
<tr><td>

[getEntities()](./homeassistant-typescript.iclient.getentities.md)

</td><td>

Get a list of all entities currently registered by home assistant

</td></tr>
<tr><td>

[getErrorLog()](./homeassistant-typescript.iclient.geterrorlog.md)

</td><td>

</td></tr>
<tr><td>

[getEvents()](./homeassistant-typescript.iclient.getevents.md)

</td><td>

</td></tr>
<tr><td>

[getHistory(params)](./homeassistant-typescript.iclient.gethistory.md)

</td><td>

Returns an array of state changes from the past

</td></tr>
<tr><td>

[getLogbook(params)](./homeassistant-typescript.iclient.getlogbook.md)

</td><td>

Gets a list of entries from the Home Assistant logbook

</td></tr>
<tr><td>

[getPanels()](./homeassistant-typescript.iclient.getpanels.md)

</td><td>

</td></tr>
<tr><td>

[getServiceDomains()](./homeassistant-typescript.iclient.getservicedomains.md)

</td><td>

Get a list of

</td></tr>
<tr><td>

[getServices()](./homeassistant-typescript.iclient.getservices.md)

</td><td>

Get details of all the services currently registered in home assistant, grouped by domain

</td></tr>
<tr><td>

[getState(entityId)](./homeassistant-typescript.iclient.getstate.md)

</td><td>

Get the current state of a specific entity

</td></tr>
<tr><td>

[getStates()](./homeassistant-typescript.iclient.getstates.md)

</td><td>

Get a list of the current states of all entities

</td></tr>
<tr><td>

[registerTrigger(trigger, callback)](./homeassistant-typescript.iclient.registertrigger.md)

</td><td>

Subscribe to a trigger. See https://developers.home-assistant.io/docs/api/websocket/\#subscribe-to-trigger

</td></tr>
<tr><td>

[subscribeToEvents(callback)](./homeassistant-typescript.iclient.subscribetoevents.md)

</td><td>

</td></tr>
<tr><td>

[subscribeToEvents(type, callback)](./homeassistant-typescript.iclient.subscribetoevents_1.md)

</td><td>

</td></tr>
</tbody></table>
