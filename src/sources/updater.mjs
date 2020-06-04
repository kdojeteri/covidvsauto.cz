
import dateFns from 'date-fns';
import { data } from './data.mjs';
import { aktualizuj as updateCovid } from './covid.mjs';
import { aktualizuj as updateZraneni } from './zraneni.mjs';
import { renderFiles } from '../makeViews.mjs';

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

    return dateFns.format(nextRunDate, "d. M. yyyy HH:mm")

}

export async function updateData() {
    console.log("UPDATING DATA");

    await updateCovid();
    await updateZraneni();

    console.log("Got data", data);

    console.log("RENDERING TEMPLATES");

    await renderFiles();

    const nextDate = scheduleUpdate();

    console.log("data will update on " + nextDate);
}