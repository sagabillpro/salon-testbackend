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
import { MenusAndFeatures } from "../../features/entities/menusandfeatures.entity";

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

  @Column({ type: "int", nullable: true })
  menuId: number;

  @ManyToOne(() => Menus)
  @JoinColumn()
  menu: Menus;

  @Column({ type: "int", nullable: true })
  featureTypeId: number;

  @ManyToOne(() => DFeatureType)
  @JoinColumn()
  featureType: DFeatureType;

  @Column({ type: "int", default: 0, nullable: true })
  isAdminMenu: number;

  @Column({ type: "int", default: 0, nullable: true })
  isInactive: number;

  @Column({ type: "int", default: 0, nullable: true })
  isAddOnlyAdmin: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @OneToMany(() => MenusAndFeatures, (line) => line.entity, {
    cascade: true,
    onDelete: "CASCADE",
  })
  menusAndFeatures: MenusAndFeatures[];
}
