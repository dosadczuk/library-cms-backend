import { User } from '@/modules/users/entities';
import { ILike } from 'typeorm';

export class UserRepository {
  /**
   * Pobiera wszystkich użytkowników.
   */
  async findAll(): Promise<User[]> {
    return User.find();
  }

  /**
   * Pobiera użytkownika na podstawie bookId.
   */
  async findOne(id: number): Promise<User | null> {
    return User.findOne(id);
  }

  /**
   * Pobiera użytkownika na podstawie adres e-mail.
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email: ILike(email) } });
  }

  /**
   * Sprawdza, czy użytkownik o podanym adresie e-mail już istnieje.
   */
  async isUserExists(email: string): Promise<boolean> {
    return (await User.findOne({ where: { email: ILike(email) } })) != null;
  }

  /**
   * Zapisuje użytkownika do bazy.
   */
  async persist(user: User): Promise<User> {
    return user.save();
  }

  /**
   * Usuwa użytkownika z bazy danych.
   */
  async remove(user: User): Promise<User> {
    return user.softRemove();
  }
}
