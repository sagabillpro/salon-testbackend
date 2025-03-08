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
import { Role } from "../../roles/entities/role.entity";

@Entity("")
@Unique(["user", "entity", "feature"]) // Ensures uniqueness for a user-menu-feature combination
export class UserMenusAndFeatures {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ManyToOne(() => Users, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn()
  user: Users;

  @ManyToOne(() => FeatureSettings, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn()
  entity: FeatureSettings;

  @ManyToOne(() => Feature, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn()
  feature: Feature;

  @ManyToOne(() => Role, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn()
  role: Role;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedDate: Date;

  @Column({ type: "int", default: 0, nullable: true })
  isSystem: number;
}

