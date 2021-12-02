import { CONSTRAINTS, METADATA } from '@/modules/files/entities/file.props';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'files',
  orderBy: { id: 'ASC' },
})
export class File {
  @PrimaryGeneratedColumn('uuid', {
    comment: METADATA.id.title,
    name: 'id',
  })
  id: number;

  @Column({
    comment: METADATA.name.title,
    name: 'name',
    type: 'varchar',
    length: CONSTRAINTS.name.maxLength,
    nullable: CONSTRAINTS.name.nullable,
  })
  name: string;

  @Column({
    comment: METADATA.path.title,
    name: 'path',
    type: 'varchar',
    length: CONSTRAINTS.path.maxLength,
    nullable: CONSTRAINTS.path.nullable,
  })
  path: string;

  @Column({
    comment: METADATA.size.title,
    name: 'size',
    type: 'int',
    nullable: CONSTRAINTS.size.nullable,
  })
  size: number;

  @Column({
    comment: METADATA.mime.title,
    name: 'mime',
    type: 'varchar',
    length: CONSTRAINTS.mime.maxLength,
    nullable: CONSTRAINTS.mime.nullable,
  })
  mime: string;
}
