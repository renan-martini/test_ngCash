import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Account } from "./account.entity";
import { Transaction } from "./transaction.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  username: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
  cashOuts: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
  cashIns: Transaction[];
}
