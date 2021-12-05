import { ApiProperty } from '@nestjs/swagger';
import { Language } from '@/modules/books/entities/language.entity';

export class LanguageViewModel {
  @ApiProperty({
    title: 'Identyfikator',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    title: 'Wartość',
    example: 'polski',
  })
  readonly value: string;

  constructor(language: Language) {
    this.id = language.id;
    this.value = language.value;
  }
}
