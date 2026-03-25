import { client, pool } from "@libs/pg";
import { Pool, Client } from "pg";

class DBClass {
  client: Client = client;
  pool: Pool = pool;
  constructor() {
    pool.on("error", (err: any) => {
      console.error("Error in pool: ", err);
    });
    pool.on("connect", () => {
      console.log("Pool connected");
    });
  }
}

const DB = new DBClass();
export { DB };
