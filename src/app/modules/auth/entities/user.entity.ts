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
  DeleteDateColumn,
  VersionColumn,
} from "typeorm";
import { City, Country, DUserType, States } from "../../general-data/entities";
import { UserMenusAndFeatures } from "../../features/entities/usermenufeaturemap.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  userName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password: string;

  @Column({ type: "int", nullable: false })
  userTypeId: number;

  @ManyToOne(() => DUserType, { nullable: true })
  @JoinColumn()
  userType: DUserType;

  @CreateDateColumn({ type: "varchar", nullable: true })
  birthDate: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  mobile: string;

  @CreateDateColumn({ type: "varchar", nullable: true })
  email: string;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @OneToMany(() => UserMenusAndFeatures, (line) => line.user, {})
  userMenusAndFeatures?: UserMenusAndFeatures[];

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;

  @VersionColumn({ nullable: true })
  version: number;
}
