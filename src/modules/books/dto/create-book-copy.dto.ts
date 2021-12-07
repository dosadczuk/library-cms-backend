import { CopyViewModel } from '@/modules/books/vms/copy.vm';
import { TypeNumber } from '@/utils/decorators/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBookCopyParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    title: 'Identyfikator książki',
    example: 1,
  })
  readonly id: number;
}

export class CreateBookCopyBodyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    title: 'Numer egzemplarza',
    example: 'ABC123456789',
    maxLength: 50,
    nullable: false,
  })
  readonly number: string;
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
