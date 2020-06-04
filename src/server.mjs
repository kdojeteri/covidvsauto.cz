import Koa from 'koa';
import { statSync, readFileSync } from 'fs';
import { makeHtml } from './html.mjs';
import { updateData } from './sources/updater.mjs';


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





updateData().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log("APP READY on port " + port);
}).catch(console.error);
