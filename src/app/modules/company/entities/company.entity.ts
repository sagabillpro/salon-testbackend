import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Country, States, City } from "../../general-data/entities";
import { Branch } from "../../branches/entities/branches.entity";

@Entity("company")
export class Company {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  companyName: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  registrationNumber: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  taxId: string;

  @Column({ type: "varchar", length: 150, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  website: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  addressLine1: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  addressLine2: string;

  @ManyToOne(() => City, { nullable: true })
  @JoinColumn()
  city: City;

  @ManyToOne(() => States, { nullable: true })
  @JoinColumn()
  state: States;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn()
  country: Country;

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

  @OneToMany(() => Branch, (line) => line.company, {
    cascade: true,
    onDelete: "CASCADE",
  })
  branches: Branch[];
  
  @Column({ type: "int", default: 0 })
  isInactive: number;
}
