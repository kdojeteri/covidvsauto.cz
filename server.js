const Koa = require("koa");
const fs = require("fs");
const app = new Koa();

const indexHtml = fs.readFileSync("browser/index.html");

fs.existsSync()
 
// response
app.use(ctx => {
  console.log("REQUESTING", ctx.path);

  if (fs.statSync("browser" + ctx.path).isFile()) {
    const body = fs.readFileSync("browser" + ctx.path);

    ctx.body = body;
  } else {
    ctx.type = "text/html"; // MIME
    ctx.body = indexHtml;
  }
});
 
app.listen(3000);