import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

//   @OneToMany(() => LogEntity, (log) => log.user)
//   Logs: LogEntity;

  @CreateDateColumn()
  createdAt: Date;
}
