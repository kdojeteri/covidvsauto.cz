import Koa from 'koa';
import {statSync, readFileSync} from 'fs';
import Handlebars from 'handlebars';
import {data} from './sources/data.mjs';
import {aktualizuj as updateCovid} from './sources/covid.mjs';
import {aktualizuj as updateZraneni} from './sources/zraneni.mjs';

var dateFns = require("date-fns")

const app = new Koa();

const indexHtml = readFileSync("browser/index.html");

const template = Handlebars.compile(indexHtml.toString());
 
// response
app.use(ctx => {
  console.log("REQUESTING", ctx.path);

  if (statSync("browser" + ctx.path).isFile()) {
    const body = readFileSync("browser" + ctx.path);

    ctx.body = body;
  } else {
    const dummyData = {
      covid_datum: "1. 6. 2020",
      nehody_datum: "1. 6. 2020",
      kraje: [
        "Jihomoravský",
        "Moravskoslezský"
      ]
    }

    ctx.type = "text/html"; // MIME
    ctx.body = template(dummyData);
  }
});
 
app.listen(3000);
