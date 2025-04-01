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
import { Country, States, City } from "../../general-data/entities";
import { Branch } from "../../branches/entities/branches.entity";
import { Users } from "../../auth/entities/user.entity";
import { handler } from "../../../config/dbconfig";
import { Taxes } from "../../taxes/entities/taxes.entity";
import { TaxNew } from "../../taxes/entities/taxes-new.entity";

@Entity("company")
export class Company {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: "varchar", nullable: true })
  logo: string;

  @Column({ type: "varchar", nullable: true })
  signature: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  registrationNumber: string;

  @Column({ type: "int", nullable: false })
  taxId: number;

  @Column({ type: "varchar", length: 150, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 20, nullable: true, unique: true })
  phoneNumber: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  website: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  upiId: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  gstInNo: string;
  
  @Column({ type: "varchar", length: 255, nullable: true })
  tagLine: string;

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

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @ManyToOne(() => TaxNew, { nullable: true })
  @JoinColumn()
  tax: TaxNew;

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

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;

  @VersionColumn({ nullable: true })
  version: number;
}
