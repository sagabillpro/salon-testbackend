import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Country, States, City } from "../../general-data/entities";
import { Company } from "../../company/entities/company.entity";

@Entity("branches")
export class Branch {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;
  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;
  
  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  branchCode: string;

  @ManyToOne(() => Company, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "companyId" })
  company: Company;

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

  @Column({ type: "varchar", length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  email: string;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedDate: Date;
}
