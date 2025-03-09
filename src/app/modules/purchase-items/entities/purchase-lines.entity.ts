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
import { Services } from "../../services/entities/services.entity";
import { Taxes } from "../../taxes/entities/taxes.entity";
import { PurchaseHeaders } from "./purchase-headers.entity";

@Entity("purchase_lines")
export class PurchaseLines {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

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
  taxId: number;

  @Column({ type: "int", nullable: true })
  taxRecordId: number;

  @ManyToOne(() => Taxes, { nullable: true })
  @JoinColumn([
    { name: "taxRecordId", referencedColumnName: "recordId" },
    { name: "taxId", referencedColumnName: "id" },
  ])
  tax: Taxes;

  @Column({ type: "int", nullable: true })
  rate: number;

  @Column({ type: "int", nullable: true })
  costPrice: number;

  @Column({ type: "decimal", nullable: true })
  unitPrice: number;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @Column({ type: "int", nullable: false })
  amount: number;

  @Column({ type: "int", nullable: true })
  discountAmount: number;

  @Column({ type: "int", nullable: true })
  taxAmount: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;

  @Column({ type: "int", default: 0 })
  isInactive: number;
}
