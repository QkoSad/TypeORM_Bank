import express from "express";
import { createConnection } from "typeorm";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import { createClientRouter } from "./routers/create_client";
import { createBankerRouter } from "./routers/create_banker";
import { createTransactionRouter } from "./routers/create_transaction";
import { connectBankerToClientRouter } from "./routers/connect_client_to_banler";
import { DeleteClientRouter } from "./routers/delete_client";
import { fetchClientRouter } from "./routers/fetch_client";

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "password",
      database: "typeorm",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });

    app.use(express.json());

    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createTransactionRouter);
    app.use(connectBankerToClientRouter);
    app.use(DeleteClientRouter);
    app.use(fetchClientRouter);

    app.listen(8080, () => {
      console.log("Now running on port 8080");
    });

    console.log("connected to Postgres");
  } catch (err) {
    console.error(err);
    throw new Error("Unable to connect to DB");
  }
};

main();
