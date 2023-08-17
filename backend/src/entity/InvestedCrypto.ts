import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Client } from "./User";

@Entity()
export class InvestedCrypto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  investedCryptoName: string;

  @Column()
  amtInWallet: string;

  @Column()
  investedCryptoImage: string;

  @Column()
  investedCryptoSymbol: string;

  @Column()
  investedCryptoID: string;

  @ManyToOne(() => Client, (client) => client.investments)
  client: Client;
}
