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
import { SaleLines } from "./sale-lines.enity";
import { InventoryLines } from "./inventory-lines.entity";
import { Contact } from "../../contacts/entities/contact.entity";

@Entity("sale_headers")
export class SaleHeaders {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 600, nullable: true})
  description: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  txnDate: string;

  @ManyToOne(() => Contact)
  @JoinColumn()
  customer: Contact;

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

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @Column({ type: "int", default: 0, nullable: true })
  isService: number;

  @OneToMany(() => SaleLines, (line) => line.txnHeader, {
    cascade: true,
    onDelete: "CASCADE",
  })
  saleLines: SaleLines[];

  @OneToMany(() => InventoryLines, (line) => line.sale, {
    cascade: true,
    onDelete: "CASCADE",
  })
  inventoryLines: InventoryLines[];
}
