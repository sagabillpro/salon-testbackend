import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("d_credential_type")
export class DCredentialTypes {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdDate: string;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  modifiedDate: string;
}
