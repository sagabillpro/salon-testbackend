import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  VersionColumn,
} from "typeorm";
import { Users } from "../../auth/entities/user.entity";
import { DTransactionStatus } from "../../general-data/entities";

import { InventoryLines } from "../../sale-items/entities/inventory-lines.entity";
import { StockAdjustmentLines } from "./stock-adjustment-lines.entity";
import { Company } from "../../company/entities/company.entity";


@Entity("stock_adjustment_headers")
export class StockAdjustmentHeaders {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  txnDate: string;

  @Column({ type: "int", nullable: false })
  transactionStatusId: number;
  
  @ManyToOne(() => DTransactionStatus, { nullable: true })
  @JoinColumn()
  transactionStatus: DTransactionStatus;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @OneToMany(() => InventoryLines, (line) => line.stockAdjustment, {
    cascade: true,
    onDelete: "CASCADE",
  })
  inventoryLines: InventoryLines[];

  @OneToMany(() => StockAdjustmentLines, (line) => line.txnHeader, {
    cascade: true,
    onDelete: "CASCADE",
  })
  stockAdjustmentLines: StockAdjustmentLines[];

  @Column({ type: "int", nullable: false })
  createdById: number;

  @Column({ type: "int", nullable: false })
  modifiedById: number;
  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  modifiedBy: Users;
  
  @Column({ type: "int", nullable: true })
  companyId: number;

  @ManyToOne(() => Company)
  @JoinColumn()
  company: Company;
  @VersionColumn({ nullable: true })
  version: number;
}
