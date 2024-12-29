import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Services } from "../../services/entities/services.entity";

@Entity("items_stock_track")
export class ItemsStockTrack {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ManyToOne(() => Services)
  @JoinColumn()
  service: Services;

  @Column({ type: "decimal", nullable: true })
  unitPrice: number;

  @Column({ type: "varchar", nullable: true })
  stockNumber: string;

  @Column({ type: "int", nullable: false })
  quantityAdded: number;

  @Column({ type: "int", nullable: false })
  quantityUvailable: number;

  @CreateDateColumn({ type: "varchar", nullable: false })
  createdDate: string;

  @UpdateDateColumn({ type: "varchar", nullable: false })
  modifiedDate: string;
}
