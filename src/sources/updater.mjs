
import dateFns from 'date-fns';
import data from './data.mjs';
import {updateCovid} from './covid.mjs';
import {updateZraneni} from './zraneni.mjs';

function scheduleUpdate() {
    const tomorrow = dateFns.addDays(new Date(), 1);

    const nextRunDate = dateFns.set(
        tomorrow,
        { hours: 4, minutes: 0, seconds: 0, milliseconds: 0 }
    );

    const ms = dateFns.differenceInMilliseconds(nextRunDate, new Date());

    setTimeout(
        updateData,
        ms
    );

    console.log("data will update on " + dateFns.formatISO(nextRunDate));
}

async function updateData() {
    console.log("UPDATING DATA");

    await updateCovid();
    await updateZraneni();

    console.log("Got data", data);

    scheduleUpdate();
}