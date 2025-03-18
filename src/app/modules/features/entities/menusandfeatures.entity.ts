import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { Users } from "../../auth/entities/user.entity";
import { Feature } from "./features.entity";
import { Menus } from "../../general-data/entities";
import { FeatureSettings } from "../../fetaure-settings/entities/feature-setting.entity";

@Entity("menus_and_features")
@Unique(["entity", "feature"]) // Ensures uniqueness for a user-menu-feature combination
export class MenusAndFeatures {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int" })
  entityId: number;

  @Column({ type: "int" })
  featureId: number;
  
  @ManyToOne(() => FeatureSettings, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn()
  entity: FeatureSettings;

  @ManyToOne(() => Feature, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn()
  feature: Feature;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedDate: Date;
}
