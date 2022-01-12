import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/utils/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RemoveBookRatingParamsDto {
  @Expose({ name: 'id' })
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    name: 'id',
    description: 'Identyfikator książki',
    example: 1,
  })
  readonly bookId: number;

  @Expose({ name: 'rating_id' })
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    name: 'rating_id',
    description: 'Identyfikator oceny',
    example: 1,
  })
  readonly ratingId: number;
}
