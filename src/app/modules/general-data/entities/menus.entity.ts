import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { DFeatureType } from "../../general-data/entities";
import { FeatureSettings } from "../../fetaure-settings/entities/feature-setting.entity";

@Entity("menus")
export class Menus {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  icon: string;
  @Column({ type: "int", nullable: true })
  order: number;

  @Column({ type: "int", default: 0, nullable: true })
  isInactive: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
  @OneToMany(() => FeatureSettings, (feature) => feature.menu)
  features: FeatureSettings[];
}
