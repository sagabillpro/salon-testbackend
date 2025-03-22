import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  DeleteDateColumn,
  BeforeInsert,
  Unique,
  VersionColumn,
} from "typeorm";
import { Company } from "../../modules/company/entities/company.entity";
import { Taxes } from "../../modules/taxes/entities/taxes.entity";
import { DItemType } from "../../modules/general-data/entities";
import { ItemAvailable } from "../../modules/sale-items/entities/item-stocks.entity";
import { Users } from "../../modules/auth/entities/user.entity";

@Entity("services_history")
export class ServicesHistory {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", nullable: false })
  recordId: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "int", nullable: true })
  companyId: number;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn()
  company: Company;

  @Column({ type: "int", nullable: true })
  taxId: number;

  @ManyToOne(() => Taxes, { nullable: true })
  @JoinColumn()
  tax: Taxes;

  @Column({ type: "int", nullable: true })
  itemTypeId: number;

  @ManyToOne(() => DItemType, { nullable: true })
  @JoinColumn()
  itemType: DItemType;

  @Column({ type: "int", nullable: true, unique: false })
  inStockId: number;


  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  taxAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @Column({ type: "int", default: 0, nullable: true })
  isService: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  discount: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  category: string;

  @Column("simple-array", { nullable: true })
  tags: string[];

  @Column({ type: "varchar", length: 100, nullable: true })
  brand: string;

  @Column("simple-array", { nullable: true })
  imageUrls: string[];

  @Column({ type: "boolean", default: false, nullable: true })
  isFeatured: boolean;

  @Column({ type: "varchar", length: 100, nullable: true })
  sku: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  costPrice: number;

  @Column({
    type: "decimal",
    precision: 3,
    scale: 2,
    default: 0,
    nullable: true,
  })
  rating: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  modifiedBy: Users;

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;

  @VersionColumn({ nullable: true })
  version: number;
}
