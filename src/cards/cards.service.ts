import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { Type } from './entities/type.entity';
import { Rarity } from './entities/rarity.entity';
import { Set } from './entities/set.entity';
import { Attack } from './entities/attack.entity';
import { Resistance } from './entities/resistance.entity';
import { Weakness } from './entities/weakness.entity';
import { CardDto } from './dto/card.dto';
import { BattleResultDto } from './dto/battle-result.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
    @InjectRepository(Rarity)
    private readonly rarityRepository: Repository<Rarity>,
    @InjectRepository(Set)
    private readonly setRepository: Repository<Set>,
    @InjectRepository(Attack)
    private readonly attackRepository: Repository<Attack>,
    @InjectRepository(Weakness)
    private readonly weaknessRepository: Repository<Weakness>,
    @InjectRepository(Resistance)
    private readonly resistanceRepository: Repository<Resistance>,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<CardDto> {
    const [type, rarity, set] = await Promise.all([
      this.typeRepository.findOne({ where: { id: createCardDto.typeId } }),
      this.rarityRepository.findOne({ where: { id: createCardDto.rarityId } }),
      this.setRepository.findOne({ where: { id: createCardDto.setId } }),
    ]);

    if (!type || !rarity || !set) {
      throw new BadRequestException(
        'Invalid typeId, rarityId, or setId provided',
      );
    }

    const attacks = createCardDto.attacks || [];

    const weaknesses = await Promise.all(
      createCardDto.weaknesses.map(async (weaknessDto) => {
        const weaknessType = await this.typeRepository.findOne({
          where: { id: weaknessDto.typeId },
        });
        if (!weaknessType) {
          throw new BadRequestException(
            `Invalid typeId for weakness: ${weaknessDto.typeId}`,
          );
        }
        return this.weaknessRepository.create({
          ...weaknessDto,
          type: weaknessType,
        });
      }),
    );

    const resistances = await Promise.all(
      createCardDto.resistances.map(async (resistanceDto) => {
        const resistanceType = await this.typeRepository.findOne({
          where: { id: resistanceDto.typeId },
        });
        if (!resistanceType) {
          throw new BadRequestException(
            `Invalid typeId for resistance: ${resistanceDto.typeId}`,
          );
        }
        return this.resistanceRepository.create({
          ...resistanceDto,
          type: resistanceType,
        });
      }),
    );

    const card = this.cardRepository.create({
      ...createCardDto,
      type,
      rarity,
      set,
      attacks,
      weaknesses,
      resistances,
    });

    return this.mapToDto(await this.cardRepository.save(card));
  }

  async findAll(): Promise<CardDto[]> {
    const cards = await this.cardRepository.find({
      relations: [
        'type',
        'rarity',
        'set',
        'attacks',
        'weaknesses',
        'resistances',
        'weaknesses.type',
        'resistances.type',
      ],
    });
    return cards.map(this.mapToDto);
  }

  async findOne(id: string): Promise<CardDto> {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: [
        'type',
        'rarity',
        'set',
        'attacks',
        'weaknesses',
        'resistances',
        'weaknesses.type',
        'resistances.type',
      ],
    });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return this.mapToDto(card);
  }

  async findCardMetadata(): Promise<any> {
    const types = await this.typeRepository.find();
    const rarities = await this.rarityRepository.find();
    const sets = await this.setRepository.find();

    return {
      types,
      rarities,
      sets,
    };
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<CardDto> {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: [
        'type',
        'rarity',
        'set',
        'attacks',
        'weaknesses',
        'resistances',
        'weaknesses.type',
        'resistances.type',
      ],
    });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    if (updateCardDto.typeId) {
      const type = await this.typeRepository.findOne({
        where: { id: updateCardDto.typeId },
      });
      if (!type) {
        throw new BadRequestException(
          `Invalid typeId: ${updateCardDto.typeId}`,
        );
      }
      card.type = type;
    }

    if (updateCardDto.rarityId) {
      const rarity = await this.rarityRepository.findOne({
        where: { id: updateCardDto.rarityId },
      });
      if (!rarity) {
        throw new BadRequestException(
          `Invalid rarityId: ${updateCardDto.rarityId}`,
        );
      }
      card.rarity = rarity;
    }

    if (updateCardDto.setId) {
      const set = await this.setRepository.findOne({
        where: { id: updateCardDto.setId },
      });
      if (!set) {
        throw new BadRequestException(`Invalid setId: ${updateCardDto.setId}`);
      }
      card.set = set;
    }

    // Update attacks
    if (updateCardDto.attacks) {
      // Remove old attacks
      await this.attackRepository.remove(card.attacks);
      // Add new attacks
      card.attacks = updateCardDto.attacks.map((attackDto) =>
        this.attackRepository.create(attackDto),
      );
    }

    // Update weaknesses
    if (updateCardDto.weaknesses) {
      // Remove old weaknesses
      await this.weaknessRepository.remove(card.weaknesses);
      // Add new weaknesses
      card.weaknesses = await Promise.all(
        updateCardDto.weaknesses.map(async (weaknessDto) => {
          const type = await this.typeRepository.findOne({
            where: { id: weaknessDto.typeId },
          });
          if (!type) {
            throw new BadRequestException(
              `Invalid typeId for weakness: ${weaknessDto.typeId}`,
            );
          }
          return this.weaknessRepository.create({
            ...weaknessDto,
            type,
          });
        }),
      );
    }

    // Update resistances
    if (updateCardDto.resistances) {
      // Remove old resistances
      await this.resistanceRepository.remove(card.resistances);
      // Add new resistances
      card.resistances = await Promise.all(
        updateCardDto.resistances.map(async (resistanceDto) => {
          const type = await this.typeRepository.findOne({
            where: { id: resistanceDto.typeId },
          });
          if (!type) {
            throw new BadRequestException(
              `Invalid typeId for resistance: ${resistanceDto.typeId}`,
            );
          }
          return this.resistanceRepository.create({
            ...resistanceDto,
            type,
          });
        }),
      );
    }

    // Update remaining simple fields
    card.name = updateCardDto.name;
    card.hp = updateCardDto.hp;
    card.imageUrl = updateCardDto.imageUrl;

    const updatedCard = await this.cardRepository.save(card);

    return this.mapToDto(updatedCard);
  }

  async remove(id: string): Promise<void> {
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    await this.cardRepository.remove(card);
  }

  async simulateBattle(
    attackingCardId: string,
    defendingCardId: string,
  ): Promise<BattleResultDto> {
    const attackingCard = await this.cardRepository.findOne({
      where: { id: attackingCardId },
      relations: ['type', 'attacks'],
    });

    const defendingCard = await this.cardRepository.findOne({
      where: { id: defendingCardId },
      relations: [
        'type',
        'weaknesses',
        'resistances',
        'weaknesses.type',
        'resistances.type',
      ],
    });

    if (!attackingCard || !defendingCard) {
      throw new NotFoundException('One or both cards not found');
    }

    // Assume the first attack is used for simplicity
    const attack = attackingCard.attacks[0];
    let damage = attack.damage;

    let weaknessApplied = false;
    let resistanceApplied = false;

    // Check for weaknesses
    const weakness = defendingCard.weaknesses.find(
      (weakness) => weakness.type.id === attackingCard.type.id,
    );
    if (weakness) {
      damage *= weakness.multiplier;
      weaknessApplied = true;
    }

    // Check for resistances
    const resistance = defendingCard.resistances.find(
      (resistance) => resistance.type.id === attackingCard.type.id,
    );
    if (resistance) {
      damage += resistance.value;
      resistanceApplied = true;
    }

    const successful = damage >= defendingCard.hp;

    const battleResult: BattleResultDto = {
      attackingCardName: attackingCard.name,
      defendingCardName: defendingCard.name,
      defendingCardHealth: defendingCard.hp,
      baseDamage: attack.damage,
      finalDamage: damage,
      weaknessApplied,
      resistanceApplied,
      successful,
    };

    return battleResult;
  }

  async identifyWeaknessesAndResistances(
    cardId: string,
  ): Promise<{ weaknesses: CardDto[]; resistances: CardDto[] }> {
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
      relations: [
        'type',
        'weaknesses',
        'resistances',
        'weaknesses.type',
        'resistances.type',
      ],
    });

    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }

    const allCards = await this.cardRepository.find({ relations: ['type'] });

    const weaknesses = allCards.filter((otherCard) =>
      card.weaknesses.some(
        (weakness) => weakness.type.id === otherCard.type.id,
      ),
    );

    const resistances = allCards.filter((otherCard) =>
      card.resistances.some(
        (resistance) => resistance.type.id === otherCard.type.id,
      ),
    );

    // Map to DTO
    const weaknessesDto = weaknesses.map(this.mapToDto);
    const resistancesDto = resistances.map(this.mapToDto);

    return { weaknesses: weaknessesDto, resistances: resistancesDto };
  }

  // Helper method to map an entity to a DTO
  private mapToDto(card: Card): CardDto {
    return {
      id: card.id,
      name: card.name ?? '',
      hp: card.hp ?? 0,
      imageUrl: card.imageUrl ?? '',
      type: card.type?.name ?? '',
      rarity: card.rarity?.name ?? '',
      set: card.set?.name ?? '',
      attacks:
        card.attacks?.map((attack) => ({
          name: attack.name ?? '',
          damage: attack.damage ?? 0,
          text: attack.text ?? '',
        })) ?? [],
      weaknesses:
        card.weaknesses?.map((weakness) => ({
          multiplier: weakness.multiplier ?? 1, // assuming 1 as a default multiplier
          type: weakness.type?.name ?? '',
        })) ?? [],
      resistances:
        card.resistances?.map((resistance) => ({
          value: resistance.value ?? 0,
          type: resistance.type?.name ?? '',
        })) ?? [],
    };
  }
}
