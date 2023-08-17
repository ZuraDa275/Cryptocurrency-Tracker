import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class CryptoBeingTracked {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cryptoName: string;

  @Column()
  cryptoImage: string;

  @Column()
  cryptoID: string;

  @CreateDateColumn()
  cryptoTrackedDate: Date;
}
