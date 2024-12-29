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
import { DFeatureType, Menus } from "../../general-data/entities";
import { FeatureSettings } from "./feature-setting.entity";

@Entity("feature_codes")
export class FeatureCodes {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  series: string;

  @Column({ type: "int", nullable: true })
  codeNumber: number;

  @ManyToOne(() => FeatureSettings)
  @JoinColumn()
  feature: FeatureSettings;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
}
