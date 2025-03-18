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
  VersionColumn,
} from "typeorm";
import { Taxes } from "../../modules/taxes/entities/taxes.entity";
import { City, Country, States } from "../../modules/general-data/entities";
import { Users } from "../../modules/auth/entities/user.entity";



@Entity("company_history")
export class CompanyHistory {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", nullable: false })
  recordId: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  registrationNumber: string;

  @Column({ type: "int", nullable: false })
  taxId: number;

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

  @ManyToOne(() => Taxes, { nullable: true })
  @JoinColumn()
  tax: Taxes;

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

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;

  @VersionColumn()
  version: number;
}
