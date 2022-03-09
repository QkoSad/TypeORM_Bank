import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";
export enum TransactionsTypes {
  DEPOSIT = "deposit",
  WITHDRAW = "witdraw",
}

@Entity("transaction")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: TransactionsTypes })
  type: string;

  @Column({ type: "numeric" })
  ammount: number;

  @ManyToOne(() => Client, (client) => client.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "client_id" })
  client: Client;
}
