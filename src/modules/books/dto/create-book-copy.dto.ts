import { CopyViewModel } from '@/modules/books/vms';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength } from '@/shared/utils/class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
