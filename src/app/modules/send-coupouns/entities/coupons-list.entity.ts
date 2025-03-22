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
  id?: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  code: string;

  @Column({ type: "int", nullable: true })
  couponId: number;

  @Column({ type: "int", nullable: true })
  companyId: number;

  @ManyToOne(() => CompanyCoupouns, { nullable: true })
  @JoinColumn()

  coupon?: CompanyCoupouns;
  
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  discountPer: number;
  @Column({ type: "int", default: 0 })
  isUsed: number;

  // ✅ Expiry Date column added
  @Column({ type: "timestamp", nullable: true })
  expireAt: Date;
}
