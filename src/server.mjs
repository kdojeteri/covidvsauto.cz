import Koa from 'koa';
import {statSync, readFileSync} from 'fs';
import {data} from './sources/data.mjs';
import {aktualizuj as updateCovid} from './sources/covid.mjs';
import {aktualizuj as updateZraneni} from './sources/zraneni.mjs';
import { makeHtml } from './html.mjs';

var dateFns = require("date-fns")

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
 
app.listen(3000);
console.log("APP READY on port 3000");
