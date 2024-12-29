import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("cities")
export class City {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "int" })
  stateId: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdDate: string;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  modifiedDate: string;

}
