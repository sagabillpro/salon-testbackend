import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TaxGroup } from "./tax-groups.entity";

@Entity({ name: "tax_group_components" })
export class TaxGroupComponent {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "int", nullable: true, name: "tax_group_id" })
  taxGroupId: number;

  @ManyToOne(() => TaxGroup, (taxGroup) => taxGroup.components, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "tax_group_id" })
  taxGroup: TaxGroup;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: false })
  rate: number;

  @Column({ type: "varchar", length: 20, nullable: false ,name:"region_type"})
  regionType: "INTRASTATE" | "INTERSTATE"; // Can be either 'INTRASTATE' or 'INTERSTATE'
}
