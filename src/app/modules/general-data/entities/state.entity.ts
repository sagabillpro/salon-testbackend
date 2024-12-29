import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("states")
export class States {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "int"})
    countryId: number;

    @CreateDateColumn({ type: "timestamp",nullable:true })
    createdDate: string;

    @UpdateDateColumn({ type: "timestamp",nullable:true })
    modifiedDate: string;
}
