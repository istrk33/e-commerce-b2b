import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  // ajout de la colonne content, qui va faire la synchro avec la bd
  @Column({ type: 'varchar', default: "default content" })
  content: string;
  
  // ajout de la colonne author, qui va faire la synchro avec la bd
  @Column({ type: 'varchar', default: "default author" })
  author: string;
}
