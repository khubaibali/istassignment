import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './entities/Log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity])],
  providers: [],
  exports: [],
})
export class LoggerModule {}
