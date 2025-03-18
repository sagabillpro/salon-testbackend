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
  VersionColumn,
} from "typeorm";
import {
  City,
  Country,
  DContactType,
  States,
} from "../../general-data/entities";
import { handler } from "../../../config/dbconfig";
import { Branch } from "../../branches/entities/branches.entity";
import { Users } from "../../auth/entities/user.entity";
import { Company } from "../../company/entities/company.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;
  @Column({ type: "int", nullable: true })
  companyId: number;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn()
  company: Company;

  @ManyToOne(() => States, { nullable: true })
  @JoinColumn()
  state: States;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn()
  country: Country;

  @ManyToOne(() => City, { nullable: true })
  @JoinColumn()
  city: City;
  
  @Column({ type: "int", nullable: true })
  contactTypeId: number;
  @ManyToOne(() => DContactType, { nullable: false })
  @JoinColumn()
  contactType: DContactType;

  @CreateDateColumn({ type: "varchar", nullable: true })
  birthDate: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  mobile: string;

  @CreateDateColumn({ type: "varchar", nullable: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  address: string;

  @Column({ type: "varchar", nullable: true })
  zipCode: string;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @UpdateDateColumn({ type: "varchar", nullable: true })
  lastVisitedDate: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @VersionColumn()
  version: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  modifiedBy: Users;

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;
}
