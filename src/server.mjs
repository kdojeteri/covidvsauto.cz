import Koa from 'koa';
import {statSync, readFileSync} from 'fs';
import { makeHtml } from './html.mjs';
import {initialize} from './initialize.mjs';

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

initialize().then(() => {
  app.listen(3000);
  console.log("APP READY on port 3000");
});
