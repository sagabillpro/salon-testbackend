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

@Entity("feature_settings")
export class FeatureSettings {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  route: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  displayName: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  fixedCode: string;

  @Column({ type: "int", nullable: true })
  order: number;

  @ManyToOne(() => Menus)
  @JoinColumn()
  menu: Menus;

  @ManyToOne(() => DFeatureType)
  @JoinColumn()
  featureType: DFeatureType;

  @Column({ type: "int", default: 0, nullable: true })
  isAdminMenu: number;

  @Column({ type: "int", default: 0, nullable: true })
  isInactive: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
}
