import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RemoveFileParamsDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    title: 'Identyfikator pliku',
    example: 'd3f275c3-77bd-4753-96ab-e84efb95e712',
  })
  id: string;
}
