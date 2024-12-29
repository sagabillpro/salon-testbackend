import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Users } from "../../auth/entities/user.entity";
import { Customer } from "../../customer/entities/customer.entity";
import {
  City,
  Country,
  DPaymentType,
  States,
} from "../../general-data/entities";

import { PurchaseLines } from "./purchase-lines.entity";
import { InventoryLines } from "../../sale-items/entities/inventory-lines.entity";
import { Supplier } from "../../suppliers/entities/supplier.entity";
import { Contact } from "../../contacts/entities/contact.entity";

@Entity("purchase_headers")
export class PurchaseHeaders {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 600, nullable: true})
  description: string;
  
  @CreateDateColumn({ type: "varchar", nullable: false })
  txnDate: string;

  @CreateDateColumn({ type: "varchar", nullable: true })
  saleInvoiceNumber: string;

  @ManyToOne(() => Contact)
  @JoinColumn()
  supplier: Contact;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @ManyToOne(() => DPaymentType)
  @JoinColumn()
  paymentType: DPaymentType;

  @Column({ type: "int", nullable: true })
  subTotal: number;

  @Column({ type: "int", nullable: true })
  grandTotal: number;

  @Column({ type: "int", nullable: true })
  totalDiscount: number;

  @Column({ type: "int", nullable: true })
  totalTax: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @OneToMany(() => PurchaseLines, (line) => line.txnHeader, {
    cascade: true,
    onDelete: "CASCADE",
  })
  purchaseLines: PurchaseLines[];

  @OneToMany(() => InventoryLines, (line) => line.purchase, {
    cascade: true,
    onDelete: "CASCADE",
  })
  inventoryLines: InventoryLines[];
}
