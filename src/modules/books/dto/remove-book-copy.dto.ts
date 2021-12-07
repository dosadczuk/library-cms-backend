import { TypeNumber } from '@/shared/decorators/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/decorators/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveBookCopyParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    title: 'Identyfikator książki',
    example: 1,
  })
  readonly id: number;

  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    name: 'copy_id',
    title: 'Identyfikator egzemplarza',
    example: 1,
  })
  readonly copyId: number;
}
