import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { DecimalTransformer } from "../utils/decimalTransformer";

@Entity("account")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    default: 100.0,
    transformer: new DecimalTransformer(),
  })
  balance: number;
}
