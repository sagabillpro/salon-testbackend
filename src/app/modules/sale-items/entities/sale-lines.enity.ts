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

@Entity("sale_lines")
export class SaleLines {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ManyToOne(() => SaleHeaders, {
    onDelete: "CASCADE", // Automatically remove this line when the sale header is deleted
  })
  @JoinColumn()
  txnHeader: SaleHeaders;

  @ManyToOne(() => Services)
  @JoinColumn()
  service: Services;

  @ManyToOne(() => Taxes)
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
}

// const data: SaleLines = {
//   amount: 11,
//   createdDate: "",
//   discountAmount: 3,
//   id: "new1732509039842ci28gux",
//   modifiedDate: "",
//   quantity: 1,
//   rate: 12,
//   service: { id: 5, name: "Trimming" },
//   tax: { id: 1, percentage: 18 },
//   taxAmount: 2,
//   txnHeader: { id: 0 },
// };
