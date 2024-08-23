import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CardDto } from './dto/card.dto';
import { BattleResultDto } from './dto/battle-result.dto';
import { PaginatedResultDto } from 'src/common/dto/paginated-result.dto';
import { FindCardsQueryDto } from './dto/find-cards-query.dto';

@Controller('cards')
@ApiTags('cards')
@ApiBearerAuth('access_token')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  async findAll(
    @Query() query: FindCardsQueryDto,
  ): Promise<PaginatedResultDto<CardDto>> {
    return await this.cardsService.findAll(query);
  }

  @Get('metadata')
  getMetadata() {
    return this.cardsService.findCardMetadata();
  }

  @Get('battle/:attackingCardId/:defendingCardId')
  async simulateBattle(
    @Param('attackingCardId') attackingCardId: string,
    @Param('defendingCardId') defendingCardId: string,
  ): Promise<BattleResultDto> {
    return await this.cardsService.simulateBattle(
      attackingCardId,
      defendingCardId,
    );
  }

  @Get(':id/weaknesses-resistances')
  async getWeaknessesAndResistances(
    @Param('id') cardId: string,
  ): Promise<{ weaknesses: CardDto[]; resistances: CardDto[] }> {
    return await this.cardsService.identifyWeaknessesAndResistances(cardId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}
