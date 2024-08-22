import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { BattleResultDto } from './dto/battle-result.dto';
import { NotFoundException } from '@nestjs/common';
import { Type } from './entities/type.entity';
import { Attack } from './entities/attack.entity';
import { Rarity } from './entities/rarity.entity';
import { Resistance } from './entities/resistance.entity';
import { Weakness } from './entities/weakness.entity';

describe('CardsService', () => {
  let service: CardsService;
  let cardRepository: Repository<Card>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(Card),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Type),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Rarity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Set),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Attack),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Weakness),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Resistance),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
    cardRepository = module.get<Repository<Card>>(getRepositoryToken(Card));
  });

  describe('battle', () => {
    it('should return a successful battle result when the attacking card can defeat the defending card', async () => {
      const attackingCard = {
        id: '1',
        name: 'Charizard',
        attacks: [{ name: 'Flamethrower', damage: 60 }],
        type: { id: '4c975f21-91d7-48b8-ac11-6ae17672e102', name: 'Fire' },
      } as Card;

      const defendingCard = {
        id: '2',
        name: 'Venusaur',
        hp: 100,
        type: { id: '7ee86777-b3ac-4466-a73a-0cc41a13a061', name: 'Grass' },
        weaknesses: [
          {
            type: { id: '4c975f21-91d7-48b8-ac11-6ae17672e102', name: 'Fire' },
            multiplier: 2,
          },
        ],
        resistances: [],
      } as Card;

      jest
        .spyOn(cardRepository, 'findOne')
        .mockImplementation(async (options) => {
          const where = options.where as { id: string };
          if (where.id === attackingCard.id) {
            return attackingCard;
          } else if (where.id === defendingCard.id) {
            return defendingCard;
          }
          return null;
        });

      const result: BattleResultDto = await service.simulateBattle(
        attackingCard.id,
        defendingCard.id,
      );

      expect(result.attackingCardName).toBe(attackingCard.name);
      expect(result.defendingCardName).toBe(defendingCard.name);
      expect(result.baseDamage).toBe(60);
      expect(result.finalDamage).toBe(120); // 60 * 2 due to weakness
      expect(result.weaknessApplied).toBe(true);
      expect(result.resistanceApplied).toBe(false);
      expect(result.successful).toBe(true);
    });

    it('should return a failed battle result when the attacking card cannot defeat the defending card', async () => {
      const attackingCard = {
        id: '1',
        name: 'Pikachu',
        attacks: [{ name: 'Thunder Shock', damage: 40 }],
        type: { id: '4fa432a8-fc6e-4119-94c9-3a02166ce323', name: 'Electric' },
      } as Card;

      const defendingCard = {
        id: '2',
        name: 'Blastoise',
        hp: 110,
        type: { id: '9b2f9229-58ee-4e0e-8def-c40cd1f07c3c', name: 'Water' },
        weaknesses: [],
        resistances: [
          {
            type: {
              id: '4fa432a8-fc6e-4119-94c9-3a02166ce323',
              name: 'Electric',
            },
            value: -20,
          },
        ],
      } as Card;

      jest
        .spyOn(cardRepository, 'findOne')
        .mockImplementation(async (options) => {
          const where = options.where as { id: string };
          if (where.id === attackingCard.id) {
            return attackingCard;
          } else if (where.id === defendingCard.id) {
            return defendingCard;
          }
          return null;
        });

      const result: BattleResultDto = await service.simulateBattle(
        attackingCard.id,
        defendingCard.id,
      );

      expect(result.attackingCardName).toBe(attackingCard.name);
      expect(result.defendingCardName).toBe(defendingCard.name);
      expect(result.baseDamage).toBe(40);
      expect(result.finalDamage).toBe(20); // 40 - 20 due to resistance
      expect(result.weaknessApplied).toBe(false);
      expect(result.resistanceApplied).toBe(true);
      expect(result.successful).toBe(false);
    });

    it('should throw a NotFoundException if one or both cards are not found', async () => {
      jest
        .spyOn(cardRepository, 'findOne')
        .mockImplementation(async () => null);

      await expect(service.simulateBattle('1', '2')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
