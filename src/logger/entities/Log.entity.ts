import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum' })
  type: LogType;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}

export enum LogType {
  register = 'REGISTER',
  login = 'LOGIN',
  delete = 'DELETE',
  update = 'UPDATE',
}
