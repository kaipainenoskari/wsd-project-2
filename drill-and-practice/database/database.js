import { postgres } from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({
    host: "snuffleupagus.db.elephantsql.com",
    database: "vmglszwr",
    username: "vmglszwr",
    password: "DfFGYCvy_ySHhQMA9pQrOYyrQvQJT-lc",
    port: 5432,
    max: 2,
  });
}

export { sql };
