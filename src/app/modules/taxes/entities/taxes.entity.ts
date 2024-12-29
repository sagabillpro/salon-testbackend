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
} from "typeorm";
import { Country } from "../../general-data/entities";

@Entity("taxes")
export class Taxes {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 700, nullable: true })
  description: string;

  @ManyToOne(() => Country)
  @JoinColumn()
  country: Country;

  @Column({ type: "int", nullable: false })
  percentage: number;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
}
