import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("countries")
export class Country {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdDate: string;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  modifiedDate: string;
}
