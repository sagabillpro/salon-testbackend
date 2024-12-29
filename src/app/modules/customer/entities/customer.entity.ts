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
import { City, Country, States } from "../../general-data/entities";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @ManyToOne(() => States)
  @JoinColumn()
  state: States;

  @ManyToOne(() => Country)
  @JoinColumn()
  country: Country;

  @ManyToOne(() => City)
  @JoinColumn()
  city: City;

  @CreateDateColumn({ type: "varchar", nullable: true })
  birthDate: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  mobile: string;

  @CreateDateColumn({ type: "varchar", nullable: true })
  email: string;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @UpdateDateColumn({ type: "varchar", nullable: true })
  lastVisitedDate: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
}
