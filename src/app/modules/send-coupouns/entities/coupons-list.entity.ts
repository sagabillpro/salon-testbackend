import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { CompanyCoupouns } from "./company-coupons.entity";

@Entity("coupouns_list")
export class CoupounsList {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  code: string;

  @Column({ type: "int", nullable: true })
  couponId: number;

  @ManyToOne(() => CompanyCoupouns, { nullable: true })
  @JoinColumn()
  coupon: CompanyCoupouns;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;
}
