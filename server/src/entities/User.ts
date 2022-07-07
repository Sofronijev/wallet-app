import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    length: 2048,
  })
  password: string;

  @Column({
    unique: true,
  })
  email: string;
}
