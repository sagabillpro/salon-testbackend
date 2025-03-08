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
  BeforeInsert,
  Unique,
} from "typeorm";
import {
  City,
  Country,
  DContactType,
  States,
} from "../../general-data/entities";
import { handler } from "../../../config/dbconfig";
import { Branch } from "../../branches/entities/branches.entity";
import { Users } from "../../auth/entities/user.entity";

@Entity("contacts")
@Unique(["recordId", "id"])
export class Contact {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  code: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @ManyToOne(() => States, { nullable: true })
  @JoinColumn()
  state: States;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn()
  country: Country;

  @ManyToOne(() => City, { nullable: true })
  @JoinColumn()
  city: City;

  @ManyToOne(() => DContactType, { nullable: false })
  @JoinColumn()
  contactType: DContactType;

  @CreateDateColumn({ type: "varchar", nullable: true })
  birthDate: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  mobile: string;

  @CreateDateColumn({ type: "varchar", nullable: true })
  email: string;

  @Column({ type: "int", default: 0 })
  isInactive: number;

  @UpdateDateColumn({ type: "varchar", nullable: true })
  lastVisitedDate: string;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;

  @Column({ type: "int", nullable: true })
  recordId: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  createdBy: Users;

  @ManyToOne(() => Users)
  @JoinColumn()
  modifiedBy: Users;

  @BeforeInsert()
  async generateRecordId?() {
    if (!this.recordId) {
      const dataSource = await handler();
      const lastRecord = await dataSource.getRepository(Contact).findOne({
        where: {},
        order: { recordId: "DESC" },
      });
      this.recordId = lastRecord ? lastRecord.recordId + 1 : 1;
    }
  }

  @DeleteDateColumn() // 👈 Automatically set when deleted
  deletedAt?: Date;
}
