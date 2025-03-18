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

@Entity("user_menus_and_features")
@Unique(["user", "entity", "feature"]) // Ensures uniqueness for a user-menu-feature combination
export class UserMenusAndFeatures {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", nullable: true })
  userId: number;

  @Column({ type: "int" })
  entityId: number;

  @Column({ type: "int" })
  featureId: number;

  @Column({ type: "int", nullable: true })
  roleId: number;

  @ManyToOne(() => Users, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => FeatureSettings, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "entityId" })
  entity: FeatureSettings;

  @ManyToOne(() => Feature, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "featureId" })
  feature: Feature;

  @ManyToOne(() => Role, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "roleId" })
  role: Role;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedDate: Date;

  @Column({ type: "int", default: 0, nullable: true })
  isSystem: number;

  @Column({ type: "int", default: 0, nullable: false })
  isActive: number;
}
