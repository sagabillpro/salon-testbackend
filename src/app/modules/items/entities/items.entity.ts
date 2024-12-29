import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { ItemDescription } from "./item-description.enity";
import { ItemImage } from "./item-images.entity";

@Entity("items")
export class Item {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255 })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @Column({ type: "int", nullable: false })
  salePrice: number;

  @Column({ type: "int", nullable: true })
  discount: number;

  @Column({ type: "varchar", length: 255, nullable: true, })
  dimension: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @Column({ type: "int", default: 1 })
  revisionNumber: number;

  @OneToMany(() => ItemImage, (itemImage) => itemImage.item)
  itemImage: ItemImage[];

  @OneToMany(() => ItemDescription, (itemDescription) => itemDescription.item)
  itemDescription: ItemDescription[];
}
