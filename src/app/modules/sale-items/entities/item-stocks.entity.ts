import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
  BeforeInsert,
  Unique,
} from "typeorm";
import { Services } from "../../services/entities/services.entity";
import { Users } from "../../auth/entities/user.entity";
import { handler } from "../../../config/dbconfig";

@Entity("item_available")
@Unique(["recordId", "id"])
export class ItemAvailable {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", nullable: true })
  serviceId: number;

  @Column({ type: "int", nullable: true })
  serviceRecordId: number;

  @ManyToOne(() => Services, { nullable: true })
  @JoinColumn([
    { name: "serviceRecordId", referencedColumnName: "recordId" },
    { name: "serviceId", referencedColumnName: "id" },
  ])
  service: Services;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @Column({ type: "int", nullable: true })
  recordId: number;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  modifiedBy: Users;

  @CreateDateColumn({ type: "timestamp", nullable: false })
  createdDate: Date;

  @BeforeInsert()
  async generateRecordId?() {
    if (!this.recordId) {
      const dataSource = await handler();
      const lastRecord = await dataSource.getRepository(ItemAvailable).findOne({
        where: {},
        order: { recordId: "DESC" },
      });
      this.recordId = lastRecord ? lastRecord.recordId + 1 : 1;
    }
  }

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;

  @Column({ type: "int", default: 0 })
  isInactive: number;

}
