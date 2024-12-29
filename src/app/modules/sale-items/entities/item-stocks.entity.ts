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


@Entity("item_available")
export class ItemAvailable{
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @ManyToOne(() => Services)
    @JoinColumn()
    service: Services;

    @Column({ type: "int", nullable: false })
    quantity: number;

    @UpdateDateColumn({ type: "varchar", nullable: false })
    modifiedDate: string;
}
