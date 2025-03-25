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
import { UOM } from "../../uom/entities/uom.entity";

@Entity("purchase_lines")
export class PurchaseLines {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", nullable: true })
  txnHeaderId: number;

  @ManyToOne(() => PurchaseHeaders, {
    onDelete: "CASCADE", // Automatically remove this line when the sale header is deleted
  })
  @JoinColumn()
  txnHeader: PurchaseHeaders;

  @Column({ type: "int", nullable: true })
  serviceId: number;

  @ManyToOne(() => Services)
  @JoinColumn()
  service: Services;

  @Column({ type: "int", nullable: true })
  taxId: number;

  @ManyToOne(() => Taxes, { nullable: true })
  @JoinColumn()
  tax: Taxes;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  rate: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  costPrice: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  unitPrice: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  quantity: number;
  @Column({ type: "int", nullable: true })
  uomId: number;

  @ManyToOne(() => UOM, { nullable: true })
  @JoinColumn()
  uom: UOM;
  @Column({ type: "int", nullable: false })
  amount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  discountAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
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
