import { MikroORM } from "@mikro-orm/core";
import { IS_PRODUCTION } from "./constants";
async function main() {
  const orm = await MikroORM.init({
    dbName: "",
    type: "postgresql",
    debug: !IS_PRODUCTION,});
}

main();
