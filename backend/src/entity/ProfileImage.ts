import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ProfileImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  profileImage: string;
}
