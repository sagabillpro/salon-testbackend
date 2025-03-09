import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Services } from "../../services/entities/services.entity";
import { PurchaseHeaders } from "./purchase-headers.entity";

@Entity("items_stock_track")
export class ItemsStockTrack {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", nullable: true })
  serviceId: number;

  @Column({ type: "int", nullable: true })
  serviceRecordId: number;

  @ManyToOne(() => Services)
  @JoinColumn([
    { name: "serviceRecordId", referencedColumnName: "recordId" },
    { name: "serviceId", referencedColumnName: "id" },
  ])
  service: Services;
  @Column({ type: "int", nullable: true })
  txnHeaderId: number;

  @Column({ type: "int", nullable: true })
  txnHeaderRecordId: number;

  @ManyToOne(() => PurchaseHeaders, {
    onDelete: "CASCADE", // Automatically remove this line when the sale header is deleted
  })
  @JoinColumn([
    { name: "txnHeaderRecordId", referencedColumnName: "recordId" },
    { name: "txnHeaderId", referencedColumnName: "id" },
  ])
  txnHeader: PurchaseHeaders;

  @Column({ type: "decimal", nullable: true })
  unitPrice: number;

  @Column({ type: "varchar", nullable: true })
  stockNumber: string;

  @Column({ type: "int", nullable: false })
  quantityAdded: number;

  @Column({ type: "int", nullable: false })
  quantityUvailable: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
  
  @Column({ type: "int", default: 0 })
  isInactive: number;
}
