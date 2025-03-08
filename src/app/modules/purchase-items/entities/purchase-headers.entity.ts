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
  DeleteDateColumn,
  BeforeInsert,
  Unique,
} from "typeorm";
import { Users } from "../../auth/entities/user.entity";
import { Customer } from "../../customer/entities/customer.entity";
import {
  City,
  Country,
  DPaymentType,
  DTransactionStatus,
  States,
} from "../../general-data/entities";

import { PurchaseLines } from "./purchase-lines.entity";
import { InventoryLines } from "../../sale-items/entities/inventory-lines.entity";
import { Supplier } from "../../suppliers/entities/supplier.entity";
import { Contact } from "../../contacts/entities/contact.entity";
import { handler } from "../../../config/dbconfig";

@Entity("purchase_headers")
@Unique(["recordId", "id"])
export class PurchaseHeaders {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 600, nullable: true })
  description: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  txnDate: string;

  @CreateDateColumn({ type: "varchar", nullable: true })
  saleInvoiceNumber: string;

  @Column({ type: "int", nullable: true })
  supplierId: number;

  @Column({ type: "int", nullable: true })
  supplierRecordId: number;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn([
    { name: "supplierRecordId", referencedColumnName: "recordId" },
    { name: "supplierId", referencedColumnName: "id" },
  ])
  supplier: Contact;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @ManyToOne(() => DPaymentType)
  @JoinColumn()
  paymentType: DPaymentType;

  @ManyToOne(() => DTransactionStatus, { nullable: true })
  @JoinColumn()
  transactionStatus: DTransactionStatus;

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
  //************newly added columns
  @Column({ type: "int", nullable: true })
  recordId: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  modifiedBy: Users;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @BeforeInsert()
  async generateRecordId?() {
    if (!this.recordId) {
      const dataSource = await handler();
      const lastRecord = await dataSource
        .getRepository(PurchaseHeaders)
        .findOne({
          where: {},
          order: { recordId: "DESC" },
        });
      console.log(lastRecord);
      this.recordId = lastRecord ? lastRecord.recordId + 1 : 1;
    }
  }

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;
}
