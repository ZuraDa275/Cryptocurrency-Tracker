import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Client } from "./User";

@Entity()
export class Following {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followingUserName: string;

  @Column({ nullable: true })
  followingUserProfile: string;

  @ManyToOne(() => Client, (client) => client.following)
  client: Client;
}
