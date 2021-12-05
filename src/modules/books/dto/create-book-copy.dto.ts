import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CopyViewModel } from '@/modules/books/vms/copy.vm';

export class CreateBookCopyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    title: 'Numer egzemplarza',
    example: 'ABC123456789',
    maxLength: 50,
    nullable: false,
  })
  number: string;
}

export class CreateBookCopyResultDto {
  @ApiProperty({
    title: 'Egzemplarz książki',
  })
  readonly copy: CopyViewModel;

  constructor(copy: CopyViewModel) {
    this.copy = copy;
  }
}
