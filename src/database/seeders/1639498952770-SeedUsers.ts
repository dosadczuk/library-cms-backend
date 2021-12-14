import { UserSeed } from '@/database/seeders/seeds/user.seed';
import { User } from '@/modules/users/entities/user.entity';
import { getConnection, MigrationInterface } from 'typeorm';

export class SeedUsers1639498952770 implements MigrationInterface {
  public async up(): Promise<void> {
    const connection = getConnection('seeder');

    return connection.transaction(async (manager) => {
      await manager.getRepository(User).save(await UserSeed);
    });
  }

  public async down(): Promise<void> {
    // nothing
  }
}
