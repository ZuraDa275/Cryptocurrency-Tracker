import { sign } from "jsonwebtoken";
import "dotenv/config";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { CryptoBeingTracked } from "./CryptoBeingTracked";
import { Following } from "./Following";
import { Followers } from "./Followers";
import { ProfileImage } from "./ProfileImage";
import { InvestedCrypto } from "./InvestedCrypto";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cryptoBucks: number;

  public getAccessToken() {
    return sign({ id: this.id }, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "1m",
    });
  }
  public getRefreshToken() {
    return sign({ id: this.id }, process.env.REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });
  }
  @ManyToMany(() => CryptoBeingTracked, {
    cascade: true,
  })
  @JoinTable()
  trackedCryptos: CryptoBeingTracked[];

  @OneToMany(() => Following, (following) => following.client)
  following: Following[];

  @OneToMany(() => Followers, (followers) => followers.client)
  followers: Followers[];

  @OneToOne(() => ProfileImage)
  @JoinColumn()
  profile: ProfileImage;

  @OneToMany(() => InvestedCrypto, (investedCrypto) => investedCrypto.client)
  investments: InvestedCrypto[];
}
