import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Company } from "../../company/entities/company.entity";
import { DCoupounType } from "../../general-data/entities";

@Entity("company_coupouns")
export class CompanyCoupouns {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 1000, nullable: true, unique: true })
  description: string;

  @Column({ type: "int", nullable: true })
  companyId: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  discountPer: number;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn()
  company: Company;

  @Column({ type: "int", nullable: true })
  coupounTypeId: number;

  @ManyToOne(() => DCoupounType, { nullable: false })
  @JoinColumn()
  coupounType: DCoupounType;



  @Column({ type: "int", default: 0 })
  isActiveted: number;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedDate: Date;
}
