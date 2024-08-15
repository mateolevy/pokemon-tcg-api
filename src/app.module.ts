import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CardsModule } from './cards/cards.module';
import { CommonModule } from './common/common.module';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CardsModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
