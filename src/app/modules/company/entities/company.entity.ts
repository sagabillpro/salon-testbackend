import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  DeleteDateColumn,
  Unique,
} from "typeorm";
import { Country, States, City } from "../../general-data/entities";
import { Branch } from "../../branches/entities/branches.entity";
import { Users } from "../../auth/entities/user.entity";
import { handler } from "../../../config/dbconfig";
import { Taxes } from "../../taxes/entities/taxes.entity";

@Entity("company")
@Unique(["recordId", "id"])
export class Company {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  registrationNumber: string;

  @Column({ type: "int", nullable: false })
  taxId: number;

  @Column({ type: "int", nullable: true })
  taxRecordId: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  website: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  addressLine1: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  addressLine2: string;

  @Column({ type: "int", nullable: true })
  cityId: number;

  @Column({ type: "int", nullable: false })
  createdById: number;

  @Column({ type: "int", nullable: false })
  modifiedById: number;

  @Column({ type: "int", nullable: true })
  stateId: number;

  @Column({ type: "int", nullable: false })
  countryId: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  postalCode: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  industryType: string;

  @Column({ type: "int", nullable: true })
  numberOfEmployees: number;

  @Column({ type: "decimal", precision: 15, scale: 2, nullable: true })
  annualRevenue: number;

  @Column({ type: "date", nullable: true })
  foundedDate: Date;

  @Column({ type: "enum", enum: ["Active", "Inactive"], default: "Active" })
  status: string;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedDate: Date;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @Column({ type: "int", nullable: true })
  recordId: number;

  @ManyToOne(() => Taxes, { nullable: true })
  @JoinColumn([
    { name: "taxRecordId", referencedColumnName: "recordId" },
    { name: "taxId", referencedColumnName: "id" },
  ])
  tax: Taxes;

  @OneToMany(() => Branch, (line) => line.company, {
    cascade: ["soft-remove"],

  })
  branches?: Branch[];

  @ManyToOne(() => City, { nullable: true })
  @JoinColumn()
  city: City;

  @ManyToOne(() => States, { nullable: true })
  @JoinColumn()
  state: States;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn()
  country: Country;

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
      const lastRecord = await dataSource.getRepository(Company).findOne({
        where: {},
        order: { recordId: "DESC" },
      });
      this.recordId = lastRecord ? lastRecord.recordId + 1 : 1;
    }
    return
  }

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;
}
