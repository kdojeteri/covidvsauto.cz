import Koa from 'koa';
import { statSync, readFileSync } from 'fs';
import { makeHtml } from './html.mjs';
import { aktualizuj as updateCovid } from './sources/covid.mjs';
import { aktualizuj as updateZraneni } from './sources/zraneni.mjs';
import { data } from './sources/data.mjs';
import dateFns from 'date-fns';


const app = new Koa();

// response
app.use(ctx => {
  console.log("REQUESTING", ctx.path);

  try {
    if (statSync("browser" + ctx.path).isFile()) {
      const body = readFileSync("browser" + ctx.path);

      ctx.body = body;
    } else {
      ctx.type = "text/html"; // MIME
      ctx.body = makeHtml();
    }
  } catch (e) {
    ctx.status = 404;
    console.error(e);
  }
});


async function updateData() {
  console.log("UPDATING DATA");

  await updateCovid();
  await updateZraneni();

  console.log("Got data", data);

  const nextRunDate = dateFns.set(
    dateFns.addDays(
      new Date(),
      1
    ),
    { hours: 4, minutes: 0, seconds: 0, milliseconds: 0 }
  );

  const ms = dateFns.differenceInMilliseconds(nextRunDate, new Date());

  setTimeout(
    updateData,
    ms
  );

  console.log("data will update on " + dateFns.formatISO(nextRunDate));
}



updateData().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log("APP READY on port " + port);
}).catch(console.error);
