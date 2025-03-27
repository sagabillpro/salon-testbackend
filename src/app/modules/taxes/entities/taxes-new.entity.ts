import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TaxGroup } from "./tax-groups.entity";


@Entity({ name: "taxes_new" })
export class TaxNew {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ type: "boolean", nullable: false })
    isBifurcatable: boolean;

    @OneToMany(() => TaxGroup, taxGroup => taxGroup.tax)
    taxGroups: TaxGroup[];
}
