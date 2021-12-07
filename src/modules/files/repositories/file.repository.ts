import { File } from '@/modules/files/entities/file.entity';

export class FileRepository {
  /**
   * Pobiera plik na podstawie id.
   */
  async findOne(id: string): Promise<File | null> {
    return File.findOne(id);
  }

  /**
   * Zapisuje plik do bazy danych.
   */
  async persist(file: File): Promise<File> {
    return file.save();
  }

  /**
   * Usuwa plik z bazy danych.
   */
  async remove(file: File): Promise<File> {
    return file.remove();
  }
}