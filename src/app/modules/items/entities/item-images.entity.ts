import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from './items.entity';

@Entity('item_images')
export class ItemImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: string;

  @UpdateDateColumn({ type: 'timestamp' })
  modifiedDate: string;

  @Column({ type: 'int', default: 1 })
  revisionNumber: number;
  
  // @Column({ type: 'int' })
  // itemId?: number;

  @ManyToOne(() => Item, (item) => item.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'itemId' })
  item: Item;
}
