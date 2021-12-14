import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/utils/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveBookParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    title: 'Identyfikator książki',
    example: 1,
  })
  readonly id: number;
}
