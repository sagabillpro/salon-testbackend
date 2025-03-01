import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";


@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;
  
  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @CreateDateColumn({ type: "timestamp" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp" })
  modifiedDate: Date;
}
