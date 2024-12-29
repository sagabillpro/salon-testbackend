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
import { Users } from "./user.entity";

@Entity("user_sessions")
export class UserSessions {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @Column({ type: "varchar", length: 500, nullable: false })
  token: string;
  @Column({ type: "int", default: 0 })
  isInactive: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
}
