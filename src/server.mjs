import Koa from 'koa';
import {statSync, readFileSync} from 'fs';
import { makeHtml } from './html.mjs';
import {aktualizuj as updateCovid} from './sources/covid.mjs';
import {aktualizuj as updateZraneni} from './sources/zraneni.mjs';


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
}

updateData().then(() => {
  app.listen(3000);
  console.log("APP READY on port 3000");
}).catch(console.error);
