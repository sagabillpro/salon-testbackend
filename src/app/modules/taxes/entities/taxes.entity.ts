import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  BeforeInsert,
  DeleteDateColumn,
} from "typeorm";
import { Country } from "../../general-data/entities";
import { Users } from "../../auth/entities/user.entity"; // Assuming the User entity is in this path
import { handler } from "../../../config/dbconfig";

@Entity("taxes")
@Unique(["recordId", "id"])
export class Taxes {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  code: string;

  @Column({ type: "int", nullable: true })
  recordId: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 700, nullable: true })
  description: string;

  @ManyToOne(() => Country)
  @JoinColumn()
  country: Country;

  @Column({ type: "int", nullable: false })
  percentage: number;

  @Column({ type: "int", default: 0, nullable: true })
  isInactive: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  modifiedBy: Users;

  @CreateDateColumn({ type: "timestamp", nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: false })
  modifiedDate: Date;

  @BeforeInsert()
  async generateRecordId?() {
    if (!this.recordId) {
      const dataSource = await handler();
      const lastRecord = await dataSource.getRepository(Taxes).findOne({
        where: {},
        order: { recordId: "DESC" },
      });
      console.log("lastRecord", lastRecord);
      this.recordId = lastRecord ? lastRecord.recordId + 1 : 1;
    }
  }

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;
}
