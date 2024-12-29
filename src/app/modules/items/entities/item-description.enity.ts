import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Item } from "./items.entity";

@Entity("item_description")
export class ItemDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 500, nullable: true })
  label: string;

  @Column({ type: "varchar", length: 1000, nullable: true })
  value: string;

  @Column({ type: "int", default: 1 })
  descriptionTypeId: number;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: string;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedDate: string;

  @Column({ type: "int", default: 1 })
  revisionNumber: number;

  //   @Column({ type: "int" })
  //   itemId?: number;
  // Foreign key relationship to the 'items' table
  @ManyToOne(() => Item, (item) => item.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "itemId" })
  item: Item;
}
