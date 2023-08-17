import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Client } from "./User";

@Entity()
export class Followers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followersUserName: string;

  @Column({ nullable: true })
  followerUserProfile: string;

  @ManyToOne(() => Client, (client) => client.followers)
  client: Client;
}
