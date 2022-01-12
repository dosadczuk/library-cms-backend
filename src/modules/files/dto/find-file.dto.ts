import { IsNotEmpty, IsString, IsUUID } from '@/shared/utils/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindFileParamsDto {
  @IsString()
  @IsUUID('4')
  @IsNotEmpty()
  @ApiProperty({
    description: 'Identyfikator pliku',
    example: 'd3f275c3-77bd-4753-96ab-e84efb95e712',
  })
  id: string;
}
