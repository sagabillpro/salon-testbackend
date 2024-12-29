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
import { Taxes } from "../../taxes/entities/taxes.entity";
import { PurchaseHeaders } from "./purchase-headers.entity";

@Entity("purchase_lines")
export class PurchaseLines {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ManyToOne(() => PurchaseHeaders, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  txnHeader: PurchaseHeaders;

  @ManyToOne(() => Services)
  @JoinColumn()
  service: Services;

  @ManyToOne(() => Taxes)
  @JoinColumn()
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
}
