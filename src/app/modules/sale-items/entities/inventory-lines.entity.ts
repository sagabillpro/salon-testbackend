import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
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

  @Column({ type: "int", nullable: true })
  purchaseId: number;

  @Column({ type: "int", nullable: true })
  purchaseRecordId: number;

  @ManyToOne(() => PurchaseHeaders, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "purchaseRecordId", referencedColumnName: "recordId" },
    { name: "purchaseId", referencedColumnName: "id" },
  ])
  purchase: PurchaseHeaders;

  @ManyToOne(() => ItemsStockTrack)
  @JoinColumn()
  stock: ItemsStockTrack;
  @Column({ type: "int", nullable: true })
  serviceId: number;

  @Column({ type: "int", nullable: true })
  serviceRecordId: number;

  @ManyToOne(() => Services, { nullable: true })
  @JoinColumn([
    { name: "serviceRecordId", referencedColumnName: "recordId" },
    { name: "serviceId", referencedColumnName: "id" },
  ])
  service: Services;

  @Column({ type: "int", nullable: true })
  saleId: number;

  @Column({ type: "int", nullable: true })
  saleRecordId: number;

  @ManyToOne(() => SaleHeaders, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "saleRecordId", referencedColumnName: "recordId" },
    { name: "saleId", referencedColumnName: "id" },
  ])
  sale: SaleHeaders;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @Column({ type: "int", default: 0 })
  isInactive: number;
  
  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;
}
