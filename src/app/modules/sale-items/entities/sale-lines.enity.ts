import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
  Unique,
} from "typeorm";
import { SaleHeaders } from "./sale-header.entity";
import { Services } from "../../services/entities/services.entity";
import { Taxes } from "../../taxes/entities/taxes.entity";

@Entity("sale_lines")
//@Unique(["recordId", "id"])
export class SaleLines {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", nullable: true })
  txnHeaderId: number;

  @ManyToOne(() => SaleHeaders, {
    onDelete: "CASCADE", // Automatically remove this line when the sale header is deleted
  })
  @JoinColumn()
  txnHeader: SaleHeaders;

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

  @Column({ type: "int", nullable: false })
  quantity: number;

  @Column({ type: "int", nullable: false })
  rate: number;

  @Column({ type: "int", nullable: true })
  costPrice: number;

  @Column({ type: "decimal", nullable: true })
  unitPrice: number;

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

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;
}
