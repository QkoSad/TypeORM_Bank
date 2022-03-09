import express from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;

  const client = await Client.findOne(parseInt(clientId));

  const banker = await Banker.findOne(parseInt(bankerId));

  if (!banker || !client) {
    return res.json({ msg: "Banker or client not exist" });
  }
  banker.clients = [client];
  await banker.save();

  return res.json({ msg: "banker connceted successfully" });
});

export { router as connectBankerToClientRouter };
