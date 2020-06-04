import Koa from 'koa';
import serveStatic from 'koa-static';
import { statSync, readFileSync } from 'fs';
import { makeHtml } from './makeViews.mjs';
import { updateData } from './sources/updater.mjs';


const app = new Koa();


app.use(serveStatic("browser"));


updateData().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log("APP READY on port " + port);
}).catch(console.error);
