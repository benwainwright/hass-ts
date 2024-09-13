import { getConfig, initialiseClient } from "@core";

const client = await initialiseClient(getConfig());

const devices = await client.getServices();

console.log(JSON.stringify(devices, null, 2));
