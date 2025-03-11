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

@Entity("stock_adjustment_headers")
export class StockAdjustmentHeaders {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 600, nullable: true })
  description: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  txnDate: string;

  @ManyToOne(() => DTransactionStatus, { nullable: true })
  @JoinColumn()
  transactionStatus: DTransactionStatus;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @OneToMany(() => InventoryLines, (line) => line.purchase, {
    cascade: true,
    onDelete: "CASCADE",
  })
  inventoryLines: InventoryLines[];

  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  modifiedBy: Users;

  @VersionColumn({ nullable: true })
  version: number;
}
