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
import { StockAdjustmentHeaders } from "./stock-adjustment-headers.entity";

@Entity("stock_adjustment_lines")
export class StockAdjustmentLines {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", nullable: true })
  txnHeaderId: number;

  @ManyToOne(() => StockAdjustmentHeaders, {
    onDelete: "CASCADE", // Automatically remove this line when the sale header is deleted
  })
  @JoinColumn()
  txnHeader: StockAdjustmentHeaders;

  @Column({ type: "int", nullable: true })
  serviceId: number;

  @ManyToOne(() => Services)
  @JoinColumn()
  service: Services;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
}
