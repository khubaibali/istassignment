import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('Postgres_HOST'),
        port: configService.getOrThrow('Postgres_PORT'),
        username: configService.getOrThrow('Postgres_USER'),
        password: configService.getOrThrow('Postgres_PASS'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('Postgres_Synced'),
        database: configService.getOrThrow('Postgres_Database'),
        retryDelay: 1000,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
