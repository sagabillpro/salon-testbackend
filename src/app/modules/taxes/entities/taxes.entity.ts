import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  BeforeInsert,
  DeleteDateColumn,
  VersionColumn,
} from "typeorm";
import { Country } from "../../general-data/entities";
import { Users } from "../../auth/entities/user.entity"; // Assuming the User entity is in this path
import { handler } from "../../../config/dbconfig";

@Entity("taxes")
export class Taxes {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 700, nullable: true })
  description: string;

  @Column({ type: "int", nullable: true })
  countryId: number;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn()
  country: Country;

  @Column({ type: "int", nullable: false })
  percentage: number;

  @Column({ type: "int", default: 0, nullable: true })
  isInactive: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  modifiedBy: Users;

  @CreateDateColumn({ type: "timestamp", nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: false })
  modifiedDate: Date;

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;

  @VersionColumn({ nullable: true })
  version: number;
}
