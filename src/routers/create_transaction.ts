import express from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionsTypes } from "../entities/Transaction";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {
  const { clientId } = req.params;
  const { type, ammount } = req.body;

  const client = await Client.findOne(parseInt(clientId));
  if (!client) {
    return res.json({
      msg: "client not found",
    });
  }
  const transaction = Transaction.create({
    type,
    ammount,
    client,
  });
  await transaction.save();
  if (type === TransactionsTypes.DEPOSIT) {
    client.balance = client.balance + ammount;
  } else if (type === TransactionsTypes.WITHDRAW) {
    client.balance = client.balance - ammount;
  }
  await client.save();
  return res.json({ msg: "transaction successful" });
});

export { router as createTransactionRouter };
