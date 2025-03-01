import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";


@Entity("features")
export class Feature {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedDate: Date;

  @Column({ type: "int", default: 0, nullable: true })
  isInactive: number;

}
