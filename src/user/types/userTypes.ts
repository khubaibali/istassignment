import { UserEntity } from '../entities/user.entity';

export type withoutPasswords = Omit<UserEntity, 'password'>;
