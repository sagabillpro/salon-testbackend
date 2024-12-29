import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { SaleHeaders } from "./sale-header.entity";
import { Services } from "../../services/entities/services.entity";
import { Taxes } from "../../taxes/entities/taxes.entity";
import { PurchaseHeaders } from "../../purchase-items/entities/purchase-headers.entity";
import { ItemsStockTrack } from "../../purchase-items/entities/item-stock-track.entity";

@Entity("inventory_lines")
export class InventoryLines {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ManyToOne(() => PurchaseHeaders, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  purchase: PurchaseHeaders;

  @ManyToOne(() => ItemsStockTrack)
  @JoinColumn()
  stock: ItemsStockTrack;

  @ManyToOne(() => Services)
  @JoinColumn()
  service: Services;

  @ManyToOne(() => SaleHeaders, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  sale: SaleHeaders;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
}
