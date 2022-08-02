// import dotenv from "dotenv";
import Koa from "koa";
import render from "koa-ejs";
import mount from "koa-mount";
import koaStatic from "koa-static";
import path from "path";
import { configuration } from "./configs/configuration";
import { oidc } from "./configs/provider";
import connectMongodb from "./db/mongodb/connection";
import router from "./routes";
import logger from "koa-logger"
import { config } from "./config";

// dotenv.config({ path: path.resolve("oidc/.env") });

const start = async () => {
  await connectMongodb();

  const app = new Koa();
  render(app as any, {
    cache: false,
    viewExt: "ejs",
    layout: false,
    root: path.resolve("oidc/src/views"),
  });

  const provider = oidc(config.ISSUER as string, configuration);
  
  app.use(logger())
  app.use(koaStatic(path.resolve("../public")));
  app.use(router(provider).routes());
  app.use(mount(provider.app));

  app.listen(config.PORT, () => {
    console.log(
      `oidc-provider listening on port ${config.PORT}, check http://localhost:${config.PORT}/.well-known/openid-configuration`
    );
  });
};

void start();
