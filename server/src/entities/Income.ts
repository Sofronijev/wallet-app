import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Type } from "./Type";
import { User } from "./User";

@Entity("incomes")
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  amount: string;

  @Column({
    length: 500,
  })
  description: string;

  @Column({
    type: "date",
  })
  date: string;

  @ManyToOne(() => User, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({
    name: "user_id",
  })
  userId: User;

  @ManyToOne(() => Type, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn({
    name: "type_id",
  })
  typeId: Type;

  @ManyToOne(() => Category, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn({
    name: "category_id",
  })
  categoryId: Category;
}
