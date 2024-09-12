import { getConfig, initialiseClient } from "@core";

const client = await initialiseClient(getConfig());

const areas = await client.getAreas();

console.log(areas);
