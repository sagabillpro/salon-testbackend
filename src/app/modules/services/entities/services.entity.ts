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
} from "typeorm";
import { Taxes } from "../../taxes/entities/taxes.entity";
import { DItemType } from "../../general-data/entities";
import { ItemAvailable } from "../../sale-items/entities/item-stocks.entity";
import { Users } from "../../auth/entities/user.entity";
import { handler } from "../../../config/dbconfig";

@Entity("services")
@Unique(["recordId", "id"])
export class Services {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "int", nullable: true })
  taxId: number;

  @Column({ type: "int", nullable: true })
  taxRecordId: number;

  @ManyToOne(() => Taxes, { nullable: true })
  @JoinColumn([
    { name: "taxRecordId", referencedColumnName: "recordId" },
    { name: "taxId", referencedColumnName: "id" },
  ])
  tax: Taxes;

  @ManyToOne(() => DItemType, { nullable: true })
  @JoinColumn()
  itemType: DItemType;

  @Column({ type: "int", nullable: true })
  inStockId: number;

  @Column({ type: "int", nullable: true })
  inStockRecordId: number;

  @OneToOne(() => Taxes, { nullable: true })
  @JoinColumn([
    { name: "inStockRecordId", referencedColumnName: "recordId" },
    { name: "inStockId", referencedColumnName: "id" },
  ])
  inStock: ItemAvailable;

  @Column({ type: "int", nullable: false })
  taxAmount: number;

  @Column({ type: "int", nullable: false })
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

  @Column({
    type: "decimal",
    precision: 5,
    scale: 2,
    default: 0,
    nullable: true,
  })
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

  @Column({ type: "varchar", length: 100, unique: true, nullable: true })
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

  //************newly added columns
  @Column({ type: "int", nullable: true })
  recordId: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  modifiedBy: Users;

  @BeforeInsert()
  async generateRecordId?() {
    if (!this.recordId) {
      const dataSource = await handler();
      const lastRecord = await dataSource.getRepository(Services).findOne({
        where: {},
        order: { recordId: "DESC" },
      });
      this.recordId = lastRecord ? lastRecord.recordId + 1 : 1;
    }
  }

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;
}
