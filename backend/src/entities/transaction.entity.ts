import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
import { DecimalTransformer } from "../utils/decimalTransformer";

@Entity("transaction")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  debitedAccount: User;

  @ManyToOne(() => User)
  creditedAccount: User;
}
