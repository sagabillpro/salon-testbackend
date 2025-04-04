import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { DCredentialTypes } from "../../general-data/entities";
import { Company } from "./company.entity";

@Entity("company_credentials")
export class CompanyCredentials {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", nullable: false })
  credentialTypeId: number;

  @ManyToOne(() => DCredentialTypes, { nullable: true })
  @JoinColumn()
  credentialType: DCredentialTypes;

  @Column({ type: "int", nullable: true })
  companyId: number;

  @ManyToOne(() => Company)
  @JoinColumn()
  company: Company;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  userName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  port: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  host: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  password: string;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedDate: Date;

  @Column({ type: "int", default: 0, nullable: true })
  isInactive: number;
}
