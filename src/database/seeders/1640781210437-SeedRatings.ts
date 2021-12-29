import { RatingSeed } from '@/database/seeders/seeds/rating.seed';
import { Rating } from '@/modules/books/entities';
import { getConnection, MigrationInterface } from 'typeorm';

export class SeedRatings1640781210437 implements MigrationInterface {
  public async up(): Promise<void> {
    const connection = getConnection('seeder');

    return connection.transaction(async (manager) => {
      await manager.getRepository(Rating).save(RatingSeed);
    });
  }

  public async down(): Promise<void> {
    // nothing
  }
}
