import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Type } from './entities/type.entity';
import { Rarity } from './entities/rarity.entity';
import { Set } from './entities/set.entity';
import { Attack } from './entities/attack.entity';
import { Resistance } from './entities/resistance.entity';
import { Weakness } from './entities/weakness.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([
      Card,
      Type,
      Rarity,
      Set,
      Attack,
      Weakness,
      Resistance,
    ]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
