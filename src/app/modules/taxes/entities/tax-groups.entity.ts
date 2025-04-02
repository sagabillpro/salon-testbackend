import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { TaxNew } from "./taxes-new.entity";
import { TaxGroupComponent } from "./tax-group-compnents.entity";

@Entity({ name: "tax_groups" })
export class TaxGroup {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;
  
  @Column({ type: "int", nullable: true, name: "tax_id" })
  taxId: number;

  @ManyToOne(() => TaxNew, (tax) => tax.taxGroups, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tax_id" })
  tax: TaxNew;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: false })
  rate: number;

  @OneToMany(() => TaxGroupComponent, (component) => component.taxGroup)
  components: TaxGroupComponent[];
}
