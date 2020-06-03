// Inicializuje data

import {data} from './sources/data.mjs';
import {aktualizuj as updateCovid} from './sources/covid.mjs';
import {aktualizuj as updateZraneni} from './sources/zraneni.mjs';

export async function initialize() {
    console.log("INITIALIZING");

    await updateCovid();
    await updateZraneni();

    console.log(data);
}

initialize().catch(console.error)