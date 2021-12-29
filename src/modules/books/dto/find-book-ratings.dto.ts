import { RatingViewModel } from '@/modules/books/vms';
import { TypeNumber } from '@/shared/utils/class-transformer';
import { IsInt, IsNotEmpty } from '@/shared/utils/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindBookRatingsParamsDto {
  @IsInt()
  @IsNotEmpty()
  @TypeNumber()
  @ApiProperty({
    title: 'Identyfikator książki',
    example: 1,
  })
  readonly id: number;
}

export class FindBookRatingsResultDto {
  @ApiProperty({
    title: 'Średnia ocena',
  })
  readonly average: number;

  @ApiProperty({
    title: 'Znalezione oceny',
  })
  readonly ratings: RatingViewModel[];

  constructor(ratings: RatingViewModel[]) {
    if (ratings.length > 0) {
      const sum = ratings.reduce((avg, rating) => avg + rating.value, 0);
      const len = ratings.length;

      this.average = sum / len;
    } else {
      this.average = 0;
    }

    this.ratings = ratings;
  }
}
