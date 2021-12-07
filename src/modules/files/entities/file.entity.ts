import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'files',
  orderBy: { id: 'ASC' },
})
export class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Identyfikator rekordu',
    name: 'id',
  })
  id: string;

  @Column({
    comment: 'Nazwa pliku',
    name: 'name',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  name: string;

  @Exclude()
  @Column({
    comment: 'Ścieżka do pliku na dysku',
    name: 'path',
    type: 'varchar',
    length: 250,
    nullable: false,
  })
  path: string;

  @Exclude()
  @Column({
    comment: 'Rozmiar w bajtach',
    name: 'size',
    type: 'int',
    nullable: false,
  })
  size: number;

  @Exclude()
  @Column({
    comment: 'Typ MIME',
    name: 'mime',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  mime: string;

  @Column({
    comment: 'Suma kontrolna',
    name: 'checksum',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  checksum: string;
}
