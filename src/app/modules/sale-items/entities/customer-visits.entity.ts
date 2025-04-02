import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("customer_visits")
export class CustomerVisit {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: "int", nullable: true, name: "customer_id" })
  customerId: number;

  @Column({ type: "int", nullable: true, name: "company_id" })
  companyId: number;

  @Column({ type: "date" })
  visitDate: Date;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  totalSpend: number;

  @Column({ type: "text" })
  paymentMethod: string; // Consider using an ENUM type in PostgreSQL

  @Column({ type: "numeric", precision: 3, scale: 2, nullable: true })
  rating?: number;

  @Column({ type: "text", array: true })
  services: string[];
}
